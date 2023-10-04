import { render, screen } from "@testing-library/react"
import { FabDelete } from "../../../src/calendar/components/FabDelete"
import { Provider } from "react-redux"
import { store } from "../../../src/store/store"

describe('Testing in <FabDelete /> component', () => {
    test('should show the component correctly', () => {
        
        // El estado inicial del componente x defecto es null, ya que 
        // tiene un reder condiconal

        //Lo que renderiza
        // <body>
        //      <div />
        // </body>

        // Queda pendiente esta prueba ya que primero debemos probar el useUiStore.js

        render(
            <Provider store={store}>
                <FabDelete />
            </Provider>
        )
        screen.debug()
        screen.get
    })
})