import { calendarApi } from "../../api"
import { newEvent, setActiveEvent } from "./calendarSlice"

export const onSavingEvent = (calendarEvent) => {
    return async(dispatch) => {
        try {
            const calendarToSend = {
                title: calendarEvent.title,
                notes: calendarEvent.notes,
                start: calendarEvent.start,
                end: calendarEvent.end
            }

            const { data } = await calendarApi.post('/events/new', calendarToSend)
            
            if (data.ok) {
                const { id, user } = data.eventSaved
                
                calendarToSend._id = id
                calendarToSend.user = user
                calendarToSend.bgColor = "#fafafa"

                console.log(calendarToSend)

                dispatch(newEvent(calendarToSend))
            }

        } catch (error) {
            console.log(error)
        }
    }
}

export const onUpdateEvent = () => {
    return async() => {
        console.log("Actualizando ando")
    }
}

export const onDeleteEvent = () => {
    return async() => {
        console.log("Borrando ando")
    }
}

export const onSetActiveEvent = (calendarEvent) => {
    return (dispatch) => {
        dispatch(setActiveEvent(calendarEvent))
    }
}