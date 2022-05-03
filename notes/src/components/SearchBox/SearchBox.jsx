import Search from "antd/es/input/Search";
import {useContext, useEffect, useState} from "react";
import {SidebarContext} from "../Main/Main";

const SearchBox = () => {

    const sidebarContext = useContext(SidebarContext);
    const [searchedNote, setSearchedNote] = useState("");

    useEffect(() => {
        const Debounce = setTimeout(() => {
            if (!searchedNote) {
                return sidebarContext?.notes;
            }

            const filNotes = sidebarContext?.notes.filter((note) => {
                return note.title.toLowerCase().includes(searchedNote.toLowerCase());
            });

            sidebarContext?.filteredNotes(filNotes);
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