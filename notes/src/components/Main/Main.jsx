import {useLiveQuery} from "dexie-react-hooks";
import {db} from "../../utils/db";
import Workspace from "../Workspace/Workspace";
import {createContext, useState} from "react";
import createCurrentDateTime from "../../utils/currentDateTime";
import Layout from "antd/es/layout/layout";
import Sidebar from "../Sidebar/Sidebar";

export const WorkspaceContext = createContext({});
export const SidebarContext = createContext({});


const Main = () => {
    const [activeId, setActiveId] = useState(20);
    const handleCurrentNoteId = (id) => setActiveId(id);

    // Initial values of note initialization
    const title = "New Note";
    const text = "Write your note here...";

    // DB Requests
    const notes = useLiveQuery(async () => await db.note.toArray());
    const handleDeleteNote = (id) => {
        db.note.delete(id);
    }
    const handleAddNote = () => db.note.add({
        title,
        text,
        date: createCurrentDateTime()
    });

    const handleEditNote = (id, title, text, date) => {
        db.note.update(id, {
            title,
            text,
            date,
        })
    };

    return (
        <>
            <Layout>
                <SidebarContext.Provider value={{
                    notes: notes || [],
                    currentNoteId: handleCurrentNoteId,
                }}>
                    <Sidebar/>
                    <Layout>
                        {notes?.map(note => {
                           return(
                               <WorkspaceContext.Provider value={{
                                   delete: handleDeleteNote,
                                   add: handleAddNote,
                                   update: handleEditNote,
                                   id: note?.id,
                                   title: note?.title,
                                   text: note?.text,
                                   date: note?.date,
                                   activeNoteId: activeId,
                               }}>
                                   <Workspace/>
                               </WorkspaceContext.Provider>
                           )
                        })}
                    </Layout>
                </SidebarContext.Provider>
            </Layout>
        </>
    )
}

export default Main;