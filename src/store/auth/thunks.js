import { calendarApi } from "../../api"
import { checking, login, logout } from "./authSlice"

export const onLogin = (email, password) => {
    return async(dispatch) => {
        dispatch(checking())

        try {
            const { data } = await calendarApi.post('/auth/login', { email, password })

            if (data.ok) {
                localStorage.setItem('token', data.token)
                localStorage.setItem('token-init-date', new Date().getTime())

                const { name, uid } = data
                dispatch(login({name, uid}))
            }

        } catch (error) {
            dispatch(logout("Credenciales incorrectos"))
        }
    }
}

export const onLogout = () => {
    return (dispatch) => {
        dispatch(logout())
    }
}