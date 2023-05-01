const form = document.querySelector('form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

    if (response.ok) {
      // handle successful login
      console.log('Login successful');
    } else {
      // handle login error
      console.error('Login failed');
    }
  } catch (error) {
    console.error('Error:', error);
  }
});
