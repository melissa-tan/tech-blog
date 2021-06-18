const newFormHandler = async function(event) {
    event.preventDefault();
  
    const postId = document.getElementById('post-id').value;
    const body = document.getElementById('comment-content').value;
  
    if (body) {
      await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({postId, body}),
        headers: {'Content-Type': 'application/json'}
      });
      document.location.reload();
    } else {
        alert('Please put a comment');
    }
  };
  
  document.getElementById('new-comment').addEventListener('submit', newFormHandler);