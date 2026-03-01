// Anti-DDoS Protection Script
(function() {
    'use strict';
    
    // Проверка на бота
    function checkBot() {
        // Проверяем User Agent
        const botPatterns = [
            /bot/i, /crawler/i, /spider/i, /scraper/i,
            /curl/i, /wget/i, /python/i, /java/i
        ];
        
        const userAgent = navigator.userAgent;
        for (let pattern of botPatterns) {
            if (pattern.test(userAgent)) {
                return true;
            }
        }
        return false;
    }
    
    // Проверка на слишком быстрые запросы
    function checkRateLimit() {
        const now = Date.now();
        const lastVisit = localStorage.getItem('lastVisit');
        
        if (lastVisit) {
            const timeDiff = now - parseInt(lastVisit);
            if (timeDiff < 1000) { // Меньше 1 секунды между запросами
                return true;
            }
        }
        
        localStorage.setItem('lastVisit', now.toString());
        return false;
    }
    
    // Простая математическая проверка
    function showChallenge() {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const answer = num1 + num2;
        
        const userAnswer = prompt(`Anti-DDoS Protection\nSolve: ${num1} + ${num2} = ?`);
        
        if (parseInt(userAnswer) !== answer) {
            document.body.innerHTML = '<h1 style="text-align:center;margin-top:50px;">Access Denied</h1>';
            return false;
        }
        return true;
    }
    
    // Проверка WebGL (боты обычно не поддерживают)
    function checkWebGL() {
        try {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            return !!gl;
        } catch(e) {
            return false;
        }
    }
    
    // Основная проверка
    function antiDDoSCheck() {
        // Проверяем localStorage
        const verified = sessionStorage.getItem('antiDDoSVerified');
        if (verified === 'true') {
            return true;
        }
        
        // Проверка на бота
        if (checkBot()) {
            console.log('Bot detected');
            if (!showChallenge()) {
                return false;
            }
        }
        
        // Проверка rate limit
        if (checkRateLimit()) {
            console.log('Rate limit exceeded');
            if (!showChallenge()) {
                return false;
            }
        }
        
        // Проверка WebGL
        if (!checkWebGL()) {
            console.log('WebGL not supported');
            if (!showChallenge()) {
                return false;
            }
        }
        
        // Сохраняем что проверка пройдена
        sessionStorage.setItem('antiDDoSVerified', 'true');
        return true;
    }
    
    // Запускаем проверку при загрузке
    if (!antiDDoSCheck()) {
        window.location.href = 'about:blank';
    }
    
    // Мониторинг активности
    let activityCount = 0;
    let lastActivity = Date.now();
    
    function checkActivity() {
        const now = Date.now();
        if (now - lastActivity < 100) {
            activityCount++;
            if (activityCount > 50) {
                console.log('Suspicious activity detected');
                document.body.innerHTML = '<h1 style="text-align:center;margin-top:50px;">Suspicious Activity Detected</h1>';
            }
        } else {
            activityCount = 0;
        }
        lastActivity = now;
    }
    
    document.addEventListener('mousemove', checkActivity);
    document.addEventListener('click', checkActivity);
    document.addEventListener('keypress', checkActivity);
    
})();
