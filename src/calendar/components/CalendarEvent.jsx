import PropTypes from "prop-types";

export const CalendarEvent = ({ event }) => {
    const { title, user } = event;

    return (
        <>
            <strong>{ title }</strong>
            <span> - { user.name }</span>
        </>
    );
};

CalendarEvent.propTypes = {
    event: PropTypes.object.isRequired,
};
