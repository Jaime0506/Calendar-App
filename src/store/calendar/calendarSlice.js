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
                if (event._id === payload._id) {
                    return payload
                }

                return event
            })
            state.activeEvent = null
        },

        deleteEvent: (state) => {
            if (state.activeEvent) {
                state.events = state.events.filter((event) => event._id !== state.activeEvent._id)
                state.activeEvent = null
            }
        }
    },
});

export const { setActiveEvent, newEvent, updateEvent, deleteEvent, loadingEvents } = calendarSlice.actions;
