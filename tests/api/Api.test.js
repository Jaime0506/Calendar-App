import { calendarApi } from "../../src/api/Api"

describe('Api(CalendarApi) testing', () => {  
    test('should have default settings', () => { 
        expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL)
    })

    test('should have the token in the header of all requests', async () => { 
        localStorage.setItem('token', 'ABCD-123')
        try {
            // No me importa que la peticion no se haga existosamente
            // simplemente necesito verificar que en los headers este
            // el valor que guardamos en el localStorage como token.
            const response = await calendarApi.get('/auth')
        } catch (error) {

            // Acceso hasta el valor e x-token
            const x_token = error.config.headers['x-token']
            expect(x_token).toBe(localStorage.getItem('token'))
        }
    })
})