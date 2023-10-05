import { useCalendarStore } from "../../hooks";

export const FabDelete = () => {
    const { handleOnDeleteEvent, hasOnEventSelected } = useCalendarStore();

    return (
        <button onClick={handleOnDeleteEvent} className="btn btn-danger fab-danger" style={ hasOnEventSelected ? {display: ""} : {display: "none"} } aria-label="btn-fab">
            <i className="fas fa-trash-alt" style={{ fontSize: 18 }}></i>
        </button>
    );
};
