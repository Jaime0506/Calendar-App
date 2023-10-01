import { addHours } from "date-fns";

export const events = [
    {
        id: '1',
        start: new Date("2023-02-24 13:00:00"),
        end: addHours("2023-02-24 15:00:00"),
        title: "Ejemplo de nota",
        notes: 'Alguna'
    },

    {
        id: '2',
        start: new Date("2023-02-21 13:00:00"),
        end: addHours("2023-02-21 15:00:00"),
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