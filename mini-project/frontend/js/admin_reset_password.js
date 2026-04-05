// Admin Reset Password JavaScript
// This file contains additional functionality for admin reset password

document.addEventListener('DOMContentLoaded', function() {
    console.log('Admin Reset Password page loaded');
    
    // Add any additional admin-specific functionality here
    const resetForm = document.getElementById('resetForm');
    const newPasswordInput = document.getElementById('newPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const messageDiv = document.getElementById('message');
    
    // Admin password strength validation
    newPasswordInput.addEventListener('input', function() {
        const password = this.value;
        const strength = validateAdminPasswordStrength(password);
        
        if (password) {
            updatePasswordStrengthIndicator(strength);
        }
    });
    
    // Confirm password validation
    confirmPasswordInput.addEventListener('input', function() {
        const newPassword = newPasswordInput.value;
        const confirmPassword = this.value;
        
        if (confirmPassword && newPassword !== confirmPassword) {
            this.style.borderColor = '#ef4444';
            showPasswordMismatchError();
        } else if (confirmPassword && newPassword === confirmPassword) {
            this.style.borderColor = '#10b981';
            hidePasswordMismatchError();
        }
    });
    
    // Form submission enhancement
    resetForm.addEventListener('submit', function(e) {
        const newPassword = newPasswordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        
        // Additional admin password validation
        if (!validateAdminPasswordRequirements(newPassword)) {
            messageDiv.style.display = 'block';
            messageDiv.style.color = 'red';
            messageDiv.textContent = 'Admin password must be at least 8 characters with uppercase, lowercase, number, and special character.';
            e.preventDefault();
            return;
        }
        
        console.log('Admin reset password form submitted');
    });
});

// Admin-specific password validation functions
function validateAdminPasswordStrength(password) {
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    
    return strength;
}

function validateAdminPasswordRequirements(password) {
    return password.length >= 8 &&
           /[a-z]/.test(password) &&
           /[A-Z]/.test(password) &&
           /[0-9]/.test(password) &&
           /[^a-zA-Z0-9]/.test(password);
}

function updatePasswordStrengthIndicator(strength) {
    const strengthIndicator = document.getElementById('password-strength') || createPasswordStrengthIndicator();
    
    const strengthLevels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
    const strengthColors = ['#ef4444', '#f97316', '#eab308', '#84cc16', '#22c55e', '#10b981'];
    
    strengthIndicator.textContent = `Password Strength: ${strengthLevels[strength - 1] || 'Very Weak'}`;
    strengthIndicator.style.color = strengthColors[strength - 1] || '#ef4444';
}

function createPasswordStrengthIndicator() {
    const indicator = document.createElement('div');
    indicator.id = 'password-strength';
    indicator.style.fontSize = '12px';
    indicator.style.marginTop = '5px';
    indicator.style.textAlign = 'center';
    
    const newPasswordInput = document.getElementById('newPassword');
    newPasswordInput.parentNode.appendChild(indicator);
    
    return indicator;
}

function showPasswordMismatchError() {
    const errorDiv = document.getElementById('password-mismatch-error') || createPasswordMismatchError();
    errorDiv.style.display = 'block';
}

function hidePasswordMismatchError() {
    const errorDiv = document.getElementById('password-mismatch-error');
    if (errorDiv) {
        errorDiv.style.display = 'none';
    }
}

function createPasswordMismatchError() {
    const errorDiv = document.createElement('div');
    errorDiv.id = 'password-mismatch-error';
    errorDiv.style.color = '#ef4444';
    errorDiv.style.fontSize = '12px';
    errorDiv.style.marginTop = '5px';
    errorDiv.textContent = 'Passwords do not match';
    
    const confirmPasswordInput = document.getElementById('confirmPassword');
    confirmPasswordInput.parentNode.appendChild(errorDiv);
    
    return errorDiv;
}

function showAdminLoadingState() {
    const submitButton = document.querySelector('.submit-button');
    submitButton.textContent = 'Resetting...';
    submitButton.disabled = true;
}

function hideAdminLoadingState() {
    const submitButton = document.querySelector('.submit-button');
    submitButton.textContent = 'Reset Password';
    submitButton.disabled = false;
}

// Admin-specific helper function
function isAdminResetLinkValid() {
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');
    const token = urlParams.get('token');
    
    // Additional validation for admin reset links
    return email && token && (email.includes('admin') || email.includes('administrator'));
}
