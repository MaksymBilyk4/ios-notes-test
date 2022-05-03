import {Alert, Modal} from "antd";
import {useContext} from "react";
import {ModalContext} from "../Main/Main";

export const ModalDelete = ({deletingId}) => {
    const modalContext = useContext(ModalContext);

    return(
        <>
            <Modal visible={modalContext.modalVisibility} onOk={() => modalContext.handleOk(deletingId)} onCancel={modalContext.handleCancel} title={"Are you sure you want to delete this note?"}>
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

