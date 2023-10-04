import { renderHook } from "@testing-library/react"
import { useUiStore } from "../../src/hooks"
import { Provider } from "react-redux"
import { store } from "../../src/store/store"
import { configureStore } from "@reduxjs/toolkit"
import { uiSlice } from "../../src/store/ui"
import { act } from "react-dom/test-utils"

// Creo un mock del store para yo definir los estaos que quiero que inicie mi custom Hook
// De esta manera controlo de que forma se ve el estado desde este archivo y puedo ver como se
// comporta al disparar acciones sin necesidad de cambiar el hook "Real"
const getMockStore = (initialState) => {
    return configureStore({
        reducer: {
            ui: uiSlice.reducer
        },
        preloadedState: {
            ui: { ...initialState }
        }
    })
}

describe('Tesging in custo hook useUiStore', () => {
    test('should return default values', () => {
        const mockStore = getMockStore({
            isVisibleToastify: false,
            messageToastify: "",
            isVisibleModal: false
        })

        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        })

        expect(result.current).toEqual({
            isVisibleToastify: false,
            messageToastify: '',
            isVisibleModal: false,
            openDateModal: expect.any(Function),
            closeDateModal: expect.any(Function),
        })
    })

    test('openDateModal should change isVisibleModal to true', () => { 
        const mockStore = getMockStore({
            isVisibleToastify: false,
            messageToastify: "",
            isVisibleModal: false
        })

        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        })
       
        // isVisibleModal no funciona correctamente
        const { isVisibleModal, openDateModal } = result.current

        act(() => {
            openDateModal()
        })

        // isVisibleModal toma el valor del estado en ese instante, luego de diparar la accion,
        // este no se actualizara porque ya fue inicializado

        // console.log({result: result.current, isVisibleModal})
        expect(result.current.isVisibleModal).toBeTruthy()
    })

    test('closeDateModal should change isVisibleModal to false', () => { 
        const mockStore = getMockStore({
            isVisibleToastify: false,
            messageToastify: "",
            isVisibleModal: true
        })

        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        })

        // Esperaria que inicialmente estuviese abierto
        expect(result.current.isVisibleModal).toBeTruthy()
        
        const { closeDateModal } = result.current
        
        // Luego compruebo que cambie el valor al disparar la accion
        act(() => {
            closeDateModal()
        })

        expect(result.current.isVisibleModal).toBeFalsy()
    })
})