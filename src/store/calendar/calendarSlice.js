import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

const initialState = {
    events: [
        {
            _id: new Date().getTime(),
            title: "Programando ando",
            notes: "hay que aprender mucho",
            start: new Date(),
            end: addHours(new Date(), 2),
            bgColor: "#fafafa",
            user: {
                uid: "1234",
                name: "Jaime",
            },
        },
    ],
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

export const { setActiveEvent, newEvent, updateEvent, deleteEvent } = calendarSlice.actions;
