import { useDispatch, useSelector } from "react-redux";
import { onDeleteEvent, onSavingEvent, onSetActiveEvent, onUpdateEvent } from "../store/calendar/thunks";

export const useCalendarStore = () => {
    const { events, activeEvent } = useSelector((store) => store.calendar);
    const dispatch = useDispatch()

    const handleOnSetActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    };

    const handleOnSavingEvent = (calendarEvent) => {
        
        if (calendarEvent._id) {
            // SI LA RESPUESTA DEL BACKEND TIENE ID, SIGNIFICA QUE ESTAMOS
            // ACTUALIZANDO UN EVENTO
            dispatch(onUpdateEvent({ ...calendarEvent }))
        } else {
            // DE LO CONTRARIO SIGNIFICA QUE ESTAMOS CREANDO UN EVENTO Y DEBEMOS
            // ASIGNARLE UN _ID A TRAVES DEL BACKEND
            dispatch(onSavingEvent({ ...calendarEvent, _id: new Date().getTime() }))
        }
    }

    const handleOnDeleteEvent = () => {
        dispatch(onDeleteEvent())
    }

    return {
        events,
        activeEvent,
        hasOnEventSelected: !!activeEvent,

        handleOnSetActiveEvent,
        handleOnSavingEvent,
        handleOnDeleteEvent,
    };
};
