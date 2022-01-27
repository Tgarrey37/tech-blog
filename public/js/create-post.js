const newFormHandler = async function(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="post-title"]').value.trim();
    const post_content = document.querySelector('textarea[name="post-body"]').value.trim();

  
    await fetch(`/api/post`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        post_content,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    // document.location.replace('/dashboard');
  };
  
  document
    .querySelector('#new-post')
    .addEventListener('submit', newFormHandler);