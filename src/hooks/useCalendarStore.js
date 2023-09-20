import { useDispatch, useSelector } from "react-redux";
import { onDeleteEvent, onLoadingEvents, onNewEvent, onSetActiveEvent, onUpdateEvent } from "../store/calendar/thunks";

export const useCalendarStore = () => {
    const { events, activeEvent } = useSelector((store) => store.calendar);
    const dispatch = useDispatch()

    const handleOnSetActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    };

    const handleOnSavingEvent = (calendarEvent, color) => {
        if (calendarEvent.id) {
            // SI LA RESPUESTA DEL BACKEND TIENE ID, SIGNIFICA QUE ESTAMOS
            // ACTUALIZANDO UN EVENTO
            dispatch(onUpdateEvent({ ...calendarEvent, bgColor: color }))
        } else {
            // DE LO CONTRARIO SIGNIFICA QUE ESTAMOS CREANDO UN EVENTO Y DEBEMOS
            // ASIGNARLE UN _ID A TRAVES DEL BACKEND
            dispatch(onNewEvent({...calendarEvent, color }))
        }
    }

    const handleOnDeleteEvent = () => {
        dispatch(onDeleteEvent())
    }

    const handleOnLoadingEvents = () => {
        dispatch(onLoadingEvents())
    }

    return {
        events,
        activeEvent,
        hasOnEventSelected: !!activeEvent,

        handleOnSetActiveEvent,
        handleOnSavingEvent,
        handleOnDeleteEvent,
        handleOnLoadingEvents
    };
};
