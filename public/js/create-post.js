

const newFormHandler = async function(event) {
    event.preventDefault();
    const title = document.querySelector('#title').value.trim();
    const post_content = document.querySelector('#post_content').value.trim();

  if (title && post_content){
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        post_content,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok){
      document.location.replace('/dashboard');
    }
  }
  };
  
  document
    .querySelector('#newPost')
    .addEventListener('submit', newFormHandler);