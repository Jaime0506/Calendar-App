import { useState } from "react";
import { Calendar } from "react-big-calendar";

import { useUiStore, useCalendarStore } from "../../hooks";
import { localizer, getMessages } from "../../helpers";

import { Navbar, CalendarEvent, CalendarModal, FabAddNew, FabDelete } from "../";

import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect } from "react";

export const CalendarPage = () => {
    // Guardamos en el locale storage, la ultima vista visitada
    const { openDateModal, isVisibleModal } = useUiStore()
    const { events, handleOnSetActiveEvent, handleOnLoadingEvents } = useCalendarStore()

    const [lastView, setLastView] = useState(
        localStorage.getItem("lastView") || "week"
    );

    const onDobleClick = () => {
        openDateModal()
    };

    const onSelected = (event) => {
        handleOnSetActiveEvent(event)
    };

    const onViewChanged = (event) => {
        localStorage.setItem("lastView", event);
        setLastView(event);
    };    

    useEffect(() => {
        handleOnLoadingEvents()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // eslint-disable-next-line no-unused-vars
    const eventStyleGetter = (event, start, end, isSelected) => {
        const style = {
            backgroundColor: event.bgColor,
            color: "white",
        };

        return {
            style,
        };
    };

    return (
        <>
            <Navbar />
            <Calendar
                culture="es"
                events={events}
                defaultView={lastView}
                localizer={localizer}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc( 100vh - 80px )' }}
                messages={getMessages()}
                eventPropGetter= {eventStyleGetter }
                components={{
                    event: CalendarEvent,
                }}
                onDoubleClickEvent={onDobleClick}
                onSelectEvent={onSelected}
                onView={onViewChanged}
            />
            { isVisibleModal && <CalendarModal />}
            <FabAddNew />
            <FabDelete />
        </>
    );
};
