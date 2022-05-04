import {Button, Form} from "antd";
import {useContext, useState} from "react";
import "easymde/dist/easymde.min.css";
import "./workspace.css";
import {WorkspaceContext} from "../../context/Context";
import createCurrentDateTime from "../../utils/currentDateTime";
import Input from "antd/es/input/Input";
import SimpleMdeReact from "react-simplemde-editor";
import ReactMarkdown from 'react-markdown'

const Workspace = ({id, noteTitle, noteText, date}) => {

    const {onEditCancel, update, activeNoteId, edit, setCurrentNoteId} = useContext(WorkspaceContext);

    const [title, setTitle] = useState(noteTitle || "");
    const [text, setText] = useState(noteText || "");

    const onEditFetch = () => {
        onEditCancel();
        setCurrentNoteId(id);
        update(id, title, text, createCurrentDateTime());
    };

    const onEditChange = (value) => setText(value);

    if (id === activeNoteId) {
        return (
            <>


                <div className={"workspace__wrapper"}>
                    <p className={"note-date"}>{date}</p>
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