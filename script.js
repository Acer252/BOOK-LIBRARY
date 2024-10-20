document.addEventListener('DOMContentLoaded', function () {
    // Retrieve logged-in user's email from localStorage
    const loggedInUserEmail = localStorage.getItem('username'); // Make sure 'username' matches the key you set during login

    // Profile dropdown toggle and update email
    const profileIcon = document.querySelector('.fa-circle-user');
    const dropdown = document.querySelector('.profile-dropdown');
    const profileContainer = document.querySelector('.profile-dropdown-container');
    
    if (loggedInUserEmail) {
        const profileLink = dropdown.querySelector('a'); // Select the first 'a' tag for profile
        // Update the dropdown to show the user's email instead of 'Profile'
        profileLink.textContent = `User Email: ${loggedInUserEmail}`; // Set the email here
        console.log(`User email set in dropdown: ${loggedInUserEmail}`); // Debug log
    } else {
        console.log('No user email found in localStorage'); // Debug log
    }

    // Profile dropdown toggle
    profileIcon.addEventListener('click', function (event) {
        event.stopPropagation();  // Prevent triggering document click
        console.log('Profile icon clicked'); // Debug log
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    });

    // Close dropdown if clicked outside
    document.addEventListener('click', function (event) {
        if (!profileContainer.contains(event.target)) {
            console.log('Closing dropdown'); // Debug log
            dropdown.style.display = 'none';
        }
    });

    // Search functionality for books
    const searchInput = document.getElementById('search');
    searchInput.addEventListener('input', function () {
        const query = searchInput.value.toLowerCase();
        const books = document.querySelectorAll('.book-card');

        books.forEach(book => {
            const title = book.getAttribute('data-title').toLowerCase();
            const author = book.getAttribute('data-author').toLowerCase();
            book.style.display = (title.includes(query) || author.includes(query)) ? 'block' : 'none';
        });
    });

    // Modal functionality for Borrow History
    const modal = document.getElementById('borrowHistoryModal');
    const modalTitle = document.getElementById('modalBookTitle');
    const modalBorrowedTimes = document.getElementById('modalBorrowedTimes');
    const modalLastBorrowed = document.getElementById('modalLastBorrowed');
    const modalBookImage = document.getElementById('modalBookImage');
    const closeModal = document.querySelector('.modal .close');
    const borrowHistoryList = document.getElementById('borrowHistoryList');
    const borrowHistoryHeading = document.getElementById('borrowHistoryHeading');

    // Storage for borrow history
    const borrowHistoryStorage = {};

    // "Borrow Now" button functionality
    const borrowButtons = document.querySelectorAll('.borrow-btn');
    borrowButtons.forEach(button => {
        button.addEventListener('click', function () {
            const bookCard = button.closest('.book-card');
            const bookTitle = bookCard.getAttribute('data-title');

            if (!borrowHistoryStorage[bookTitle]) {
                borrowHistoryStorage[bookTitle] = [];
            }

            const currentDate = new Date().toISOString().split('T')[0];
            borrowHistoryStorage[bookTitle].push(currentDate);

            // Update borrow history in the card
            const borrowHistoryElem = bookCard.querySelector('.borrow-history');
            const borrowedTimesElem = borrowHistoryElem.querySelector('.borrowed-times');
            const lastBorrowedElem = borrowHistoryElem.querySelector('.last-borrowed');

            const currentTimes = borrowHistoryStorage[bookTitle].length;
            borrowedTimesElem.innerHTML = `<strong>Borrowed:</strong> ${currentTimes} times`;
            lastBorrowedElem.innerHTML = `<strong>Last Borrowed:</strong> ${currentDate}`;
        });
    });

    // "Borrow History" button functionality
    const historyButtons = document.querySelectorAll('.history-btn');
    historyButtons.forEach(button => {
        button.addEventListener('click', function () {
            const bookCard = button.closest('.book-card');
            const bookTitle = bookCard.getAttribute('data-title');
            const bookAuthor = bookCard.getAttribute('data-author');
            const bookImageSrc = bookCard.querySelector('.book-cover').src;

            // Update modal with book details
            modalTitle.textContent = `Book Title: ${bookTitle}`;
            modalBookImage.src = bookImageSrc;
            document.getElementById('modalAuthor').innerHTML = `<strong>Author:</strong> ${bookAuthor}`;

            // Get borrow history from storage
            const borrowHistory = borrowHistoryStorage[bookTitle] || [];
            const borrowedTimes = borrowHistory.length;
            const lastBorrowedDate = borrowHistory[borrowedTimes - 1] || 'N/A';

            modalBorrowedTimes.innerHTML = `<strong>Borrowed:</strong> ${borrowedTimes} times`;
            modalLastBorrowed.innerHTML = `<strong>Last Borrowed:</strong> ${lastBorrowedDate}`;

            // Display borrowing history
            borrowHistoryHeading.innerHTML = '<strong>Borrowing History:</strong>';
            borrowHistoryList.innerHTML = borrowHistory.length > 0
                ? borrowHistory.join('<br>')
                : 'No borrow history.';

            modal.style.display = 'block';
        });
    });

    // Close the modal on button click
    closeModal.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    // Close the modal when clicking outside of the modal content
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
