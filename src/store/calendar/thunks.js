import { parseISO } from "date-fns"
import { calendarApi } from "../../api"
import { parseStringToDateEvents } from "../../helpers"
import { deleteEvent, loadingEvents, newEvent, setActiveEvent, updateEvent } from "./calendarSlice"

export const onNewEvent = (calendarEvent) => {
    return async (dispatch) => {
        try {
            const calendarToSend = {
                title: calendarEvent.title,
                notes: calendarEvent.notes,
                start: calendarEvent.start,
                end: calendarEvent.end,
                bgColor: calendarEvent.color
            }

            const { data } = await calendarApi.post('/events/new', calendarToSend)

            if (data.ok) {
                const { id, user } = data.eventSaved

                calendarToSend.id = id
                calendarToSend.user = user

                dispatch(newEvent(calendarToSend))
            }

        } catch (error) {
            console.log(error)
        }
    }
}

export const onUpdateEvent = (calendarEvent) => {
    return async (dispatch) => {
        try {
            const { data } = await calendarApi.put(`/events/update/${calendarEvent.id}`, { ...calendarEvent })
            
            if (data.ok) {
                // Errores con las fechas - Tener en cuenta que las fechas que nos retorna el backend estan en formato diferente al que puuede procesar nuestro calendar-react 

                data.event.start = parseISO(data.event.start)
                data.event.end = parseISO(data.event.end)

                dispatch(updateEvent(data.event))
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const onDeleteEvent = () => {
    return async (dispatch, getState) => {
        const event = getState().calendar.activeEvent
        
        try {
            const { data } = await calendarApi.delete(`/events/delete/${event.id}`)

            if (data.ok) {
                dispatch(deleteEvent())
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const onSetActiveEvent = (calendarEvent) => {
    return (dispatch) => {
        dispatch(setActiveEvent(calendarEvent))
    }
}

export const onLoadingEvents = () => {
    return async (dispatch) => {
        try {
            const { data } = await calendarApi.get('/events/get')
            
            if(data.ok && data.events.length > 0) {
                data.events = parseStringToDateEvents(data.events)
                dispatch(loadingEvents(data.events))
            }

        } catch (error) {
            console.log(error)
        }
    }
}