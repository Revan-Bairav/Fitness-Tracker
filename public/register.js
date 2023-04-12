const form = document.getElementById('registration-form');

form.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent default form submission behavior

  // Get form values
  const email = document.getElementById('email-input').value;
  const password = document.getElementById('password-input').value;
  const confirmPassword = document.getElementById('confirm-password-input').value;

  // Validate form data
  if (!email || !password || !confirmPassword) {
    // Display error message if any fields are empty
    document.getElementById('error-message').textContent = 'Please fill in all fields.';
    return;
  }

  if (password !== confirmPassword) {
    // Display error message if passwords don't match
    document.getElementById('error-message').textContent = 'Passwords do not match.';
    return;
  }

  // Send form data to server using fetch or XMLHttpRequest
  fetch('/register', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      // Redirect to login page on successful registration
      window.location.href = '/login';
    } else {
      // Display error message if registration failed
      document.getElementById('error-message').textContent = 'Registration failed. Please try again.';
    }
  })
  .catch(error => {
    console.error(error);
    // Display error message if an error occurred during registration
    document.getElementById('error-message').textContent = 'An error occurred during registration.';
  });
});
