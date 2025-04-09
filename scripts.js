    // Updated copy buttons functionality
    function setupCopyButton(buttonId, resultId, successMessage) {
        const btn = document.getElementById(buttonId);
        const result = document.getElementById(resultId);
        
        btn.addEventListener('click', function() {
            // Copy the text
            navigator.clipboard.writeText(result.textContent)
                .then(() => {
                    // Visual feedback
                    const originalText = btn.innerHTML;
                    
                    // Change button text temporarily
                    btn.innerHTML = '<i class="fas fa-check btn-icon"></i> Copied!';
                    btn.classList.add('btn-copied');
                    btn.classList.add('btn-copy-animate');
                    
                    // Revert after 2 seconds
                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.classList.remove('btn-copied');
                        btn.classList.remove('btn-copy-animate');
                    }, 2000);
                    
                    // Optional: Show a small toast notification
                    showToast(successMessage || 'Copied to clipboard!');
                })
                .catch(err => {
                    console.error('Failed to copy: ', err);
                    showToast('Failed to copy text', true);
                });
        });
    }
    
    // Small toast notification function
    function showToast(message, isError = false) {
        const toast = document.createElement('div');
        toast.textContent = message;
        toast.style.position = 'fixed';
        toast.style.bottom = '20px';
        toast.style.right = '20px';
        toast.style.padding = '12px 24px';
        toast.style.backgroundColor = isError ? 'var(--error)' : 'var(--success)';
        toast.style.color = 'white';
        toast.style.borderRadius = '4px';
        toast.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
        toast.style.zIndex = '1000';
        toast.style.animation = 'fadeIn 0.3s ease';
        
        document.body.appendChild(toast);
        
        // Remove after 3 seconds
        setTimeout(() => {
            toast.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }
    
    // Add this to your CSS if not already present
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeOut {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(20px); }
        }
    `;
    document.head.appendChild(style);
    
    // Initialize the copy buttons
    document.addEventListener('DOMContentLoaded', function() {
        setupCopyButton('copy-encoded', 'encoded-result', 'Encoded message copied!');
        setupCopyButton('copy-decoded', 'decoded-result', 'Decoded message copied!');
    });
    
// Updated mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
        const hamburger = document.getElementById('hamburger');
        const nav = document.getElementById('nav');
        const overlay = document.getElementById('overlay');
        
        // Toggle menu
        hamburger.addEventListener('click', function() {
            nav.classList.toggle('active');
            overlay.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            // Change icon
            if (nav.classList.contains('active')) {
                hamburger.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
        
        // Close menu when clicking overlay
        overlay.addEventListener('click', function() {
            nav.classList.remove('active');
            overlay.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        });
        
        // Close menu when clicking a link (for single page navigation)
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                overlay.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
        
        // Close menu when pressing Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                nav.classList.remove('active');
                overlay.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
    
    const symbolMap = {
        'a': '#', 'b': '^', 'c': '!', 'd': '$', 'e': '*', 
        'f': '"', 'g': '<', 'h': '>', 'i': '-', 'j': '/',
        'k': '~', 'l': '@', 'm': ')', 'n': '(', 'o': '+',
        'p': '[', 'q': ']', 'r': ';', 's': '⚡', 't': '?',
        'u': '↑', 'v': '√', 'w': '}', 'x': '{', 'y': ':', 'z': '%',
        '0': '🌍', '1': '☠️', '2': '🔥', '3': '✨', '4': '🎗️',
        '5': '🍟', '6': '♨️', '7': '🔅', '8': '💭', '9': '®️',
        ' ': ' '
    };
    
    // Default custom mapping (starts as empty)
    let customMap = {};
    
    // Generate custom mapping inputs
    const customMappingGrid = document.getElementById('custom-mapping-grid');
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 !?.,';
    
    characters.split('').forEach(char => {
        const item = document.createElement('div');
        item.className = 'mapping-item';
        item.innerHTML = `
            <label>${char === ' ' ? 'Space' : char}</label>
            <input type="text" maxlength="1" data-char="${char}" value="${customMap[char] || ''}">
        `;
        customMappingGrid.appendChild(item);
    });
    
    // Modal functionality
    const customModal = document.getElementById('custom-mapping-modal');
    const customCipherBtn = document.getElementById('custom-cipher-btn');
    const closeModal = document.getElementById('close-modal');
    const saveMappingBtn = document.getElementById('save-mapping');
    const resetMappingBtn = document.getElementById('reset-mapping');
    
    customCipherBtn.addEventListener('click', function() {
        customModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
    
    closeModal.addEventListener('click', function() {
        customModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    saveMappingBtn.addEventListener('click', function() {
        // Update custom map with user inputs
        document.querySelectorAll('#custom-mapping-grid input').forEach(input => {
            const char = input.getAttribute('data-char');
            customMap[char] = input.value || char; // Fallback to original if empty
        });
        
        // Select the custom cipher option
        document.querySelectorAll('.option-card').forEach(card => card.classList.remove('active'));
        customCipherBtn.classList.add('active');
        
        customModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    resetMappingBtn.addEventListener('click', function() {
        // Reset all inputs to empty
        document.querySelectorAll('#custom-mapping-grid input').forEach(input => {
            input.value = '';
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === customModal) {
            customModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Cipher selection
    const optionCards = document.querySelectorAll('.option-card');
    let currentCipher = 'symbol';
    
    optionCards.forEach(card => {
        card.addEventListener('click', function() {
            optionCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            currentCipher = this.getAttribute('data-cipher');
        });
    });
    
    // Encoding functions
    function toNumericCipher(text) {
        return text.split('').map(char => {
            if (/[a-zA-Z]/.test(char)) {
                return char.toLowerCase().charCodeAt(0) - 96;
            }
            return char;
        }).join(' ');
    }
    
    function fromNumericCipher(text) {
        return text.split(' ').map(num => {
            if (/^\d+$/.test(num)) {
                const code = parseInt(num) + 96;
                return code >= 97 && code <= 122 ? String.fromCharCode(code) : num;
            }
            return num;
        }).join('');
    }
    
    function toBinary(text) {
        return text.split('').map(char => {
            return char.charCodeAt(0).toString(2).padStart(8, '0');
        }).join(' ');
    }
    
    function fromBinary(text) {
        return text.split(' ').map(bin => {
            if (/^[01]{8}$/.test(bin)) {
                return String.fromCharCode(parseInt(bin, 2));
            }
            return bin;
        }).join('');
    }
    
    function toHex(text) {
        return text.split('').map(char => {
            return char.charCodeAt(0).toString(16).padStart(2, '0');
        }).join(' ');
    }
    
    function fromHex(text) {
        return text.split(' ').map(hex => {
            if (/^[0-9a-fA-F]{2}$/.test(hex)) {
                return String.fromCharCode(parseInt(hex, 16));
            }
            return hex;
        }).join('');
    }
    
    function toSymbol(text, map) {
        return text.split('').map(char => {
            return map[char] || char;
        }).join('');
    }
    
    function fromSymbol(text, map) {
        const reverseMap = {};
        for (const key in map) {
            reverseMap[map[key]] = key;
        }
        
        return text.split('').map(char => {
            return reverseMap[char] || char;
        }).join('');
    }
    
    // Encode button functionality
    document.getElementById('encode-btn').addEventListener('click', function() {
        const message = document.getElementById('original-message').value;
        let encoded = '';
        
        switch(currentCipher) {
            case 'symbol':
                encoded = toSymbol(message, symbolMap);
                break;
            case 'numeric':
                encoded = toNumericCipher(message);
                break;
            case 'binary':
                encoded = toBinary(message);
                break;
            case 'hex':
                encoded = toHex(message);
                break;
            case 'custom':
                encoded = toSymbol(message, customMap);
                break;
            default:
                encoded = message;
        }
        
        document.getElementById('encoded-result').textContent = encoded;
    });
    
    // Decode button functionality
    document.getElementById('decode-btn').addEventListener('click', function() {
        const message = document.getElementById('encoded-message').value;
        const cipherType = document.getElementById('cipher-type').value;
        let decoded = '';
        
        switch(cipherType) {
            case 'symbol':
                decoded = fromSymbol(message, symbolMap);
                break;
            case 'numeric':
                decoded = fromNumericCipher(message);
                break;
            case 'binary':
                decoded = fromBinary(message);
                break;
            case 'hex':
                decoded = fromHex(message);
                break;
            case 'custom':
                decoded = fromSymbol(message, customMap);
                break;
            default:
                decoded = message;
        }
        
        document.getElementById('decoded-result').textContent = decoded;
    });
    
    // Copy buttons functionality
    document.getElementById('copy-encoded').addEventListener('click', function() {
        const result = document.getElementById('encoded-result');
        navigator.clipboard.writeText(result.textContent);
    });
    
    document.getElementById('copy-decoded').addEventListener('click', function() {
        const result = document.getElementById('decoded-result');
        navigator.clipboard.writeText(result.textContent);
    });
    
    // Simple animation on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.feature-card, .cipher-box').forEach(el => {
        observer.observe(el);
    });
