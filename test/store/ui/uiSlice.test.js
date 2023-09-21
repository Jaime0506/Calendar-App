import { onCloseModal, onCloseToastify, onOpenModal, onOpenToastify, uiSlice } from '../../../src/store/ui/uiSlice'

describe('Testíng in uiSlice (rtk)', () => {
    test('should return default state', () => {
        const initialState = {
            isVisibleToastify: false,
            messageToastify: '',
            isVisibleModal: false
        }
        // console.log(uiSlice.getInitialState())
        expect(uiSlice.getInitialState()).toEqual(initialState)
        
    })

    test('should change the isVisibleModal when the onOpenModal or onCloseModal function is called ', () => {  
        let state = uiSlice.getInitialState()

        state = uiSlice.reducer(state, onOpenModal())
        expect(state.isVisibleModal).toBeTruthy()

        state = uiSlice.reducer(state, onCloseModal())
        expect(state.isVisibleModal).toBeFalsy()
    })

    test('should change the isVisibleToastify when the onOpenToastify or onCloseToastify with its payload', () => {  
        let state = uiSlice.getInitialState()
        let messageExample = "Message ejemplo para comprobar su funciona el toasty"
        
        state = uiSlice.reducer(state, onOpenToastify(messageExample))

        // Compruebo que se cambie el valor de isVisibleModal y compruebo
        // que venga el mensaje que yo le pase al momento de llamar la respectiva accion
        expect(state.isVisibleToastify).toBeTruthy()
        expect(state.messageToastify).toBe(messageExample)

        // Compruebo que se cierre el modal y cambie el respectivo mensaje
        state = uiSlice.reducer(state, onCloseToastify())

        expect(state.isVisibleToastify).toBeFalsy()
        expect(state.messageToastify).toBe("")
    })
})