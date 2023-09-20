import { useCalendarStore } from "../../hooks";

export const FabDelete = () => {
    const { handleOnDeleteEvent , hasOnEventSelected } = useCalendarStore();

    if (hasOnEventSelected) {
        return (
            <button onClick={handleOnDeleteEvent} className="btn btn-danger fab-danger">
                <i className="fas fa-trash-alt" style={{ fontSize: 18}}></i>
            </button>
        );
    }

    return null
};
