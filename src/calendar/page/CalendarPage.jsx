import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { addHours } from "date-fns";

import { Navbar, CalendarEvent } from '../'
import { localizer, getMessages } from "../../helpers";

export const CalendarPage = () => {
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
                name: "Jaime"
            }
        }
    ];

    const eventStyleGetter = (event, start, end, isSelected) => {
        console.log({ event, start, end, isSelected})
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
            <div>
                <Calendar
                    culture="es"
                    events={events}
                    localizer={localizer}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                    messages={getMessages()}
                    eventPropGetter={ eventStyleGetter }
                    components={{
                        event: CalendarEvent
                    }}
                />
            </div>
        </>
    );
};
