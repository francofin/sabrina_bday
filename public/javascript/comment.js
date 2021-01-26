// async function to send form input to post comment endpoint / route on submit event
const commentFormHandler = async function (event) {
    event.preventDefault();

    // get form values for POST to endpoint
    const postId = document.querySelector('#post-id').value;
    const body = document.querySelector('#comment-text').value;

    // validate that the post content is not empty then send to endpoint
    if (body) {
        await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({
                postId,
                body
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        document.location.reload();
    };
};


document.querySelector('#new-comment-form').addEventListener('submit', commentFormHandler);