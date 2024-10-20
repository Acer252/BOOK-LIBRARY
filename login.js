// Get modal elements
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');
const loginButton = document.getElementById('loginButton');
const closeModalButtons = document.querySelectorAll('.modal .close');

// Open login modal when the login button is clicked
loginButton.addEventListener('click', function() {
    loginModal.style.display = 'block';
});

// Close modal when the 'x' is clicked
closeModalButtons.forEach(button => {
    button.addEventListener('click', function() {
        loginModal.style.display = 'none';
        signupModal.style.display = 'none';
    });
});

// Switch to signup modal
const openSignup = document.getElementById('openSignup');
openSignup.addEventListener('click', function() {
    loginModal.style.display = 'none';
    signupModal.style.display = 'block';
});

// Handle Signup Form Submission
document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;

    if (username && password) {
        // Store user data in localStorage
        localStorage.setItem(username, password);
        alert('Account created successfully!');
        signupModal.style.display = 'none';
    } else {
        alert('Please fill in all fields');
    }
});

// Handle Login Form Submission
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    // Check if user exists in localStorage
    const storedPassword = localStorage.getItem(username);

    if (storedPassword && storedPassword === password) {
        alert('Login successful!');
        loginModal.style.display = 'none';
        loginButton.innerHTML = `👤 ${username}`; // Show username after login
    } else {
        alert('Invalid username or password');
    }
});

// Close modal when clicking outside the modal content
window.addEventListener('click', function(event) {
    if (event.target === loginModal) {
        loginModal.style.display = 'none';
    } else if (event.target === signupModal) {
        signupModal.style.display = 'none';
    }
});

const loggedInUser = "JohnDoe";
        // Store the user's name in localStorage
        localStorage.setItem('username', loggedInUser);

        // Redirect to the Books UI page (or any other page)
        window.location.href = 'index.html'; // Change 'books.html' to your actual page