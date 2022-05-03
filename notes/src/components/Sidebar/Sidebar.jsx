import Sider from "antd/es/layout/Sider";
import {useContext, useEffect} from "react";
import {SidebarContext} from "../Main/Main";
import "./sidebar.css";
import SearchBox from "../SearchBox/SearchBox";

const Sidebar = () => {

    const {notes, activeNoteId,currentNoteId} = useContext(SidebarContext);

    useEffect(() => {
        notes.length > 0 ? currentNoteId(notes[0].id) : console.log();
    }, [notes])

    return (
        <>
            <Sider theme={"light"}>
                <SearchBox/>
                {notes.map(note => {
                    return(
                        <div className={activeNoteId === note.id ? "tab tab-active" : "tab"} key={`note${note.id}`} onClick={() => {currentNoteId(note.id)}}>
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