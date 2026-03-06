// Anti-DDoS Protection with Captcha
(function() {
    'use strict';

    const CAPTCHA_VALIDITY = 24 * 60 * 60 * 1000; // 24 hours

    // Check if captcha was already solved
    function isCaptchaValid() {
        const captchaSolved = localStorage.getItem('captchaSolved');
        const solvedTime = localStorage.getItem('captchaSolvedTime');
        
        if (!captchaSolved || !solvedTime) {
            return false;
        }
        
        const timePassed = Date.now() - parseInt(solvedTime);
        return timePassed < CAPTCHA_VALIDITY;
    }

    // Initialize immediately (script is at end of body)
    const overlay = document.getElementById('captcha-overlay');
    
    if (!overlay) {
        console.error('Captcha overlay not found');
        return;
    }
    
    // If captcha is valid, hide overlay immediately
    if (isCaptchaValid()) {
        overlay.style.display = 'none';
    } else {
        // Show captcha and generate question
        overlay.style.display = 'flex';
        generateCaptcha();
        
        // Setup enter key listener
        const input = document.getElementById('captcha-input');
        if (input) {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    checkCaptcha();
                }
            });
            input.focus();
        }
    }

    // Generate random math captcha
    function generateCaptcha() {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const question = document.getElementById('captcha-question');
        
        if (question) {
            question.textContent = `${num1} + ${num2} = ?`;
            question.dataset.answer = num1 + num2;
        }
    }
    window.generateCaptcha = generateCaptcha;

    // Check captcha answer
    function checkCaptcha() {
        const input = document.getElementById('captcha-input');
        const question = document.getElementById('captcha-question');
        const error = document.getElementById('captcha-error');
        const overlay = document.getElementById('captcha-overlay');
        
        if (!input || !question || !error || !overlay) return;
        
        const userAnswer = parseInt(input.value);
        const correctAnswer = parseInt(question.dataset.answer);
        
        if (userAnswer === correctAnswer) {
            // Correct answer - save to localStorage
            localStorage.setItem('captchaSolved', 'true');
            localStorage.setItem('captchaSolvedTime', Date.now().toString());
            
            // Hide overlay immediately
            overlay.style.display = 'none';
            error.textContent = '';
        } else {
            // Wrong answer
            error.textContent = 'Wrong answer! Try again.';
            error.style.color = '#ff4444';
            input.value = '';
            generateCaptcha();
            input.focus();
            
            // Shake animation
            const modal = overlay.querySelector('.captcha-modal');
            if (modal) {
                modal.style.animation = 'shake 0.5s';
                setTimeout(() => {
                    modal.style.animation = '';
                }, 500);
            }
        }
    }
    window.checkCaptcha = checkCaptcha;

    // Monitor suspicious activity
    let clickCount = 0;
    let lastClickTime = Date.now();

    document.addEventListener('click', function() {
        const now = Date.now();
        
        if (now - lastClickTime < 100) {
            clickCount++;
            
            if (clickCount > 10) {
                console.warn('Suspicious activity detected');
                localStorage.removeItem('captchaSolved');
                localStorage.removeItem('captchaSolvedTime');
                location.reload();
            }
        } else {
            clickCount = 0;
        }
        
        lastClickTime = now;
    });

})();
