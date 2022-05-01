import Sider from "antd/es/layout/Sider";
import {useContext} from "react";
import {SidebarContext} from "../Main/Main";
import "./sidebar.css";

const Sidebar = () => {
    const contentContext = useContext(SidebarContext);

    return (
        <>
            <Sider theme={"light"}>
                {contentContext?.notes.map(note => {
                    return(
                        <div className={"tab"} key={`note${note.id}`} onClick={() => {contentContext?.currentNoteId(note.id)}}>
                            <h3>{note?.title}</h3>
                            <span>{note?.date.slice(0, note.date.length - 7)}</span>
                        </div>
                    )
                })}
            </Sider>
        </>
    )
}

export default Sidebar;