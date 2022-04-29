import {Button} from "antd";
import {DeleteOutlined, EditOutlined, FileAddOutlined} from "@ant-design/icons";
import {db} from "../../utils/db";
import SimpleMdeReact from "react-simplemde-editor";
import {useState} from "react";
import "easymde/dist/easymde.min.css";
import "./workspace.css";

const Workspace = ({id, title, text, date}) => {

    const deleteNote = () => {
        db.note.delete(id);
    };

    const [edit, setEdit] = useState(false);
    const [value, setValue] = useState("");

    const editToggle = () => setEdit(!edit);

    const onChange = (value) => setValue(value);
    return(
        <>
            <div className="workspace__header">
                <Button type={"primary"} ghost><FileAddOutlined />Add note</Button>
                <Button type={"primary"} danger onClick={deleteNote}><DeleteOutlined />Delete note</Button>
                <Button type={"primary"} onClick={editToggle}><EditOutlined />Edit note</Button>
            </div>

            {
                !edit ?
                    <div>
                        <h1>Id: {id}</h1>
                        <h1>{title}</h1>
                        <p>{text}</p>
                        <p>{date}</p>
                    </div> : <div/>
            }

            {
                edit ? <SimpleMdeReact value={value} onChange={onChange} /> : <div/>
            }
        </>
    )
}

export default Workspace;