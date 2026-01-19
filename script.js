// Check if user has chosen not to show welcome popup
window.addEventListener('DOMContentLoaded', function() {
    const dontShowWelcome = localStorage.getItem('dontShowWelcome');
    if (!dontShowWelcome) {
        document.getElementById('welcomePopup').style.display = 'flex';
    } else {
        document.getElementById('welcomePopup').style.display = 'none';
    }
});

// Close welcome popup
function closeWelcomePopup() {
    const dontShow = document.getElementById('dontShowAgain').checked;
    if (dontShow) {
        localStorage.setItem('dontShowWelcome', 'true');
    }
    document.getElementById('welcomePopup').style.display = 'none';
}

// Show warning and redirect to product page
function showWarningAndRedirect(product) {
    const dontShowWarning = localStorage.getItem('dontShowWarning');
    if (!dontShowWarning) {
        document.getElementById('warningPopup').style.display = 'flex';
        // Store the product to redirect after closing warning
        sessionStorage.setItem('redirectProduct', product);
    } else {
        // Directly redirect if user chose not to show warning
        window.location.href = product + '.html';
    }
}

// Close warning popup and redirect
function closeWarningPopup() {
    const dontShow = document.getElementById('dontShowWarning').checked;
    if (dontShow) {
        localStorage.setItem('dontShowWarning', 'true');
    }
    document.getElementById('warningPopup').style.display = 'none';
    
    // Redirect to product page
    const product = sessionStorage.getItem('redirectProduct');
    if (product) {
        window.location.href = product + '.html';
        sessionStorage.removeItem('redirectProduct');
    }
}

// Close popup when clicking outside
document.addEventListener('click', function(event) {
    const welcomePopup = document.getElementById('welcomePopup');
    const warningPopup = document.getElementById('warningPopup');
    
    if (event.target === welcomePopup) {
        closeWelcomePopup();
    }
    
    if (event.target === warningPopup) {
        // Don't close warning popup when clicking outside
        // User must explicitly close it
    }
});

// Smooth scroll for navigation
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

// Add scroll animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all product cards
document.querySelectorAll('.product-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});
