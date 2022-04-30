import {Button, Form} from "antd";
import {DeleteOutlined, EditOutlined, FileAddOutlined} from "@ant-design/icons";
import SimpleMdeReact from "react-simplemde-editor";
import {useContext, useState} from "react";
import "easymde/dist/easymde.min.css";
import "./workspace.css";
import {NotesContext} from "../Main/Main";
import createCurrentDateTime from "../../utils/currentDateTime";
import Input from "antd/es/input/Input";

const Workspace = () => {
    const notesContext = useContext(NotesContext);

    const [edit, setEdit] = useState(false);
    const [title, setTitle] = useState(notesContext.title);
    const [text, setText] = useState(notesContext.text);

    const onEdit = () => setEdit(true);
    const onEditFetch = () => {
        setEdit(false);
        notesContext.update(notesContext.id, title, text, createCurrentDateTime());
    };

    const onEditChange = (value) => {
        setText(value);
    }

    return(
        <>
            <div className="workspace__header">
                <Button type={"primary"} ghost onClick={() => notesContext.add()}><FileAddOutlined />Add note</Button>
                <Button type={"primary"} danger onClick={() => notesContext.delete(notesContext.id)}><DeleteOutlined />Delete note</Button>
                <Button type={"primary"} disabled={edit} onClick={onEdit}><EditOutlined />Edit note</Button>
            </div>

            <p className={"note-date"}>{notesContext.date}</p>
            {
                !edit ?
                    <div>
                        <h1 className={"note-title"}>{title}</h1>
                        <p>{text}</p>
                    </div> : <div/>
            }

            {
                edit ?
                    <>
                        <Form onFinish={onEditFetch}>
                            <Form.Item>
                                <Input
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    style={{width: "100%", textAlign: "center", fontSize: "24px", padding: "10px 0", marginBottom: "20px"}}
                                    placeholder={"Enter note`s name"}
                                />
                            </Form.Item>

                            <Form.Item>
                                <SimpleMdeReact value={text} onChange={onEditChange} />
                            </Form.Item>
                            <Button type={"primary"} htmlType={"submit"}>Save</Button>
                        </Form>
                    </>

                    : <div/>
            }
        </>
    )
}

export default Workspace;