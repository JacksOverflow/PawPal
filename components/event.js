import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Event({ event }) {
    const [publishing, setPublishing] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const router = useRouter();

    // Publish event
    const publishEvent = async (eventId) => {
        // change publishing state
        setPublishing(true);

        try {
            // Update event
            await fetch('/api/events', {
                method: 'PUT',
                body: eventId,
            });

            // reset the publishing state
            setPublishing(false);

            // reload the page
            return router.push(router.asPath);
        } catch (error) {
            // Stop publishing state
            return setPublishing(false);
        }
    };
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
                <h3>{event.eventDate}</h3>
                <p>{event.content}</p>
                {!event.published ? (
                    <button type="button" onClick={() => publishEvent(event._id)}>
                        {publishing ? 'Publishing' : 'Publish'}
                    </button>
                ) : null}
                <button type="button" onClick={() => deleteEvent(event['_id'])}>
                    {deleting ? 'Deleting' : 'Delete'}
                </button>
            </ul>
        </>
    );
}