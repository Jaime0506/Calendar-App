import { addHours, parseISO } from "date-fns";

// La documentacion de date-fns recomienda usar el parseISO dentro de
// las funciones para agregar tiempo

// https://github.com/date-fns/date-fns/blob/main/docs/upgradeGuide.md#string-arguments

export const events = [
    {
        id: '1',
        start: new Date("2023-02-24 13:00:00"),
        end: addHours(parseISO("2023-02-24 13:00:00"), 2),
        title: "Ejemplo de nota",
        notes: 'Alguna'
    },

    {
        id: '2',
        start: parseISO(new Date("2023-02-21 13:00:00")),
        end: addHours(parseISO("2023-02-21 13:00:00"), 2),
        title: "Ejemplo 2 de otra nota",
        notes: 'Alguna nota se debe poner en este campo'
    }
]

export const initialStateCalendar = {
    events: [],
    activeEvent: null,
}

export const calendarWithEventState = {
    events: [...events],
    activeEvent: null,
}

export const calendarWithActiveEventState = {
    events: [...events],
    activeEvent: {...events[0]},
}