import { useDispatch, useSelector } from "react-redux"
import { onCloseModal, onCloseToastify, onOpenModal, onOpenToastify } from "../store/ui"

export const useUiStore = () => {
    const { toastify, modal } = useSelector(state => state.ui)
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
        toastify,
        modal,

        openDateModal,
        closeDateModal,
        closeToastify,
        openToastify,
    }

}