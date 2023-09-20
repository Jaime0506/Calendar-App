import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    events: [],
    activeEvent: null,
};

export const calendarSlice = createSlice({
    name: "calendar",
    initialState: initialState,
    reducers: {
        setActiveEvent: (state, { payload }) => {
            state.activeEvent = payload;
        },

        newEvent: (state, { payload }) => {
            state.events.push(payload)
            state.activeEvent = null;
        },

        loadingEvents: (state, { payload }) => {
            state.events = payload
        },

        updateEvent: (state, { payload }) => {
            state.events = state.events.map((event) => {
                if (event.id === payload.id) {
                    return payload
                }

                return event
            })
            state.activeEvent = null
        },

        deleteEvent: (state) => {
            if (state.activeEvent) {
                state.events = state.events.filter((event) => event.id !== state.activeEvent.id)
                state.activeEvent = null
            }
        },

        cleanData: (state) => {
            state.activeEvent = null
            state.events = []
        }
    },
});

export const { setActiveEvent, newEvent, updateEvent, deleteEvent, loadingEvents, cleanData } = calendarSlice.actions;
