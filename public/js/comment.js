async function commentFormHandler(event) {
    event.preventDefault();
    console.log(event.target.getAttribute('data-id'));

    const comment_text = document.querySelector('input[name="comment-body"]').value.trim();
    const post_id = event.target.getAttribute('data-id');


    if (comment_text) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                comment_text
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.reload();

        } else {
            alert(response.statusText);
            document.querySelector('#comment-form').style.display = "block";
        }
    }
}

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);