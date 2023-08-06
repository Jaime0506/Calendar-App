import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store/calendar";

export const useCalendarStore = () => {
    const { events, activeEvent } = useSelector((store) => store.calendar);
    const dispatch = useDispatch()

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    };

    const startSavingEvent = async (calendarEvent) => {
        
        if (calendarEvent._id) {
            // SI LA RESPUESTA DEL BACKEND TIENE ID, SIGNIFICA QUE ESTAMOS
            // ACTUALIZANDO UN EVENTO
            dispatch(onUpdateEvent({ ...calendarEvent }))
        } else {
            // DE LO CONTRARIO SIGNIFICA QUE ESTAMOS CREANDO UN EVENTO Y DEBEMOS
            // ASIGNARLE UN _ID A TRAVES DEL BACKEND
            dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }))
        }
    }

    const startDeletingEvent = () => {
        dispatch(onDeleteEvent())
    }

    return {
        events,
        activeEvent,
        hasOnEventSelected: !!activeEvent,

        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
    };
};
