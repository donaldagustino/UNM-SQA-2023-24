// notesHandler.js -Used to control note saving and note sharing

//User clicks on the 'Save Notes Button'
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
        console.log('Notes was successfully saving!');
    });
});

//User clicks on the 'Share Button'
document.getElementById('shareButton').addEventListener('click', function () {
    const videoId = new URLSearchParams(window.location.search).get('vId');
    if (videoId) {
      const shareUrl = `${window.location.origin}${window.location.pathname}?vId=${videoId}`;
      navigator.clipboard.writeText(shareUrl).then(function () {         
        // Copies the shareable URL to the clipboard
        // Show toast message instead of an alert
        showToast('Notes copied!');
        console.log('Notes was successfully copied to clipboard!');
      }, 
      function (err) {                                                
        //alert('Link copied to clipboard!');
        console.error('Could not copy text: ', err);
      });
    } else {
      alert('No video is being played to share.');
    }
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