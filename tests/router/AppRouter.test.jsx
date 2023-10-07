import { render, screen } from "@testing-library/react"
import { useAuthStore } from "../../src/hooks/useAuthStore"
import { AppRouter } from "../../src/router/AppRouter"
import { MemoryRouter } from "react-router-dom"
import { CalendarPage } from "../../src/calendar/page/CalendarPage"

jest.mock("../../src/hooks/useAuthStore")

// Simplemente necesitamos verificar que se renderize el componente de CalendarPage, cuando
// se encuentra authenticado, pero si renderizamos x defecto nos da muchos errores
// por los diferentes custom hooks que usamos en este componente, por esto
// Simplemente podemos hacer un mock del componente y que regrese un simple <h1>Calendar Page</h1>
jest.mock("../../src/calendar/page/CalendarPage", () => ({
    CalendarPage: () => <h1>Calendar Page</h1>
}))

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

    test('should show <LoginPage /> when status is not-authenticated', () => {

        useAuthStore.mockReturnValue({
            status: "not-authenticated",
            handleChecking: mockHandleChecking
        })

        const { container } = render(
            <MemoryRouter>
                <AppRouter />
            </MemoryRouter>
        )
        
        expect(screen.getByText("Ingreso")).toBeTruthy()
        expect(container).toMatchSnapshot()
    })

    test('should show <CalendarPage /> when status is authenticated', () => {  
        useAuthStore.mockReturnValue({
            status: "authenticated",
            handleChecking: mockHandleChecking
        })

        const { container } = render(
            <MemoryRouter>
                <AppRouter />
            </MemoryRouter>
        )

        expect(screen.getByText("Calendar Page")).toBeTruthy()
        expect(container).toMatchSnapshot()
    })
})