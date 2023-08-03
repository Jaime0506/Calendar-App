import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { addHours } from "date-fns";

import { Navbar, CalendarEvent, CalendarModal } from "../";
import { localizer, getMessages } from "../../helpers";
import { useState } from "react";
import { useUiStore } from "../../hooks/useUiStore";

export const CalendarPage = () => {
    // Guardamos en el locale storage, la ultima vista visitada
    const { openDateModal } = useUiStore()
    const [lastView, setLastView] = useState(
        localStorage.getItem("lastView") || "week"
    );

    const onDobleClick = () => {
        openDateModal()
    };

    const onSelected = (event) => {
        console.log({ onClick: event });
    };

    const onViewChanged = (event) => {
        localStorage.setItem("lastView", event);
        setLastView(event);
    };

    const events = [
        {
            title: "Cumpleaños Jefe",
            notes: "Hay que comprar pastel",
            start: new Date(),
            end: addHours(new Date(), 2),
            bgColor: "#fafafa",
            user: {
                id: "1234",
                name: "Jaime",
            },
        },
        {
            title: "Cumpleaños mi vida Hermosa",
            notes: "Cumple años el amor de mi vida, lo mas lindo que tengo",
            start: addHours(new Date(), 5),
            end: addHours(new Date(), 7),
            bgColor: "#fafafa",
            user: {
                name: "Jaime",
            },
        },
    ];

    // eslint-disable-next-line no-unused-vars
    const eventStyleGetter = (event, start, end, isSelected) => {
        const style = {
            backgroundColor: "#347CF7",
            borderRadius: "0px",
            opacity: 0.8,
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
                style={{ height: 500 }}
                messages={getMessages()}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: CalendarEvent,
                }}
                onDoubleClickEvent={onDobleClick}
                onSelectEvent={onSelected}
                onView={onViewChanged}
            />
            <CalendarModal />
        </>
    );
};
