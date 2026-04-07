// Admin Reset Password JavaScript

console.log('Admin Reset Password page loaded');

// Form validation and submission

document.addEventListener('DOMContentLoaded', function() {

    const resetForm = document.getElementById('resetForm');

    const newPasswordInput = document.getElementById('newPassword');

    const confirmPasswordInput = document.getElementById('confirmPassword');

    const messageDiv = document.getElementById('message');

    

    // Get email and token from URL parameters

    function getUrlParameters() {

        const urlParams = new URLSearchParams(window.location.search);

        return {

            email: urlParams.get('email'),

            token: urlParams.get('token')

        };

    }

    

    // Real-time password validation

    function validatePasswords() {

        const newPassword = newPasswordInput.value;

        const confirmPassword = confirmPasswordInput.value;

        

        if (newPassword && confirmPassword) {

            if (newPassword !== confirmPassword) {

                showMessage('Passwords do not match.', 'error');

                return false;

            } else if (newPassword.length < 6) {

                showMessage('Password must be at least 6 characters long.', 'error');

                return false;

            } else {

                showMessage('Passwords match!', 'success');

                return true;

            }

        }

        

        hideMessage();

        return false;

    }

    

    // Add event listeners for real-time validation

    newPasswordInput.addEventListener('input', validatePasswords);

    confirmPasswordInput.addEventListener('input', validatePasswords);

    

    if (resetForm) {

        resetForm.addEventListener('submit', function(e) {

            e.preventDefault();

            

            const newPassword = newPasswordInput.value;

            const confirmPassword = confirmPasswordInput.value;

            const { email, token } = getUrlParameters();

            

            // Final validation

            if (!newPassword || !confirmPassword) {

                showMessage('Please fill in all fields.', 'error');

                return;

            }

            

            if (newPassword !== confirmPassword) {

                showMessage('Passwords do not match.', 'error');

                return;

            }

            

            if (newPassword.length < 6) {

                showMessage('Password must be at least 6 characters long.', 'error');

                return;

            }

            

            // Show loading state

            showMessage('Resetting password...', 'info');

            

            // Simulate API call (replace with actual API call)

            setTimeout(function() {

                // For demo purposes, assume success

                showMessage('Password reset successful! Redirecting to login...', 'success');

                

                // Redirect to login page after 2 seconds

                setTimeout(function() {

                    window.location.href = 'adminlogin.html';

                }, 2000);

                

            }, 1500);

        });

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

    

    function hideMessage() {

        if (messageDiv) {

            messageDiv.style.display = 'none';

        }

    }

});
