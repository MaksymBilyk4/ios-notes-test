import Sider from "antd/es/layout/Sider";
import {useContext, useState} from "react";
import {SidebarContext} from "../Main/Main";
import "./sidebar.css";

const Sidebar = () => {
    const contentContext = useContext(SidebarContext);

    const [is, setIs] = useState(false);
    const toggle = () => setIs(!is)

    return (
        <>
            <Sider theme={"light"}>
                {contentContext?.notes.map(note => {
                    return(
                        <div className={contentContext.activeNoteId === note.id ? "tab tab-active" : "tab"} key={`note${note.id}`} onClick={() => {contentContext?.currentNoteId(note.id); toggle()}}>
                            <h3 className={"tab__title"}>{note?.title}</h3>
                            <p className={"tab__info"}>{note?.date.slice(0, note.date.length - 7)}</p>
                            <p className={"tab__info"}>{note?.text.slice(0, 20)}... </p>
                        </div>
                    )
                })}
            </Sider>
        </>
    )
}

export default Sidebar;