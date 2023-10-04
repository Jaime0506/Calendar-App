import { configureStore } from "@reduxjs/toolkit"
import { authSlice } from "../../src/store/auth/authSlice"
import { renderHook } from "@testing-library/react"
import { useAuthStore } from "../../src/hooks"
import { Provider } from "react-redux"

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
})