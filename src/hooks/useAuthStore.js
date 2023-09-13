import { useDispatch, useSelector } from "react-redux"

// Verificar porque el thunks, normalmente se usa para esperar las respuestas de un tercero
// en este caso estamos consumiendo nuestra propia api

import { onLogin, onLogout } from "../store/auth/thunks"

export const useAuthStore = () => {
    const { status, uid, user, errorMessage } = useSelector(store => store.auth)
    const dispatch = useDispatch()

    const handleOnLogin = (email, pasword) => {
        dispatch(onLogin(email,pasword))
    }

    const handleChecking = () => {
        localStorage.getItem('auth-token') ? console.log("Existe sesion") : dispatch(onLogout())
    }

    const handleOnLogout = () => {
        dispatch(onLogout())
    }

    return {
        status,
        user,
        errorMessage,
        uid,
        handleOnLogin,
        handleChecking,
        handleOnLogout
    }
}