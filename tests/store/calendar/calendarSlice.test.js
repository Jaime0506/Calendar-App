import { addHours, parseISO } from "date-fns"
import { calendarSlice, cleanData, deleteEvent, loadingEvents, newEvent, setActiveEvent, updateEvent } from "../../../src/store/calendar/calendarSlice"
import { calendarWithActiveEventState, calendarWithEventState, events, initialStateCalendar } from "../../fixtures/calendarStates"

describe('Testing in calendarSlice', () => {
    test('should return initialState', () => {
        const state = calendarSlice.getInitialState()

        expect(state).toEqual(initialStateCalendar)
    })

    test('should return setActiveEvent', () => {
        const state = calendarSlice.reducer(calendarWithEventState, setActiveEvent(events[0]))

        expect(state.activeEvent).toEqual(calendarWithActiveEventState.activeEvent)
    })

    test('newEvent should return events with the event add', () => {
        const newEventCalendar = {
            id: '3',
            start: "Emote",
            end: "Insano",
            title: "Agregando nueva nota",
            notes: "La nota insana"
        }
        const state = calendarSlice.reducer(calendarWithEventState, newEvent(newEventCalendar))
        expect(state.events).toContain(newEventCalendar)
    })

    test('updateEvent shoudld update event', () => {
        const newEvent = {
            id: '1',
            start: new Date("2023-02-24 13:00:00"),
            end: addHours(parseISO("2023-02-24 13:00:00"), 2),
            title: "Cambie la nota",
            notes: 'Alguna'
        }

        let state = calendarSlice.reducer(calendarWithEventState, updateEvent(newEvent))
        expect(state.events).toContain(newEvent)
    })

    test('deleteEvent sould delete event active', () => { 
        let state = calendarSlice.reducer(calendarWithActiveEventState, deleteEvent())
        
        expect(state.events).not.toContain(events[0])
        expect(state.activeEvent).toBe(null)
    })

    test('loadingEvent', () => { 
        let state = calendarSlice.reducer(initialStateCalendar, loadingEvents(events)) 
        expect(state).toEqual(calendarWithEventState)
    })

    test('cleanData should clear state', () => {  
        let state = calendarSlice.reducer(calendarWithActiveEventState, cleanData())
        expect(state).toEqual(initialStateCalendar)
    })
})