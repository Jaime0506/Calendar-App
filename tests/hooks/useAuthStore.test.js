import { configureStore } from "@reduxjs/toolkit"
import { authSlice } from "../../src/store/auth/authSlice"
import { renderHook } from "@testing-library/react"
import { useAuthStore } from "../../src/hooks"
import { Provider, useDispatch } from "react-redux"
import { notAuthenticatedState } from "../fixtures/authStates"
import { act } from "react-dom/test-utils"
import { testUserCredentials } from "../fixtures/testUser"
import { onLogin, onRegister, onLogout } from "../../src/store/auth/thunks"



// AL usar un Thunk que se encarga de hacer las peticiones asincronas, solo voy a verificar
// que las funciones onLogin que dispara el dispatch de la funcion hallan sido llamadas con los argumentos esperados
// posteriormente probare directamente los thunks para que realizen el cambio que yo deseo


jest.mock("../../src/store/auth/thunks", () => ({
    ...jest.requireActual("../../src/store/auth/thunks"),
    onLogin: jest.fn(),
    onRegister: jest.fn(),
    onLogout: jest.fn()
}))

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: () => jest.fn()
}))

const getMockStore = (initialState) => {
    return configureStore({
        reducer: {
            auth: authSlice.reducer
        },
        preloadedState: {
            auth: { ...initialState }
        }
    })
}

describe('Testing in custom hook useAuthStore', () => {

    jest.clearAllMocks()

    test('should return default state', () => {
        const mockStore = getMockStore({
            status: "checking", // authenticated // not-authenticated
            user: {},
            errorMessage: null,
        })

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        })

        expect(result.current).toEqual({
            status: 'checking',
            user: {},
            errorMessage: null,
            uid: undefined,
            handleOnLogin: expect.any(Function),
            handleChecking: expect.any(Function),
            handleOnLogout: expect.any(Function),
            handleOnErrorForm: expect.any(Function),
            handleOnRegister: expect.any(Function)
        })
    })
    
    // Estas pruebas no estan del todo bien hechas, ya que se deberian hacer pruebas lo mas atomicas posibles,
    // como tenemos un Thunk y lo consumimos mediante un custom hook es mas completo la comprobacion de la misma
    // Por tal motivo simplemente estamos probando que se llamen las funciones del thunk con los argumentos esperados, 
    // mas no que cambie el estado

    test('onLogin function should be called when handleOnLogin is triggered with its arguments', () => { 
        const mockStore = getMockStore({...notAuthenticatedState})
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        })

        const { handleOnLogin } = result.current

        act(() => {
            handleOnLogin(testUserCredentials.email, testUserCredentials.password)
        })

        expect(onLogin).toHaveBeenCalledWith(testUserCredentials.email, testUserCredentials.password)
    })

    test('onRegister function should be called when handleOnRegister is triggered with its arguments', () => {  
        const mockStore = getMockStore({...notAuthenticatedState})
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        })

        const { handleOnRegister } = result.current

        act(() => {
            handleOnRegister(testUserCredentials.name, testUserCredentials.email, testUserCredentials.password)
        })

        const { name, email, password } = testUserCredentials

        expect(onRegister).toHaveBeenCalledWith(name, email, password)
    })

    test('onLogout function should be called when handleOnLogout is triggered', () => {  
        const mockStore = getMockStore({...notAuthenticatedState})
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        })

        const { handleOnLogout } = result.current

        act(() => {
            handleOnLogout(testUserCredentials.name, testUserCredentials.email, testUserCredentials.password)
        })

        expect(onLogout).toHaveBeenCalledTimes(1)
    })
})