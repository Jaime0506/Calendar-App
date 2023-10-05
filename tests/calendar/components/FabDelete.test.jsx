import { fireEvent, render, screen } from "@testing-library/react"
import { FabDelete } from "../../../src/calendar/components/FabDelete"
import { useCalendarStore } from "../../../src/hooks/useCalendarStore"

jest.mock("../../../src/hooks/useCalendarStore")

describe('Testing in <FabDelete /> component', () => {

    const mockHandleOnDeleteEvent = jest.fn()

    beforeEach(() => jest.clearAllMocks())

    test('should show the component correctly', () => {
        
        useCalendarStore.mockReturnValue({
            hasOnEventSelected: false
        })

        render(<FabDelete />)
        // screen.debug()

        const btn = screen.getByLabelText('btn-fab')

        // comprobamos que el boton tenga todas las clases que esperamos
        expect(btn.classList).toContain("btn")
        expect(btn.classList).toContain("btn-danger")
        expect(btn.classList).toContain("fab-danger")
        
        // Comprobamos que el display del boton, debe estar en none
        expect(btn.style.display).toBe("none")
    })

    test('should show the component if there is an active event', () => {
        
        useCalendarStore.mockReturnValue({
            hasOnEventSelected: true

        })

        render(<FabDelete />)
        screen.debug()
        // React cuando encuentra en la propedad style una propiedad vacia como display: "", directamente
        // no la renderiza en el componente

        const btn = screen.getByLabelText('btn-fab')
        expect(btn.style.display).toBe("")
    })

    test('the action should fire when the button is clicked', () => {
        
        useCalendarStore.mockReturnValue({
            hasOnEventSelected: true,
            handleOnDeleteEvent: mockHandleOnDeleteEvent
        })

        render(<FabDelete />)
        screen.debug()
        // React cuando encuentra en la propedad style una propiedad vacia como display: "", directamente
        // no la renderiza en el compon

        const btn = screen.getByLabelText("btn-fab")
        // Disparamos el evento click sobre el boton
        fireEvent.click(btn)

        // YO esperaria que la funcion de eleiminar evento halla sido llamada
        expect(mockHandleOnDeleteEvent).toHaveBeenCalled()
    })
})