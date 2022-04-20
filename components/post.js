import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Post({ post }) {
    const [deleting, setDeleting] = useState(false);
    const router = useRouter();

    // Delete post
    const deletePost = async (postId) => {
        //change deleting state
        setDeleting(true);

        try {
            // Delete post
            await fetch('/api/posts', {
                method: 'DELETE',
                body: postId,
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
                
                <p>{post.content}
                <br />
                    <small>{new Date(post.createdAt).toLocaleDateString()}</small>
                <br />
                <button type="button" onClick={() => deletePost(post['_id'])}>
                    {deleting ? 'Deleting' : 'Delete'}
                </button>
                </p>
            </ul>
        </>
    );
}