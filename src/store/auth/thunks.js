import { calendarApi } from "../../api"
import { cleanData } from "../calendar/calendarSlice"
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
        localStorage.removeItem('token')
        localStorage.removeItem('token-init-date')

        dispatch(logout())
        dispatch(cleanData())
    }
}

export const onRegister = ({name, email, password}) => {
    return async(dispatch) => {
        dispatch(checking())
        try {
            const { data } = await calendarApi.post('/auth/register', { name, email, password })

            if (data.ok) {
                localStorage.setItem('token', data.token)
                localStorage.setItem('token-init-date', new Date().getTime())

                const { name, uid } = data
                dispatch(login({name, uid}))
                
            }
        } catch (error) {
            const { response: { data } } = error
            dispatch(logout(data.msg))
        }
    }
}

export const onCheckingToken = () => {
    return async(dispatch) => {
        dispatch(checking())
        
        try {
            // Podemos mandar los headers en cada peticion, en caso de que sean pocas las que requieran de este parametro,
            // pero si son muchas peticiones que requerimos de headers, podemos configurarlos con interceptors en la config de la /Api/api

            // const { data } = await calendarApi.get('/auth/renew', { headers: { "x-token": token }})

            // con la configuracion del interceptor la peticion quedaria asi:
            const { data } = await calendarApi.get('/auth/renew')

            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            
            if (data.ok) {
                const { name, uid } = data
                dispatch(login({name, uid}))
            }

        } catch (error) {
            // const { response: { data }} = error
            dispatch(logout())

        }
    }
}