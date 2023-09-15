import { calendarApi } from "../../api"
import { parseStringToDateEvents } from "../../helpers"
import { loadingEvents, newEvent, setActiveEvent } from "./calendarSlice"

export const onNewEvent = (calendarEvent) => {
    return async (dispatch) => {
        try {
            const calendarToSend = {
                title: calendarEvent.title,
                notes: calendarEvent.notes,
                start: calendarEvent.start,
                end: calendarEvent.end,
                bgColor: "#fafafa"
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

export const onUpdateEvent = () => {
    return async () => {
        console.log("Actualizando ando")
    }
}

export const onDeleteEvent = () => {
    return async () => {
        console.log("Borrando ando")
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