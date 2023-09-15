import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks";

export const FabAddNew = () => {
    const { openDateModal } = useUiStore();
    const { handleOnSetActiveEvent } = useCalendarStore();

    const click = () => {
        handleOnSetActiveEvent({
            title: "",
            notes: "",
            start: new Date(),
            end: addHours(new Date(), 2),
            bgColor: "#fafafa",
            user: {
                _id: "1234",
                name: "Jaime",
            },
        });
        openDateModal();
    };
    return (
        <button onClick={click} className="btn btn-primary fab">
            <i className="fas fa-plus"></i>
        </button>
    );
};
