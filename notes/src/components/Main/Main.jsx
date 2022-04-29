import {useLiveQuery} from "dexie-react-hooks";
import {db} from "../../utils/db";
import {Tabs} from "antd";
import Workspace from "../Workspace/Workspace";
import {createContext} from "react";

export const NotesContext = createContext({});

const Main = () => {
    const {TabPane} = Tabs;

    const notes = useLiveQuery(() => db.note.toArray());
    const handlerDeleteNote = (id) => {db.note.delete(id);}


    // const day = dateNow.toLocaleDateString("en-US", {day: "numeric"});
    // const month = dateNow.toLocaleDateString("en-US", {month: "long"});
    // const year = dateNow.getFullYear();
    // const hours = dateNow.getHours();
    // const time = dateNow.getMinutes();

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
                                    delete: handlerDeleteNote,
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