import { render, screen } from "@testing-library/react"
import { useAuthStore } from "../../src/hooks/useAuthStore"
import { AppRouter } from "../../src/router/AppRouter"

jest.mock("../../src/hooks/useAuthStore")

describe('Testing in <AppRouter />', () => {  

    const mockHandleChecking = jest.fn()
    
    beforeEach(() => jest.clearAllMocks())

    test('the Loading should be displayed and the handleCheckin function should be called when the component is mounted', () => {  
        
        useAuthStore.mockReturnValue({
            status: "checking",
            handleChecking: mockHandleChecking
        })

        render(<AppRouter />)

        expect(screen.getByText("Loading...")).toBeTruthy()
        expect(mockHandleChecking).toHaveBeenCalled()
    })
})