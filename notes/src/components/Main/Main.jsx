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
    const [prevNoteId, setPrevNoteId] = useState(0);
    const [currentNoteId, setCurrentNoteId] = useState(1);

    const handleCurrentNoteId = (id) => {
        setPrevNoteId(currentNoteId);
        setCurrentNoteId(id);
    };

    // Initial values of note initialization
    const title = "New Note";
    const text = "Write your note here...";

    // DB Requests
    const notes = useLiveQuery(async () => await db.note.toArray());
    const handleDeleteNote = (id) => {
        db.note.delete(id);
        setCurrentNoteId(prevNoteId);
    }
    const handleAddNote = () => {
        db.note.add({
            title,
            text,
            date: createCurrentDateTime()
        });
    }

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
                    activeNoteId: currentNoteId,
                }}>
                    <Sidebar/>
                    <Layout>
                        {notes?.map(note => {
                           return(
                               <div key={note.id}>
                                   <WorkspaceContext.Provider value={{
                                       delete: handleDeleteNote,
                                       add: handleAddNote,
                                       update: handleEditNote,
                                       id: note?.id,
                                       title: note?.title,
                                       text: note?.text,
                                       date: note?.date,
                                       activeNoteId: currentNoteId,
                                       notes: notes || [],
                                   }}>
                                       <Workspace/>
                                   </WorkspaceContext.Provider>
                               </div>
                           )
                        })}
                    </Layout>
                </SidebarContext.Provider>
            </Layout>
        </>
    )
}

export default Main;