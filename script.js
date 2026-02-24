// Плавная прокрутка к секциям
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

// FAQ аккордеон
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Закрываем все открытые FAQ
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Открываем текущий, если он был закрыт
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Функция скачивания лоадера
function downloadLoader() {
    // Определяем, какой файл скачивать
    const loaderUrl = './DirmaLoader.exe'; // По умолчанию EXE
    const fileName = 'DirmaLoader.exe';
    
    // Показываем уведомление
    showNotification('Download started!', 'success');
    
    // Создаём временную ссылку для скачивания
    const link = document.createElement('a');
    link.href = loaderUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Отправляем статистику (опционально)
    trackDownload();
    
    // Показываем инструкцию
    setTimeout(() => {
        showNotification('Don\'t forget to install Java 25!', 'info');
    }, 2000);
}

// Функция скачивания Java
function downloadJava() {
    const javaUrl = 'https://download.oracle.com/java/25/latest/jdk-25_windows-x64_bin.exe';
    window.open(javaUrl, '_blank');
    showNotification('Открыта страница загрузки Java 25', 'info');
}

// Показ уведомлений
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#5753de'};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Добавляем CSS для анимации уведомлений
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

// Отслеживание скачиваний (опционально)
function trackDownload() {
    // Здесь можно добавить отправку статистики на сервер
    console.log('Download tracked:', new Date().toISOString());
    
    // Пример отправки на сервер:
    // fetch('/api/track-download', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //         timestamp: new Date().toISOString(),
    //         userAgent: navigator.userAgent
    //     })
    // });
}

// Эффект параллакса для hero секции
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - scrolled / 700;
    }
});

// Анимация появления элементов при скролле
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Наблюдаем за элементами
document.querySelectorAll('.feature-card, .step, .faq-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Добавляем анимацию fadeInUp
const fadeInStyle = document.createElement('style');
fadeInStyle.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(fadeInStyle);

// Изменение навбара при скролле
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 17, 26, 0.95)';
        navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.3)';
    } else {
        navbar.style.background = 'rgba(15, 17, 26, 0.9)';
        navbar.style.boxShadow = 'none';
    }
});

// Проверка системы пользователя
function detectOS() {
    const userAgent = window.navigator.userAgent;
    const platform = window.navigator.platform;
    const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
    const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
    
    if (macosPlatforms.indexOf(platform) !== -1) {
        return 'macOS';
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
        return 'Windows';
    } else if (/Linux/.test(platform)) {
        return 'Linux';
    }
    return 'Unknown';
}

// Обновляем текст кнопки в зависимости от ОС
window.addEventListener('load', () => {
    // Функция отключена - используем стандартный текст кнопки
});

// Счётчик загрузок (демо)
let downloadCount = 10247;
const statValue = document.querySelector('.stat-value');
if (statValue && statValue.textContent.includes('10K+')) {
    // Анимация счётчика
    let current = 0;
    const target = downloadCount;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        statValue.textContent = Math.floor(current).toLocaleString() + '+';
    }, 20);
}

console.log('%cDirma Client', 'color: #5753de; font-size: 24px; font-weight: bold;');
console.log('%cСпасибо за использование нашего клиента!', 'color: #8b87ff; font-size: 14px;');

// ==================== КАПЧА ====================
let captchaAnswer = 0;

function generateCaptcha() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    captchaAnswer = num1 + num2;
    
    document.getElementById('captcha-question').textContent = `${num1} + ${num2} = ?`;
}

function checkCaptcha() {
    const input = document.getElementById('captcha-input');
    const error = document.getElementById('captcha-error');
    const userAnswer = parseInt(input.value);
    
    if (isNaN(userAnswer)) {
        error.textContent = 'Please enter a number';
        input.style.borderColor = '#ff6b6b';
        return;
    }
    
    if (userAnswer === captchaAnswer) {
        // Правильный ответ
        const overlay = document.getElementById('captcha-overlay');
        overlay.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            overlay.classList.add('hidden');
            // Сохраняем в localStorage что капча пройдена
            localStorage.setItem('captcha_passed', 'true');
            localStorage.setItem('captcha_time', Date.now().toString());
        }, 300);
    } else {
        // Неправильный ответ
        error.textContent = 'Wrong answer. Try again.';
        input.style.borderColor = '#ff6b6b';
        input.value = '';
        
        // Генерируем новый пример
        setTimeout(() => {
            generateCaptcha();
            error.textContent = '';
            input.style.borderColor = 'rgba(87, 83, 222, 0.3)';
        }, 1500);
    }
}

