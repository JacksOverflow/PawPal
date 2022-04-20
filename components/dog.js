import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Dog({ dog }) {
    const [deleting, setDeleting] = useState(false);
    const router = useRouter();

    // Delete dog
    const deleteDog = async (dogId) => {
        //change deleting state
        setDeleting(true);

        try {
            // Delete dog
            await fetch('/api/dogs', {
                method: 'DELETE',
                body: dogId,
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
                <h3>
                    {dog.name}
                    <br/>
                    <small>{dog.breed}</small>
                    <br/>
                    <small>{dog.age} years old</small>
                </h3>
                <button type="button" onClick={() => deleteDog(dog['_id'])}>
                    {deleting ? 'Deleting' : 'Delete'}
                </button>
            </ul>
        </>
    );
}