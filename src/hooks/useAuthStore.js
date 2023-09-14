import { useDispatch, useSelector } from "react-redux"

// Verificar porque el thunks, normalmente se usa para esperar las respuestas de un tercero
// en este caso estamos consumiendo nuestra propia api

import { onCheckingToken, onLogin, onLogout, onRegister } from "../store/auth/thunks"
import { setErrorMessage } from "../store/auth/authSlice"

export const useAuthStore = () => {
    const { status, uid, user, errorMessage } = useSelector(store => store.auth)
    const dispatch = useDispatch()

    const handleOnLogin = (email, pasword) => {
        dispatch(onLogin(email,pasword))
    }

    const handleChecking = () => {

        const token = localStorage.getItem('token')

        if(token){
            dispatch(onCheckingToken())
        } else {
            dispatch(onLogout())
        }
    }

    const handleOnLogout = () => {
        dispatch(onLogout())
    }

    // No pasa por los thunks ya que es completamente sincronico
    const handleOnErrorForm = (error) => {
        dispatch(setErrorMessage(error))
    }

    const handleOnRegister = (name, email, password) => {
        dispatch(onRegister(name, email, password))
    }

    return {
        status,
        user,
        errorMessage,
        uid,
        handleOnLogin,
        handleChecking,
        handleOnLogout,
        handleOnErrorForm,
        handleOnRegister
    }
}