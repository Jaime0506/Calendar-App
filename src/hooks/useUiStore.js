import { useDispatch, useSelector } from "react-redux"
import { onCloseModal, onOpenModal } from "../store/ui"

export const useUiStore = () => {
    const { isVisibleToastify, messageToastify, isVisibleModal } = useSelector(state => state.ui)
    const dispatch = useDispatch()

    const openDateModal = () => {
        dispatch(onOpenModal())
    }

    const closeDateModal = () => {
        dispatch(onCloseModal())
    }

    return {
        // properties
        isVisibleToastify,
        messageToastify,
        isVisibleModal,

        openDateModal,
        closeDateModal,
    }
}