// Проверка при загрузке страницы
window.addEventListener('load', () => {
    const captchaPassed = localStorage.getItem('captcha_passed');
    const captchaTime = localStorage.getItem('captcha_time');
    const overlay = document.getElementById('captcha-overlay');
    
    // Капча действительна 24 часа
    const validTime = 24 * 60 * 60 * 1000;
    const now = Date.now();
    
    if (captchaPassed === 'true' && captchaTime && (now - parseInt(captchaTime)) < validTime) {
        // Капча уже пройдена и еще действительна
        overlay.classList.add('hidden');
    } else {
        // Показываем капчу
        generateCaptcha();
        
        // Обработка Enter
        document.getElementById('captcha-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                checkCaptcha();
            }
        });
    }
});

// Добавляем анимацию fadeOut
const fadeOutStyle = document.createElement('style');
fadeOutStyle.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(fadeOutStyle);

// ==================== СИСТЕМА АККАУНТОВ ====================
// Обфусцированные данные - многоуровневое шифрование
const _0x5f2a = 'aHR0cHM6Ly9hcGkubnBvaW50LmlvLzhiY2UxZDZmMGU2ODIyMjM3ODQ1';
const _0x7d4e = ['users','keys','username','password','sub','hwid'];

// Декодирование URL
function _0xurl() {
    return atob(_0x5f2a);
}

// Получение имени поля
function _0xf(index) {
    return _0x7d4e[index];
}

const API_URL = _0xurl();
let currentUser = null;

// ==================== COOKIE FUNCTIONS ====================
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Strict";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function deleteCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

// Сохранение пользователя в cookie (зашифрованно)
function saveUserToCookie(user) {
    const userData = JSON.stringify(user);
    const encoded = btoa(userData); // Base64 encoding
    setCookie('dirma_user', encoded, 7); // 7 days
}

// Загрузка пользователя из cookie
function loadUserFromCookie() {
    const encoded = getCookie('dirma_user');
    if (!encoded) return null;
    
    try {
        const userData = atob(encoded); // Base64 decoding
        return JSON.parse(userData);
    } catch (e) {
        deleteCookie('dirma_user');
        return null;
    }
}

// Удаление пользователя из cookie
function removeUserFromCookie() {
    deleteCookie('dirma_user');
}

// ==================== LOCAL STORAGE FOR USERS ====================
function getLocalUsers() {
    const users = getCookie('dirma_users');
    if (!users) return [];
    
    try {
        const decoded = atob(users);
        return JSON.parse(decoded);
    } catch (e) {
        return [];
    }
}

function saveLocalUsers(users) {
    const encoded = btoa(JSON.stringify(users));
    setCookie('dirma_users', encoded, 365); // 1 year
}

// Генерация HWID
function generateHWID() {
    const chars = '0123456789ABCDEF';
    let hwid = '';
    for (let i = 0; i < 32; i++) {
        hwid += chars[Math.floor(Math.random() * chars.length)];
    }
    return hwid;
}

// Загрузка данных с API
async function fetchAPI() {
    try {
        // Добавляем timestamp для обхода кэша
        const timestamp = new Date().getTime();
        const response = await fetch(API_URL + '?t=' + timestamp, {
            cache: 'no-cache',
            headers: {
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache'
            }
        });
        const data = await response.json();
        console.log('Fetched API data:', data);
        return data;
    } catch (error) {
        console.error('API Error:', error);
        return null;
    }
}

// Сохранение данных на API (не работает из браузера из-за CORS)
async function saveAPI(data) {
    // Браузеры блокируют POST к npoint.io
    // Используйте DirmaLoader для активации ключей
    return false;
}

