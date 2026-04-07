// User Dashboard JavaScript - Fixed Version
let currentUser = null;
let userRequests = [];

function checkLoggedIn() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    return isLoggedIn === 'true';
}

function loadUserData() {
    const userData = localStorage.getItem('currentUser');
    if(!userData) {
        alert("Session Expired: Please log in again from Login Page.");
        window.location.href="userregister.html?showRegister=false";
        return false;
    }
    
    currentUser = JSON.parse(userData);
    return true;
}

function showAlert(msg, type = 'success') {
    let alertBox = document.getElementById('alertBox');
    if (!alertBox) {
        alertBox = document.createElement('div');
        alertBox.id = 'alertBox';
        alertBox.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            z-index: 1000;
            transition: all 0.3s ease;
            max-width: 300px;
        `;
        document.body.appendChild(alertBox);
    }
    
    alertBox.textContent = msg;
    alertBox.className = type;
    
    if (type === 'success') {
        alertBox.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    } else if (type === 'error') {
        alertBox.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
    } else {
        alertBox.style.background = 'linear-gradient(135deg, #3b82f6, #1e40af)';
    }
    
    alertBox.style.display = 'block';
    setTimeout(() => {
        alertBox.style.display = 'none';
    }, 3000);
}

// User Request Functions - Simplified Working Version
function submitRequest() {
    console.log('🚀 submitRequest function called');
    
    if (!currentUser) {
        console.log('❌ No current user found');
        showAlert('Please log in to submit a request', 'error');
        return;
    }

    const requestText = document.getElementById('requestText').value.trim();
    console.log('📝 Request text:', requestText);
    
    if (!requestText) {
        console.log('❌ Empty request text');
        showAlert('Please enter your request message', 'error');
        return;
    }

    // Show loading message
    showAlert('Sending request...', 'info');

    // Prepare request data
    const requestData = {
        userId: currentUser.id || currentUser.email || 'unknown',
        userName: currentUser.fullName || currentUser.name || 'Unknown User',
        userEmail: currentUser.email || 'unknown',
        message: requestText
    };

    console.log('📤 Sending request data:', requestData);

    // Send request to backend
    fetch('/api/user-requests', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    })
    .then(response => {
        console.log('📡 Response status:', response.status);
        return response.json();
    })
    .then(data => {
        console.log('📥 Response data:', data);
        if (data.success) {
            // Clear form
            document.getElementById('requestText').value = '';
            
            // Show success message
            showAlert('Request sent successfully!', 'success');
            
            // Refresh requests list
            loadRequests();
            
            console.log('✅ Request submitted successfully!');
        } else {
            console.log('❌ Request failed:', data.message);
            showAlert(data.message || 'Failed to submit request', 'error');
        }
    })
    .catch(error => {
        console.error('❌ Network error:', error);
        showAlert('Network error. Please try again.', 'error');
    });
}

function viewRequests() {
    console.log('👁 viewRequests function called');
    
    const requestForm = document.getElementById('requestForm');
    const requestList = document.getElementById('requestList');
    const requestsContent = document.getElementById('requestsContent');
    
    if (requestForm) requestForm.style.display = 'none';
    if (requestList) requestList.style.display = 'block';
    
    loadRequests();
    
    if (userRequests.length === 0) {
        if (requestsContent) {
            requestsContent.innerHTML = '<div style="padding: 20px; text-align: center; color: #666;">No requests found. Submit your first request!</div>';
        }
    } else {
        if (requestsContent) {
            requestsContent.innerHTML = userRequests.map(request => {
                const date = new Date(request.date || request.createdAt);
                const formattedDate = date.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });
                
                const statusClass = request.status === 'approved' ? 'approved' : 
                                  request.status === 'rejected' ? 'rejected' : 'pending';
                
                return `
                    <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 15px; margin-bottom: 10px; background: #f9fafb;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                            <span style="font-weight: 600; color: #333;">${formattedDate}</span>
                            <span style="padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 600; color: white;" class="${statusClass}">
                                ${request.status.toUpperCase()}
                            </span>
                        </div>
                        <div style="color: #555; line-height: 1.5;">${request.message}</div>
                        ${request.response ? `<div style="margin-top: 10px; padding: 10px; background: #f0f9ff; border-left: 4px solid #3b82f6; border-radius: 4px;">
                            <strong style="color: #3b82f6;">Admin Response:</strong> ${request.response}
                        </div>` : ''}
                    </div>
                `;
            }).join('');
        }
    }
}

function backToRequestForm() {
    console.log('🔙 backToRequestForm function called');
    
    const requestForm = document.getElementById('requestForm');
    const requestList = document.getElementById('requestList');
    
    if (requestForm) requestForm.style.display = 'block';
    if (requestList) requestList.style.display = 'none';
}

function loadRequests() {
    console.log('🔄 loadRequests function called');
    
    if (!currentUser) {
        console.log('❌ No current user');
        userRequests = [];
        return;
    }

    const userId = currentUser.id || currentUser.email || 'unknown';
    console.log('👤 Loading requests for userId:', userId);

    // Fetch requests from backend
    fetch(`/api/user-requests/user/${userId}`)
        .then(response => response.json())
        .then(data => {
            console.log('📥 Load requests response:', data);
            if (data.success) {
                userRequests = data.requests || [];
                console.log('✅ Requests loaded:', userRequests.length);
            } else {
                console.error('❌ Failed to load requests:', data.message);
                userRequests = [];
            }
        })
        .catch(error => {
            console.error('❌ Error loading requests:', error);
            userRequests = [];
        });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 User dashboard loaded');
    
    // Load user data
    if (loadUserData()) {
        console.log('✅ User data loaded');
        
        // Load requests
        loadRequests();
        
        // Add event listeners
        const submitBtn = document.querySelector('.submit-request-btn');
        const viewBtn = document.querySelector('.view-requests-btn');
        const backBtn = document.querySelector('.back-to-form-btn');
        
        if (submitBtn) {
            submitBtn.addEventListener('click', submitRequest);
            console.log('✅ Submit button listener added');
        }
        
        if (viewBtn) {
            viewBtn.addEventListener('click', viewRequests);
            console.log('✅ View button listener added');
        }
        
        if (backBtn) {
            backBtn.addEventListener('click', backToRequestForm);
            console.log('✅ Back button listener added');
        }
    }
});
