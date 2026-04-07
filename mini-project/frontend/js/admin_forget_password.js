// Admin Forgot Password JavaScript

console.log('Admin Forgot Password page loaded');

// Form validation and submission

document.addEventListener('DOMContentLoaded', function() {

    const forgotForm = document.getElementById('forgotForm');

    const emailInput = document.getElementById('email');

    const messageDiv = document.getElementById('message');

    

    if (forgotForm) {

        forgotForm.addEventListener('submit', function(e) {

            e.preventDefault();

            

            const email = emailInput.value.trim();

            

            // Basic email validation

            if (!email) {

                showMessage('Please enter your email address.', 'error');

                return;

            }

            

            if (!isValidEmail(email)) {

                showMessage('Please enter a valid email address.', 'error');

                return;

            }

            

            // Show loading state

            showMessage('Sending reset link...', 'info');

            

            // Simulate API call (replace with actual API call)

            setTimeout(function() {

                // For demo purposes, assume success

                showMessage('Password reset link sent! Check your email.', 'success');

                

                // Clear form

                emailInput.value = '';

                

                // Redirect to reset password page after 2 seconds

                setTimeout(function() {

                    window.location.href = 'admin_reset_password.html?email=' + encodeURIComponent(email) + '&token=demo123';

                }, 2000);

                

            }, 1500);

        });

    }

    

    function isValidEmail(email) {

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return emailRegex.test(email);

    }

    

    function showMessage(message, type) {

        if (messageDiv) {

            messageDiv.textContent = message;

            messageDiv.style.display = 'block';

            

            // Set color based on message type

            switch(type) {

                case 'error':

                    messageDiv.style.color = '#e74c3c';

                    break;

                case 'success':

                    messageDiv.style.color = '#27ae60';

                    break;

                case 'info':

                    messageDiv.style.color = '#3498db';

                    break;

                default:

                    messageDiv.style.color = '#333';

            }

        }

    }

});