// Вход
async function login() {
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;
    const error = document.getElementById('login-error');
    
    if (!username || !password) {
        error.textContent = 'Fill in all fields';
        return;
    }
    
    error.textContent = 'Checking...';
    
    // Сначала проверяем локальных пользователей
    const localUsers = getLocalUsers();
    let user = localUsers.find(u => u.username === username && u.password === password);
    
    if (!user) {
        // Если не найден локально, проверяем на сервере
        const data = await fetchAPI();
        
        if (!data) {
            error.textContent = 'Server connection error';
            return;
        }
        
        console.log('API data:', data);
        console.log('Looking for username:', username);
        console.log('Users from API:', data[_0xf(0)]);
        
        user = data[_0xf(0)].find(u => {
            console.log('Checking user:', u);
            console.log('Username match:', u[_0xf(2)] === username, u[_0xf(2)], username);
            console.log('Password match:', u[_0xf(3)] === password);
            return u[_0xf(2)] === username && u[_0xf(3)] === password;
        });
        
        if (!user) {
            error.textContent = 'Invalid username or password';
            console.log('User not found in API');
            return;
        }
        
        console.log('Found user from API:', user);
        
        // Нормализуем данные с сервера
        user = {
            username: user[_0xf(2)] || user.username,
            password: user[_0xf(3)] || user.password,
            hwid: user[_0xf(5)] || user.hwid || '',
            sub: user[_0xf(4)] || user.sub || 'Expired'
        };
        
        console.log('Normalized user:', user);
    }
    
    // Успешный вход
    currentUser = user;
    saveUserToCookie(user);
    
    console.log('Login successful, user:', currentUser);
    
    // Обновляем все кнопки
    updateAllButtons();
    
    // Показываем панель аккаунта (модальное окно остается открытым)
    showAccountPanel();
    
    error.textContent = '';
    
    // НЕ закрываем модальное окно - пользователь должен видеть свою панель аккаунта
}

// Регистрация
async function register() {
    const username = document.getElementById('register-username').value.trim();
    const password = document.getElementById('register-password').value;
    const password2 = document.getElementById('register-password2').value;
    const error = document.getElementById('register-error');
    
    if (!username || !password || !password2) {
        error.textContent = 'Fill in all fields';
        return;
    }
    
    if (password !== password2) {
        error.textContent = 'Passwords do not match';
        return;
    }
    
    if (username.length < 3) {
        error.textContent = 'Username must be at least 3 characters';
        return;
    }
    
    if (password.length < 6) {
        error.textContent = 'Password must be at least 6 characters';
        return;
    }
    
    error.textContent = 'Registering...';
    
    // Проверяем существование пользователя в локальном хранилище
    const existingUsers = getLocalUsers();
    if (existingUsers.find(u => u.username === username)) {
        error.textContent = 'User with this name already exists';
        return;
    }
    
    // Создание нового пользователя
    const newUser = {
        username: username,
        password: password,
        hwid: '', // HWID привязывается при первом запуске клиента
        sub: 'Expired'
    };
    
    // Сохраняем в локальное хранилище
    existingUsers.push(newUser);
    saveLocalUsers(existingUsers);
    
    // Автоматический вход
    currentUser = newUser;
    saveUserToCookie(newUser);
    
    console.log('Registration successful, user:', currentUser);
    
    // Обновляем все кнопки
    updateAllButtons();
    
    // Показываем панель аккаунта (модальное окно остается открытым)
    showAccountPanel();
    
    error.textContent = '';
    
    // НЕ закрываем модальное окно - пользователь должен видеть свою панель аккаунта
}

