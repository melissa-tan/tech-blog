const newFormHandler = async function (event) {
    event.preventDefault();

    const title = document.getElementById('post-title').value;
    const body = document.getElementById('post-content').value;

    await fetch(`/api/post`, {
        method: 'POST',
        body: JSON.stringify({title, body}),
        headers: { 'Content-Type': 'application/json' },
    })

    document.location.replace('/dashboard');
}

document.getElementById('create-post-form').addEventListener('submit', newFormHandler);