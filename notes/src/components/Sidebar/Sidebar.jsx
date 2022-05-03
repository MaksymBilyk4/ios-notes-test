import Sider from "antd/es/layout/Sider";
import {useContext} from "react";
import {SidebarContext} from "../Main/Main";
import "./sidebar.css";
import SearchBox from "../SearchBox/SearchBox";

const Sidebar = () => {

    const contentContext = useContext(SidebarContext);

    return (
        <>
            <Sider theme={"light"}>
                <SearchBox/>
                {contentContext?.notes.map(note => {
                    return(
                        <div className={contentContext.activeNoteId === note.id ? "tab tab-active" : "tab"} key={`note${note.id}`} onClick={() => {contentContext?.currentNoteId(note.id)}}>
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