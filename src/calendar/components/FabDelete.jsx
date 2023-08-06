import { useCalendarStore } from "../../hooks";

export const FabDelete = () => {
    const { startDeletingEvent, hasOnEventSelected } = useCalendarStore();

    const click = () => {
        startDeletingEvent()
    };

    if (hasOnEventSelected) {
        return (
            <button onClick={click} className="btn btn-danger fab-danger">
                <i className="fas fa-trash-alt" style={{ fontSize: 18}}></i>
            </button>
        );
    }

    return null
};
