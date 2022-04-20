import { useState } from 'react';
import { useRouter } from 'next/router';
import moment from 'moment'

export default function Event({ event }) {
    const [deleting, setDeleting] = useState(false);
    const router = useRouter();

    // Delete event
    const deleteEvent = async (eventId) => {
        //change deleting state
        setDeleting(true);

        try {
            // Delete event
            await fetch('/api/events', {
                method: 'DELETE',
                body: eventId,
            });

            // reset the deleting state
            setDeleting(false);

            // reload the page
            return router.push(router.asPath);
        } catch (error) {
            // stop deleting state
            return setDeleting(false);
        }
    };
    return (
        <>
            <ul>
                <h3>{moment(event.eventDate).format("MMMM Do YYYY")}</h3>
                <p>{event.content}</p>
                <button type="button" onClick={() => deleteEvent(event['_id'])}>
                    {deleting ? 'Deleting' : 'Delete'}
                </button>
            </ul>
        </>
    );
}