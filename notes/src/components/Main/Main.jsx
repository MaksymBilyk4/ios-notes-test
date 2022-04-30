import {useLiveQuery} from "dexie-react-hooks";
import {db} from "../../utils/db";
import {Tabs} from "antd";
import Workspace from "../Workspace/Workspace";
import {createContext} from "react";
import createCurrentDateTime from "../../utils/currentDateTime";

export const NotesContext = createContext({});

const Main = () => {
    const {TabPane} = Tabs;

    // Initial values of note initialization
    const title = "New Note";
    const text = "Write your note here...";

    // DB Requests
    const notes = useLiveQuery(() => db.note.toArray());
    const handleDeleteNote = (id) => {db.note.delete(id);}
    const handleAddNote = () => db.note.add({
        title,
        text,
        date: createCurrentDateTime()
    });
    const handleEditNote = (id, title, text, date) => {db.note.update(id, {
        title,
        text,
        date,
    })};

    return(
        <>
            <Tabs size={"large"} tabPosition={"left"}>
                    {notes?.map((note) => {
                        return(
                            <TabPane tab={note?.title} key={note?.id}>
                                <NotesContext.Provider value={{
                                    id: note?.id,
                                    title: note?.title,
                                    text: note?.text,
                                    date: note?.date,
                                    delete: handleDeleteNote,
                                    add: handleAddNote,
                                    update: handleEditNote,
                                }}>
                                    <Workspace/>
                                </NotesContext.Provider>

                            </TabPane>
                        )
                    })}
            </Tabs>
        </>
    )
}

export default Main;