// Активация ключа
async function activateKey() {
    const key = document.getElementById('activate-key').value.trim().toUpperCase();
    const error = document.getElementById('activate-error');
    
    if (!key) {
        error.textContent = 'Enter key';
        return;
    }
    
    if (!currentUser) {
        error.textContent = 'Sign in to your account';
        return;
    }
    
    error.textContent = 'Checking key...';
    const data = await fetchAPI();
    
    if (!data) {
        error.textContent = 'Server connection error';
        return;
    }
    
    console.log('Available keys:', data[_0xf(1)]);
    console.log('Trying to activate key:', key);
    
    // Проверка существования ключа
    const keyIndex = data[_0xf(1)].indexOf(key);
    
    if (keyIndex === -1) {
        error.textContent = 'Invalid key';
        console.log('Key not found in list');
        return;
    }
    
    console.log('Key found! Activating subscription...');
    
    // Активируем подписку локально
    currentUser.sub = 'Active';
    
    // Обновляем в локальном хранилище
    const localUsers = getLocalUsers();
    const localUserIndex = localUsers.findIndex(u => u.username === currentUser.username);
    if (localUserIndex !== -1) {
        localUsers[localUserIndex].sub = 'Active';
        saveLocalUsers(localUsers);
    }
    
    saveUserToCookie(currentUser);
    
    // Показываем успех
    error.style.color = '#4CAF50';
    error.textContent = '✓ Key activated! (Local session only)';
    
    // Обновляем все кнопки
    updateAllButtons();
    
    // Показываем уведомление с пояснением
    showNotification('Subscription activated locally! Use DirmaLoader for permanent activation.', 'success');
    
    setTimeout(() => {
        showAccountPanel();
        error.style.color = '#ff6b6b';
        error.textContent = '';
    }, 3000);
}

// Выход
function logout() {
    console.log('Logging out...');
    
    // Очищаем текущего пользователя
    currentUser = null;
    
    // Удаляем cookie
    removeUserFromCookie();
    
    // Обновляем все кнопки
    updateAllButtons();
    
    // Закрываем модальное окно
    closeAuth();
    
    // Показываем уведомление
    showNotification('Successfully logged out', 'info');
    
    console.log('Logout complete');
}

// Показать форму входа
function showLogin() {
    document.getElementById('login-form').classList.remove('hidden');
    document.getElementById('register-form').classList.add('hidden');
    document.getElementById('activate-form').classList.add('hidden');
    document.getElementById('account-panel').classList.add('hidden');
}

// Показать форму регистрации
function showRegister() {
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('register-form').classList.remove('hidden');
    document.getElementById('activate-form').classList.add('hidden');
    document.getElementById('account-panel').classList.add('hidden');
}

// Показать форму активации
function showActivateForm() {
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('register-form').classList.add('hidden');
    document.getElementById('activate-form').classList.remove('hidden');
    document.getElementById('account-panel').classList.add('hidden');
}

// Показать панель аккаунта
function showAccountPanel() {
    if (!currentUser) {
        showLogin();
        return;
    }
    
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('register-form').classList.add('hidden');
    document.getElementById('activate-form').classList.add('hidden');
    document.getElementById('account-panel').classList.remove('hidden');
    
    // Обновляем username
    document.getElementById('account-username').textContent = currentUser.username || currentUser[_0xf(2)];
    
    // Обновляем subscription status
    const statusEl = document.getElementById('account-status');
    const sub = currentUser.sub || currentUser[_0xf(4)];
    statusEl.textContent = `Subscription: ${sub}`;
    statusEl.className = 'account-status ' + (sub === 'Active' ? 'active' : 'expired');
    
    // Обновляем HWID
    const hwidEl = document.getElementById('account-hwid');
    const hwidNote = document.querySelector('.info-note');
    const hwid = currentUser.hwid || currentUser[_0xf(5)] || '';
    
    if (hwid && hwid.length > 0) {
        hwidEl.textContent = hwid;
        hwidEl.style.color = 'var(--text-primary)';
        hwidEl.title = 'HWID is bound to your PC';
        // Скрываем информационное сообщение если HWID уже привязан
        if (hwidNote) hwidNote.style.display = 'none';
    } else {
        hwidEl.textContent = 'Not bound yet';
        hwidEl.style.color = 'var(--text-secondary)';
        hwidEl.title = 'HWID will be bound on first client launch';
        // Показываем информационное сообщение
        if (hwidNote) hwidNote.style.display = 'flex';
    }
    
    // Обновляем navbar сразу
    updateNavLoginButton();
}

// Открыть окно авторизации
function openAuth() {
    const overlay = document.getElementById('auth-overlay');
    overlay.classList.remove('hidden');
    
    if (currentUser) {
        // Если пользователь залогинен, показываем панель аккаунта
        showAccountPanel();
    } else {
        // Иначе показываем форму логина
        showLogin();
    }
}

