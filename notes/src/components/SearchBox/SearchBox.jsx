import Search from "antd/es/input/Search";
import {useContext, useEffect, useState} from "react";
import {SidebarContext} from "../Main/Main";

const SearchBox = () => {

    const {notes, filteredNotes} = useContext(SidebarContext);
    const [searchedNote, setSearchedNote] = useState("");

    useEffect(() => {
        const Debounce = setTimeout(() => {
            const filNotes = notes.filter((note) => {
                return note.title.toLowerCase().includes(searchedNote.toLowerCase());
            });

            filteredNotes(filNotes);
        }, 100);

        return () => clearTimeout(Debounce);
    }, [searchedNote])

    return(
        <>
            <Search placeholder="input search text" onChange={(e) => setSearchedNote(e.target.value)} style={{ width: "100%" }} />
        </>
    )
}

export default SearchBox;