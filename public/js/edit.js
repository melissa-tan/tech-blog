const postId = document.getElementById('post-id').value;

const editFormHandler = async function(event) {
  event.preventDefault();

  const title = document.getElementById('post-title').value;
  const body = document.getElementById('post-content').value;

  await fetch(`/api/post/${postId}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      body
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  document.location.replace('/dashboard');
};

const deleteClickHandler = async function() {
  await fetch(`/api/post/${postId}`, {
    method: 'DELETE'
  });

  document.location.replace('/dashboard');
};

document
  .getElementById('edit-post-form')
  .addEventListener('submit', editFormHandler);
document
  .getElementById('delete-btn')
  .addEventListener('click', deleteClickHandler);