// Закрыть окно авторизации
function closeAuth() {
    const overlay = document.getElementById('auth-overlay');
    overlay.classList.add('hidden');
    
    // Очищаем поля форм
    document.getElementById('login-username').value = '';
    document.getElementById('login-password').value = '';
    document.getElementById('register-username').value = '';
    document.getElementById('register-password').value = '';
    document.getElementById('register-password2').value = '';
    document.getElementById('activate-key').value = '';
    
    // Очищаем ошибки
    document.getElementById('login-error').textContent = '';
    document.getElementById('register-error').textContent = '';
    document.getElementById('activate-error').textContent = '';
    
    // Показываем форму логина по умолчанию
    setTimeout(() => {
        if (!currentUser) {
            showLogin();
        }
    }, 300);
}

// Обновить кнопку аккаунта
function updateAccountButton() {
    const button = document.getElementById('account-button');
    const text = document.getElementById('account-button-text');
    
    if (!button || !text) {
        console.error('Account button elements not found!');
        return;
    }
    
    if (currentUser) {
        const username = currentUser.username || currentUser[_0xf(2)] || 'User';
        const sub = currentUser.sub || currentUser[_0xf(4)] || 'Expired';
        
        text.textContent = username;
        button.style.background = sub === 'Active' 
            ? 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)'
            : 'linear-gradient(135deg, #ff6b6b 0%, #ff8787 100%)';
        
        console.log('Account button updated:', username, sub);
    } else {
        text.textContent = 'Login';
        button.style.background = 'var(--gradient-1)';
        console.log('Account button reset to Login');
    }
    
    // Обновляем navbar тоже
    updateNavLoginButton();
}

// Проверка авторизации при загрузке
window.addEventListener('load', () => {
    // Показываем кнопку аккаунта после прохождения капчи
    setTimeout(() => {
        document.getElementById('account-button').classList.remove('hidden');
    }, 500);
    
    // Проверяем сохраненного пользователя из cookie
    const savedUser = loadUserFromCookie();
    if (savedUser) {
        currentUser = savedUser;
        console.log('User loaded from cookie:', currentUser);
        updateAllButtons();
    } else {
        console.log('No saved user found');
    }
});

// Обработка Enter в формах
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('login-password')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') login();
    });
    
    document.getElementById('register-password2')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') register();
    });
    
    document.getElementById('activate-key')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') activateKey();
    });
    
    // Password strength indicator
    const passwordInput = document.getElementById('register-password');
    const strengthBar = document.getElementById('password-strength');
    const strengthFill = document.getElementById('strength-fill');
    const strengthText = document.getElementById('strength-text');
    
    if (passwordInput) {
        passwordInput.addEventListener('input', (e) => {
            const password = e.target.value;
            
            if (password.length === 0) {
                strengthBar.classList.remove('active');
                return;
            }
            
            strengthBar.classList.add('active');
            
            let strength = 0;
            
            // Length check
            if (password.length >= 6) strength += 25;
            if (password.length >= 10) strength += 25;
            
            // Contains numbers
            if (/\d/.test(password)) strength += 15;
            
            // Contains lowercase
            if (/[a-z]/.test(password)) strength += 10;
            
            // Contains uppercase
            if (/[A-Z]/.test(password)) strength += 15;
            
            // Contains special characters
            if (/[^a-zA-Z0-9]/.test(password)) strength += 10;
            
            strengthFill.style.width = strength + '%';
            
            if (strength < 30) {
                strengthText.textContent = 'Weak password';
                strengthText.style.color = '#ff6b6b';
            } else if (strength < 60) {
                strengthText.textContent = 'Medium password';
                strengthText.style.color = '#f89820';
            } else {
                strengthText.textContent = 'Strong password';
                strengthText.style.color = '#4CAF50';
            }
        });
    }
    
    // Auto-format activation key
    const activateKeyInput = document.getElementById('activate-key');
    if (activateKeyInput) {
        activateKeyInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/[^A-Z0-9]/g, '');
            
            // Format as KEY-XXXX-XXXX
            if (value.length > 3) {
                value = value.substring(0, 3) + '-' + value.substring(3);
            }
            if (value.length > 8) {
                value = value.substring(0, 8) + '-' + value.substring(8);
            }
            if (value.length > 13) {
                value = value.substring(0, 13) + '-' + value.substring(13, 17);
            }
            
            e.target.value = value;
        });
    }
});

