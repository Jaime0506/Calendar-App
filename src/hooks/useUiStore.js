import { useDispatch, useSelector } from "react-redux"
import { onCloseModal, onCloseToastify, onOpenModal, onOpenToastify } from "../store/ui"

export const useUiStore = () => {
    const { isVisibleToastify, messageToastify, isVisibleModal } = useSelector(state => state.ui)
    const dispatch = useDispatch()

    const openDateModal = () => {
        dispatch(onOpenModal())
    }

    const closeDateModal = () => {
        dispatch(onCloseModal())
    }

    const closeToastify = () => {
        dispatch(onCloseToastify())
    }

    const openToastify = (message) => {
        dispatch(onOpenToastify(message))
    }

    return {
        // properties
        isVisibleToastify,
        messageToastify,
        isVisibleModal,

        openDateModal,
        closeDateModal,
        closeToastify,
        openToastify,
    }

}