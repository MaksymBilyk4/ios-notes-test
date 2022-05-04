import {useLiveQuery} from "dexie-react-hooks";
import {db} from "../../utils/db";
import Workspace from "../Workspace/Workspace";
import {useState} from "react";
import createCurrentDateTime from "../../utils/currentDateTime";
import Layout from "antd/es/layout/layout";
import Sidebar from "../Sidebar/Sidebar";
import {SidebarContext, WorkspaceContext, HeaderModalContext} from "../../context/Context";
import NotesHeader from "../Header/NotesHeader";
import NoNotesData from "../NoNotesData/NoNotesData";

const Main = () => {

    // Workspace comp edit note state
    const [edit, setEdit] = useState(false);
    const onEdit = () => setEdit(true);
    const onEditCancel = () => setEdit(false);

    // Modal state
    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleCancel = () => {
        setIsModalVisible(false);
    }
    const openModal = () => {
        setIsModalVisible(true);
    }

    // Initial values of note initialization
    const title = "New Note";
    const text = "No additional text yet...";

    // DB Requests
    const notes = useLiveQuery(async () => await db.note.toArray());

    const handleDeleteNote = (id) => {
        db.note.delete(id);
        setIsModalVisible(false);
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

    //Current note at sidebar
    const [currentNoteId, setCurrentNoteId] = useState(1);
    const handleCurrentNoteId = (id) => {
        setCurrentNoteId(id);
    };

    // Filter for SearchBox
    const [filteredNotes, setFilteredNotes] = useState([]);
    const filterNotes = (notes) => setFilteredNotes(notes);

    return (
        <>
            <Layout>
                <SidebarContext.Provider value={{
                    notes: filteredNotes.length > 0 ? filteredNotes : notes || [],
                    activeNoteId: currentNoteId,
                    filterNotes: filterNotes,
                    currentNoteId: handleCurrentNoteId,
                }}>
                    <Sidebar/>
                </SidebarContext.Provider>

                <Layout>
                    <HeaderModalContext.Provider value={{
                        notes: notes || [],
                        modalVisibility: isModalVisible,
                        edit: edit,
                        activeNoteId: currentNoteId,
                        openModal: openModal,
                        handleCancel: handleCancel,
                        handleOk: handleDeleteNote,
                        onEdit: onEdit,
                        add: handleAddNote,
                    }}>
                        <NotesHeader/>
                    </HeaderModalContext.Provider>

                    <WorkspaceContext.Provider value={{
                        activeNoteId: currentNoteId,
                        notes: notes || [],
                        edit: edit,
                        update: handleEditNote,
                        onEditCancel: onEditCancel,
                        add: handleAddNote,
                        setCurrentNoteId: handleCurrentNoteId,
                    }}>
                        {notes?.length > 0 ? notes?.map(note => {
                            return (
                                <div key={note?.id}>
                                    <Workspace id={note?.id} noteTitle={note?.title} noteText={note?.text} date={note?.date}/>
                                </div>
                            )
                        }) : <NoNotesData><p>You have not any notes yet.</p></NoNotesData>}
                    </WorkspaceContext.Provider>
                </Layout>
            </Layout>
        </>
    )
}

export default Main;