// ==================== МОБИЛЬНОЕ МЕНЮ ====================
function toggleMobileMenu() {
    const navLinks = document.getElementById('nav-links');
    const toggle = document.querySelector('.mobile-menu-toggle');
    
    navLinks.classList.toggle('active');
    toggle.classList.toggle('active');
}

function closeMobileMenu() {
    const navLinks = document.getElementById('nav-links');
    const toggle = document.querySelector('.mobile-menu-toggle');
    
    navLinks.classList.remove('active');
    toggle.classList.remove('active');
}

// ==================== VPN DOWNLOAD ====================
function downloadVPN() {
    const vpnUrl = './DirmaVPN.exe';
    const fileName = 'DirmaVPN.exe';
    
    showNotification('VPN download started!', 'success');
    
    const link = document.createElement('a');
    link.href = vpnUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setTimeout(() => {
        showNotification('Run DirmaVPN.exe to start protection', 'info');
    }, 2000);
}

// ==================== PARTICLES & ORBS ANIMATION ====================
// Infinite Particles System
const canvas = document.getElementById('particles-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2.5 + 0.5;
            this.speedX = (Math.random() - 0.5) * 1.5;
            this.speedY = (Math.random() - 0.5) * 1.5;
            this.opacity = Math.random() * 0.4 + 0.1;
            this.color = `rgba(87, 83, 222, ${this.opacity})`;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Wrap around screen
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    const particles = [];
    for (let i = 0; i < 80; i++) {
        particles.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // Draw connections
        particles.forEach((p1, i) => {
            particles.slice(i + 1).forEach(p2 => {
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    ctx.strokeStyle = `rgba(87, 83, 222, ${0.15 * (1 - distance / 120)})`;
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            });
        });

        requestAnimationFrame(animateParticles);
    }

    animateParticles();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Floating Orbs
const orbsContainer = document.getElementById('orbs-container');
if (orbsContainer) {
    for (let i = 0; i < 4; i++) {
        const orb = document.createElement('div');
        orb.className = 'orb';
        const size = Math.random() * 250 + 200;
        orb.style.width = size + 'px';
        orb.style.height = size + 'px';
        orb.style.left = Math.random() * 100 + '%';
        orb.style.top = Math.random() * 100 + '%';
        
        const colors = [
            'radial-gradient(circle, rgba(87, 83, 222, 0.3), transparent)',
            'radial-gradient(circle, rgba(139, 135, 255, 0.25), transparent)',
            'radial-gradient(circle, rgba(87, 83, 222, 0.2), transparent)',
            'radial-gradient(circle, rgba(139, 135, 255, 0.3), transparent)'
        ];
        
        orb.style.background = colors[i];
        orb.style.animationDelay = (i * 5) + 's';
        orb.style.animationDuration = (15 + i * 3) + 's';
        orbsContainer.appendChild(orb);
    }
}

// Update navbar login button text based on user state
function updateNavLoginButton() {
    const navLoginBtn = document.getElementById('nav-login-btn');
    if (!navLoginBtn) {
        console.error('nav-login-btn element not found!');
        return;
    }
    
    if (currentUser) {
        // Получаем username из объекта пользователя
        const username = currentUser.username || currentUser[_0xf(2)] || 'User';
        const subscription = currentUser.sub || currentUser[_0xf(4)] || 'Expired';
        
        navLoginBtn.textContent = username;
        
        if (subscription === 'Active') {
            navLoginBtn.style.background = 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)';
        } else {
            navLoginBtn.style.background = 'linear-gradient(135deg, #ff6b6b 0%, #ff8787 100%)';
        }
        
        console.log('Navbar updated with username:', username, 'subscription:', subscription);
    } else {
        navLoginBtn.textContent = 'Login';
        navLoginBtn.style.background = 'var(--gradient-1)';
        console.log('Navbar reset to Login');
    }
}

// Update both buttons when user state changes
function updateAllButtons() {
    updateAccountButton();
    updateNavLoginButton();
}

// Call after login
function afterLogin() {
    updateAllButtons();
}

// Initialize on load
window.addEventListener('load', () => {
    setTimeout(() => {
        updateNavLoginButton();
        console.log('Initial navbar update, currentUser:', currentUser);
    }, 100);
});
