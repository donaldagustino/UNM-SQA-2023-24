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

// User clicks on the 'Share Button'
document.getElementById('shareButton').addEventListener('click', function () {
  const videoId = new URLSearchParams(window.location.search).get('vId');
  if (videoId) {
      // Construct the shareable URL
      const shareUrl = `${window.location.origin}${window.location.pathname}?vId=${videoId}`;

      // Store in a hidden input or in the DOM for Selenium to access
      const shareInput = document.createElement('input');
      shareInput.type = 'hidden';
      shareInput.id = 'shareUrl';
      shareInput.value = shareUrl;
      document.body.appendChild(shareInput);

      //Allows User to copy URL
      navigator.clipboard.writeText(shareUrl).then(function () {         
      }, 
      function (err) {                                                
        //alert('Link copied to clipboard!');
        console.error('Could not copy text: ', err);
      });

      // Still show the toast message for user feedback
      showToast('URL ready to be copied!');
      
      console.log('URL is ready to be copied:', shareUrl);
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