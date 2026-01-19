// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
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

// Product Selection
let selectedProduct = null;

function selectProduct(button) {
    // Remove previous selection
    document.querySelectorAll('.product-card').forEach(card => {
        card.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        card.querySelector('.btn-order').textContent = 'Pilih';
    });

    // Highlight selected product
    const productCard = button.parentElement;
    productCard.style.borderColor = 'var(--primary-color)';
    button.textContent = 'Terpilih ✓';

    // Get product data
    const productType = productCard.dataset.product;
    const amount = productCard.dataset.amount;
    const price = parseInt(productCard.dataset.price);

    // Format product name
    let productName = '';
    let productCategory = '';
    
    switch(productType) {
        case 'robux-premium':
            productCategory = 'Robux Premium';
            productName = `${amount} Robux Premium`;
            break;
        case 'robux-regular':
            productCategory = 'Robux Regular';
            productName = `${amount} Robux Regular`;
            break;
        case 'robux-gamepass':
            productCategory = 'Robux Gamepass';
            productName = `${amount} Robux via Gamepass (No Cut 100%)`;
            break;
        case 'redfinger-vip':
            productCategory = 'Redfinger VIP';
            productName = `Redfinger VIP ${amount} Hari`;
            break;
        case 'redfinger-kvip':
            productCategory = 'Redfinger KVIP';
            productName = `Redfinger KVIP ${amount} Hari`;
            break;
        case 'redfinger-svip':
            productCategory = 'Redfinger SVIP';
            productName = `Redfinger SVIP ${amount} Hari`;
            break;
        case 'redfinger-xvip':
            productCategory = 'Redfinger XVIP';
            productName = `Redfinger XVIP ${amount} Hari`;
            break;
    }

    // Store selected product
    selectedProduct = {
        type: productType,
        category: productCategory,
        name: productName,
        amount: amount,
        price: price
    };

    // Update form
    updateOrderForm();

    // Scroll to order form
    document.getElementById('order').scrollIntoView({ behavior: 'smooth' });
}

function updateOrderForm() {
    if (!selectedProduct) return;

    document.getElementById('productType').value = selectedProduct.category;
    document.getElementById('productDetails').value = selectedProduct.name;
    document.getElementById('totalPrice').value = formatCurrency(selectedProduct.price);
}

function formatCurrency(amount) {
    return 'Rp ' + amount.toLocaleString('id-ID');
}

// Form Submission
document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();

    if (!selectedProduct) {
        alert('Silakan pilih produk terlebih dahulu!');
        return;
    }

    // Get form data
    const username = document.getElementById('username').value;
    const whatsapp = document.getElementById('whatsapp').value;
    const email = document.getElementById('email').value;
    const notes = document.getElementById('notes').value;

    // Validate WhatsApp number
    const cleanWhatsapp = whatsapp.replace(/\D/g, '');
    if (cleanWhatsapp.length < 10) {
        alert('Nomor WhatsApp tidak valid!');
        return;
    }

    // Format WhatsApp number (remove leading 0, add 62)
    let waNumber = cleanWhatsapp;
    if (waNumber.startsWith('0')) {
        waNumber = '62' + waNumber.substring(1);
    } else if (!waNumber.startsWith('62')) {
        waNumber = '62' + waNumber;
    }

    // Create WhatsApp message
    let message = `*PEMESANAN SURYA STORE*\n\n`;
    message += `📦 *Produk:* ${selectedProduct.name}\n`;
    message += `💰 *Harga:* ${formatCurrency(selectedProduct.price)}\n`;
    message += `👤 *Username/ID:* ${username}\n`;
    message += `📱 *WhatsApp:* ${whatsapp}\n`;
    if (email) {
        message += `📧 *Email:* ${email}\n`;
    }
    if (notes) {
        message += `📝 *Catatan:* ${notes}\n`;
    }
    message += `\n_Mohon konfirmasi pesanan ini_`;

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);

    // Redirect to WhatsApp
    const whatsappURL = `https://wa.me/${waNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all product cards and feature cards
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.product-card, .feature-card, .contact-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

// Header background on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(10, 14, 39, 0.98)';
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.background = 'rgba(10, 14, 39, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Auto-format WhatsApp number
document.getElementById('whatsapp').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.startsWith('62')) {
        value = '0' + value.substring(2);
    }
    
    // Format: 0812-3456-7890
    if (value.length > 0) {
        if (value.length <= 4) {
            e.target.value = value;
        } else if (value.length <= 8) {
            e.target.value = value.substring(0, 4) + '-' + value.substring(4);
        } else {
            e.target.value = value.substring(0, 4) + '-' + value.substring(4, 8) + '-' + value.substring(8, 12);
        }
    }
});

// Prevent form submit on Enter key (except in textarea)
document.getElementById('orderForm').addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
    }
});

// Add loading state to buttons
document.querySelectorAll('.btn-order').forEach(button => {
    button.addEventListener('click', function() {
        this.classList.add('loading');
        setTimeout(() => {
            this.classList.remove('loading');
        }, 300);
    });
});

// Price formatter for display
function updatePriceDisplay() {
    document.querySelectorAll('.product-price').forEach(priceElement => {
        const price = priceElement.textContent.replace(/\D/g, '');
        if (price) {
            priceElement.textContent = formatCurrency(parseInt(price));
        }
    });
}

// Initialize tooltips (if needed in future)
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.dataset.tooltip;
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
        });
        
        element.addEventListener('mouseleave', function() {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) tooltip.remove();
        });
    });
}

// Copy text functionality (for future use)
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Berhasil disalin!');
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'var(--success-color)' : 'var(--secondary-color)'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Surya Store - Website loaded successfully!');
    
    // Check if user came from a specific product link
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('product');
    
    if (productId) {
        const productCard = document.querySelector(`[data-product="${productId}"]`);
        if (productCard) {
            setTimeout(() => {
                productCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                productCard.querySelector('.btn-order').click();
            }, 1000);
        }
    }
});

// Service Worker registration (for PWA - optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // You can add service worker here if needed for offline functionality
        console.log('Ready for PWA implementation');
    });
}

// Performance monitoring
window.addEventListener('load', () => {
    if (window.performance) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page load time: ${pageLoadTime}ms`);
    }
});
