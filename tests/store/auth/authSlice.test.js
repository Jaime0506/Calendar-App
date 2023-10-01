import { authSlice, clearErrorMessage, login, logout } from "../../../src/store/auth/authSlice"
import { initialState, authenticatedState, notAuthenticatedState, testUserCredentials } from "../../fixtures"

describe('Testing in authSlice', () => {  

    test('should return initial state', () => { 
        expect(authSlice.getInitialState()).toEqual(initialState)
    })

    test('should return authenticatedState when login', () => {  
        let state = authSlice.reducer(initialState, login(testUserCredentials))

        expect(state).toEqual(authenticatedState)
    })

    test('should return notAuthenticatedState when logout', () => { 
        let state = authSlice.reducer(authenticatedState, logout())

        expect(state).toEqual(notAuthenticatedState)
    })

    test('should return notAuthenticatedState with errorMessage when logout', () => {  
        const errorMessage = "Error insano"
        let state = authSlice.reducer(authenticatedState, logout(errorMessage))

        expect(state).toEqual({...notAuthenticatedState, errorMessage })
    })

    test('should return notAutheticatedState with cleanErrorMessage when logout', () => { 
        const errorMessage = "Error insano"
        const state = authSlice.reducer(authenticatedState, logout(errorMessage))
        const newState = authSlice.reducer(state, clearErrorMessage())

        // El state que se le dispara el logout debe almacenar el errorMessage y compruebo que lo tenga
        expect(state).toEqual({...notAuthenticatedState, errorMessage})

        // El newState ya es con el errorMessage limpiado, verificando que se halla dispachado la accion
        // y quede el componente como nosotros esperamos
        expect(newState).toEqual({...notAuthenticatedState})
    })
})