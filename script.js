// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Formspree AJAX Form Submission (Stay on Page)
const contactForm = document.getElementById('contactForm');
const formResult = document.getElementById('form-result');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        const formData = new FormData(this);
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        formResult.classList.remove('show', 'success', 'error');
        formResult.style.display = 'none';
        
        try {
            const response = await fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Success!
                formResult.innerHTML = 'Thank you! Your message has been sent successfully. I\'ll get back to you soon!';
                formResult.classList.add('show', 'success');
                this.reset();
                
                // Auto-hide success message after 8 seconds
                setTimeout(() => {
                    formResult.classList.remove('show');
                    setTimeout(() => {
                        formResult.style.display = 'none';
                    }, 300);
                }, 8000);
            } else {
                // Error from Formspree
                const data = await response.json();
                let errorMessage = ' Oops! There was a problem submitting your form.';
                
                if (data.errors) {
                    errorMessage += ' ' + data.errors.map(error => error.message).join(", ");
                }
                
                formResult.innerHTML = errorMessage + ' Please try again or email me directly at dheergupta@knox.edu';
                formResult.classList.add('show', 'error');
            }
        } catch (error) {
            // Network or other error
            console.error('Error:', error);
            formResult.innerHTML = ' Oops! There was a network problem. Please check your connection and try again, or email me directly at dheergupta@knox.edu';
            formResult.classList.add('show', 'error');
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    });
}