import {Alert, Modal} from "antd";
import {useContext} from "react";
import {HeaderModalContext} from "../../context/Context";

export const ModalDelete = ({deletingId}) => {
    const {modalVisibility, handleCancel, handleOk} = useContext(HeaderModalContext);

    return(
        <>
            <Modal visible={modalVisibility} onOk={() => handleOk(deletingId)} onCancel={handleCancel} title={"Are you sure you want to delete this note?"}>
                <Alert
                    message="Warning"
                    description="You will never be able to restore it again."
                    type="warning"
                    showIcon
                />
            </Modal>
        </>
    )
}

