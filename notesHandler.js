// notesHandler.js

document.addEventListener('DOMContentLoaded', (event) => {
    const videoId = new URLSearchParams(window.location.search).get("vId");

    // Load existing notes from localStorage
    const existingNotes = localStorage.getItem('videoNotes-' + videoId);
    if (existingNotes) {
        document.getElementById('videoNotes').value = existingNotes;
    }

    // Listen for click events on the Save button
    document.getElementById('saveNoteButton').addEventListener('click', function() {
        const notes = document.getElementById('videoNotes').value;
        localStorage.setItem('videoNotes-' + videoId, notes);
        
        // Show toast message instead of an alert
        showToast('Notes saved!');
    });
});

// Function to show toast message
function showToast(message) {
    // Create the toast message element
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.className = 'toast-message'; // Make sure this class is styled in CSS

    // Append the toast message to body or a specific container
    document.body.appendChild(toast);

    // Show the toast for 3 seconds before fading out
    setTimeout(() => {
        toast.classList.add('fade-out'); // Make sure this class has fade out animation in CSS
        // After fade out animation, remove the toast message
        toast.addEventListener('animationend', () => toast.remove());
    }, 3000);

    // Optionally, remove the toast on click as well
    toast.addEventListener('click', () => {
        toast.classList.add('fade-out');
        toast.addEventListener('animationend', () => toast.remove());
    });
}