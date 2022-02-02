const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#username-login');
    const password = document.querySelector('#password-login');
  
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
     location.replace('/dashboard');
    } else {
      alert('Failed to login');
    }
  };
  
  document
    .querySelector('#login-form')
    .addEventListener('submit', loginFormHandler);