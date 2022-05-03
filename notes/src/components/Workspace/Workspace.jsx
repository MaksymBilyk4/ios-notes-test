import {Button, Form} from "antd";
import {DeleteOutlined, EditOutlined, FileAddOutlined} from "@ant-design/icons";
import {useContext, useState} from "react";
import "easymde/dist/easymde.min.css";
import "./workspace.css";
import {WorkspaceContext} from "../Main/Main";
import createCurrentDateTime from "../../utils/currentDateTime";
import Input from "antd/es/input/Input";
import SimpleMdeReact from "react-simplemde-editor";
import ReactMarkdown from 'react-markdown'

const Workspace = () => {
    const workspaceContext = useContext(WorkspaceContext);

    const [edit, setEdit] = useState(false);
    const [title, setTitle] = useState(workspaceContext.title || "");
    const [text, setText] = useState(workspaceContext.text || "");


    const onEdit = () => setEdit(true);
    const onEditCancel = () => setEdit(false);

    const onEditFetch = () => {
        setEdit(false);
        workspaceContext.update(workspaceContext.id, title, text, createCurrentDateTime());
    };

    const onEditChange = (value) => {
        console.log(value)
        setText(value);
    }

    if (workspaceContext.id === workspaceContext.activeNoteId) {
        return (
            <>
                <div className={"workspace__wrapper"}>
                    <div className="workspace__header">
                        <Button type={"primary"} ghost onClick={() => workspaceContext.add()}><FileAddOutlined/>Add note</Button>
                        <Button type={"primary"} danger disabled={workspaceContext.notes.length === 1}
                                onClick={() => workspaceContext.delete(workspaceContext.id)}><DeleteOutlined/>Delete
                            note</Button>
                        <Button type={"primary"} disabled={edit} onClick={onEdit}><EditOutlined/>Edit note</Button>
                    </div>

                    <p className={"note-date"}>{workspaceContext.date}</p>
                    {
                        !edit ?
                            <div>
                                <h1 className={"note-title"}>{title}</h1>
                                <ReactMarkdown>{text}</ReactMarkdown>
                            </div> : <div className={"d-none"}/>
                    }

                    {
                        edit ?
                            <>
                                <Form onFinish={onEditFetch}>
                                    <Form.Item>
                                        <Input
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            style={{
                                                width: "100%",
                                                textAlign: "center",
                                                fontSize: "24px",
                                                padding: "10px 0",
                                                marginBottom: "20px"
                                            }}
                                            placeholder={"Enter note`s name"}
                                        />
                                    </Form.Item>
                                        <SimpleMdeReact value={text} onChange={onEditChange} />;
                                    <Form.Item>

                                    </Form.Item>
                                    <Button type={"primary"} style={{margin: "0 20px 0 0", width: "150px"}} htmlType={"submit"}>Save</Button>
                                    <Button type={"ghost"} style={{width: "150px"}} danger onClick={onEditCancel}>Cancel</Button>
                                </Form>
                            </>

                            : <div className={"d-none"}/>
                    }
                </div>
            </>
        )
    }
}

export default Workspace;