import {Button, Empty} from "antd";
import {useContext} from "react";
import {WorkspaceContext} from "../../context/Context";
import "./no-notes.data.css";

const NoNotesData = ({children}) => {
    const {add} = useContext(WorkspaceContext);

    return (
        <div className={"no-data__container"}>
            <Empty description={children}>
                <Button type={"primary"} ghost onClick={add}>Create new note</Button>
            </Empty>
        </div>
    )
}

export default NoNotesData;