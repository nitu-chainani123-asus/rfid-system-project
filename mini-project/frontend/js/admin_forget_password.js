// Admin Forgot Password JavaScript
// This file contains additional functionality for admin forgot password

document.addEventListener('DOMContentLoaded', function() {
    console.log('Admin Forgot Password page loaded');
    
    // Add any additional admin-specific functionality here
    const forgotForm = document.getElementById('forgotForm');
    const emailInput = document.getElementById('email');
    const messageDiv = document.getElementById('message');
    
    // Admin email validation
    emailInput.addEventListener('input', function() {
        const email = this.value;
        const adminEmailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        
        if (email && !adminEmailPattern.test(email)) {
            this.style.borderColor = '#ef4444';
        } else {
            this.style.borderColor = '#e2e8f0';
        }
    });
    
    // Form submission enhancement
    forgotForm.addEventListener('submit', function(e) {
        const email = emailInput.value.trim();
        
        // Additional admin email validation
        if (!email.endsWith('.com') && !email.endsWith('.org') && !email.endsWith('.net')) {
            messageDiv.style.display = 'block';
            messageDiv.style.color = 'red';
            messageDiv.textContent = 'Please enter a valid admin email address.';
            e.preventDefault();
            return;
        }
        
        console.log('Admin forgot password form submitted for:', email);
    });
});

// Admin-specific helper functions
function validateAdminEmail(email) {
    const adminDomains = ['admin.com', 'company.com', 'organization.org'];
    const domain = email.split('@')[1];
    return adminDomains.some(adminDomain => domain === adminDomain) || email.includes('admin');
}

function showAdminLoadingState() {
    const submitButton = document.querySelector('.submit-button');
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
}

function hideAdminLoadingState() {
    const submitButton = document.querySelector('.submit-button');
    submitButton.textContent = 'Send Reset Link';
    submitButton.disabled = false;
}
