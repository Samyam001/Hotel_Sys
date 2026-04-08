document.addEventListener('DOMContentLoaded', () => {
    // Contact specific logic here
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Just a placeholder alert for demo purposes
            alert('Your message has been received!');
        });
    }
});