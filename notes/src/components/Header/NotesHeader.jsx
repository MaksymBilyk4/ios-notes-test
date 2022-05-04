import {Button} from "antd";
import {DeleteOutlined, EditOutlined, FileAddOutlined} from "@ant-design/icons";
import "./notes-header.css";
import {ModalDelete} from "../Modal/ModalDelete";
import {useContext} from "react";
import {HeaderModalContext} from "../../context/Context";

const NotesHeader = () => {
    const {notes, edit, activeNoteId, add, openModal, onEdit} = useContext(HeaderModalContext);

    return(
        <div>
            <div className="notes__header">
                <Button type={"primary"} ghost onClick={add}><FileAddOutlined/>Add note</Button>

                <Button type={"primary"} onClick={openModal} danger disabled={notes?.length === 0}>
                    <DeleteOutlined/>
                    Delete Note
                </Button>

                <ModalDelete deletingId={activeNoteId}/>

                <Button type={"primary"} disabled={notes?.length === 0 || edit} onClick={onEdit}><EditOutlined/>Edit note</Button>
            </div>
        </div>
    )
}

export default NotesHeader;