import {Button} from "antd";
import {DeleteOutlined, EditOutlined, FileAddOutlined} from "@ant-design/icons";
import SimpleMdeReact from "react-simplemde-editor";
import {useContext, useState} from "react";
import "easymde/dist/easymde.min.css";
import "./workspace.css";
import {NotesContext} from "../Main/Main";

const Workspace = () => {
    const notesContext = useContext(NotesContext);

    const [edit, setEdit] = useState(false);
    const [value, setValue] = useState("");

    const editToggle = () => setEdit(!edit);
    const onEditChange = (value) => setValue(value);

    return(
        <>
            <div className="workspace__header">
                <Button type={"primary"} ghost><FileAddOutlined />Add note</Button>
                <Button type={"primary"} danger onClick={() => notesContext.delete(notesContext.id)}><DeleteOutlined />Delete note</Button>
                <Button type={"primary"} onClick={editToggle}><EditOutlined />Edit note</Button>
            </div>

            {
                !edit ?
                    <div>
                        <h1>{notesContext.title}</h1>
                        <p>{notesContext.text}</p>
                        <p>{notesContext.date}</p>
                    </div> : <div/>
            }

            {
                edit ? <SimpleMdeReact value={value} onChange={onEditChange} /> : <div/>
            }
        </>
    )
}

export default Workspace;