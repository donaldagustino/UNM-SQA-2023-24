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
        alert('Notes saved!');
    });
});