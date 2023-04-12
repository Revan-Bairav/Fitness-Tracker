const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
	event.preventDefault();
	checkInputs();
});

function checkInputs() {
	// Get the values from the input fields
	const emailValue = email.value.trim();
	const passwordValue = password.value.trim();
	const confirmPasswordValue = confirmPassword.value.trim();

	if (emailValue === '') {
		setErrorFor(email, 'Email is required');
	} else if (!isEmail(emailValue)) {
		setErrorFor(email, 'Email is not valid');
	} else {
		setSuccessFor(email);
	}

	if (passwordValue === '') {
		setErrorFor(password, 'Password is required');
	} else if (passwordValue.length < 8) {
		setErrorFor(password, 'Password must be at least 8 characters');
	} else {
		setSuccessFor(password);
	}

	if (confirmPasswordValue === '') {
		setErrorFor(confirmPassword, 'Confirm Password is required');
	} else if (passwordValue !== confirmPasswordValue) {
		setErrorFor(confirmPassword, 'Passwords do not match');
	} else {
		setSuccessFor(confirmPassword);
	}
}

function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const errorMessage = formControl.querySelector('small');

	// Add error message and error class to input field
	errorMessage.innerText = message;
	formControl.className = 'form-control error';
}

function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
}

function isEmail(email) {
	// Regular expression to check if email is valid
	const re = /\S+@\S+\.\S+/;
	return re.test(email);
}
