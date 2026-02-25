// Плавная прокрутка к секциям
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        // Игнорируем пустые якоря
        if (!href || href === '#' || href.length <= 1) {
            return;
        }
        e.preventDefault();
        const target = document.querySelector(href);
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
        
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Функция скачивания лоадера
function downloadLoader() {
    const loaderUrl = './DirmaLoader.exe';
    const fileName = 'DirmaLoader.exe';
    
    showNotification('Download started!', 'success');
    
    const link = document.createElement('a');
    link.href = loaderUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    trackDownload();
    
    setTimeout(() => {
        showNotification('Don\'t forget to install Java 25!', 'info');
    }, 2000);
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

function trackDownload() {
    console.log('Download tracked:', new Date().toISOString());
}

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - scrolled / 700;
    }
});

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

document.querySelectorAll('.feature-card, .step, .faq-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

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

let downloadCount = 10247;
const statValue = document.querySelector('.stat-value');
if (statValue && statValue.textContent.includes('10K+')) {
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


// КАПЧА
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
        const overlay = document.getElementById('captcha-overlay');
        overlay.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            overlay.classList.add('hidden');
            localStorage.setItem('captcha_passed', 'true');
            localStorage.setItem('captcha_time', Date.now().toString());
        }, 300);
    } else {
        error.textContent = 'Wrong answer. Try again.';
        input.style.borderColor = '#ff6b6b';
        input.value = '';
        setTimeout(() => {
            generateCaptcha();
            error.textContent = '';
            input.style.borderColor = 'rgba(87, 83, 222, 0.3)';
        }, 1500);
    }
}

window.addEventListener('load', () => {
    const captchaPassed = localStorage.getItem('captcha_passed');
    const captchaTime = localStorage.getItem('captcha_time');
    const overlay = document.getElementById('captcha-overlay');
    
    const validTime = 24 * 60 * 60 * 1000;
    const now = Date.now();
    
    if (captchaPassed === 'true' && captchaTime && (now - parseInt(captchaTime)) < validTime) {
        overlay.classList.add('hidden');
    } else {
        generateCaptcha();
        const btn = document.getElementById('captcha-submit-btn');
        if (btn) btn.onclick = checkCaptcha;
        document.getElementById('captcha-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') checkCaptcha();
        });
    }
});

const fadeOutStyle = document.createElement('style');
fadeOutStyle.textContent = `@keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }`;
document.head.appendChild(fadeOutStyle);


// СИСТЕМА АККАУНТОВ
const _0x5f2a = 'aHR0cHM6Ly9hcGkubnBvaW50LmlvLzhiY2UxZDZmMGU2ODIyMjM3ODQ1';
const _0x7d4e = ['users','keys','username','password','sub','hwid'];
function _0xurl() { return atob(_0x5f2a); }
function _0xf(index) { return _0x7d4e[index]; }
const API_URL = _0xurl();
let currentUser = null;

async function fetchAPI() {
    try {
        const response = await fetch(API_URL);
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        return null;
    }
}

async function saveAPI(data) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return response.ok;
    } catch (error) {
        console.error('API Save Error:', error);
        return false;
    }
}

async function login() {
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;
    const error = document.getElementById('login-error');
    
    if (!username || !password) {
        error.textContent = 'Fill in all fields';
        return;
    }
    
    error.textContent = 'Checking...';
    const data = await fetchAPI();
    
    if (!data) {
        error.textContent = 'Server connection error';
        return;
    }
    
    const user = data[_0xf(0)].find(u => u[_0xf(2)] === username && u[_0xf(3)] === password);
    
    if (!user) {
        error.textContent = 'Invalid username or password';
        return;
    }
    
    currentUser = user;
    saveUserToCookie(user); // Сохраняем в Cookie вместо localStorage
    console.log('User logged in and saved:', user);
    console.log('User HWID field:', user[_0xf(5)]);
    console.log('All user fields:', {
        username: user[_0xf(2)],
        sub: user[_0xf(4)],
        hwid: user[_0xf(5)]
    });
    showAccountPanel();
    updateAllButtons();
    error.textContent = '';
}

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
    const data = await fetchAPI();
    
    if (!data) {
        error.textContent = 'Server connection error';
        return;
    }
    
    if (data[_0xf(0)].find(u => u[_0xf(2)] === username)) {
        error.textContent = 'User with this name already exists';
        return;
    }
    
    const newUser = {
        [_0xf(2)]: username,
        [_0xf(3)]: password,
        [_0xf(5)]: '',
        [_0xf(4)]: 'Expired'
    };
    
    data[_0xf(0)].push(newUser);
    const saved = await saveAPI(data);
    
    if (!saved) {
        error.textContent = 'Data save error';
        return;
    }
    
    currentUser = newUser;
    saveUserToCookie(newUser); // Сохраняем в Cookie
    showAccountPanel();
    updateAllButtons();
    error.textContent = '';
}

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
    
    console.log('=== KEY ACTIVATION DEBUG ===');
    console.log('Entered key:', key);
    console.log('HWID keys array:', data.hwidkey);
    console.log('Normal keys array:', data[_0xf(1)]);
    
    // Проверяем является ли это HWID reset ключом
    const isHwidKey = data.hwidkey && data.hwidkey.includes(key);
    console.log('Is HWID key?', isHwidKey);
    
    if (isHwidKey) {
        // HWID Reset Key - удаляем ключ из массива
        const hwidKeyIndex = data.hwidkey.indexOf(key);
        if (hwidKeyIndex !== -1) {
            data.hwidkey.splice(hwidKeyIndex, 1);
        }
        
        const userIndex = data[_0xf(0)].findIndex(u => u[_0xf(2)] === currentUser[_0xf(2)]);
        if (userIndex !== -1) {
            data[_0xf(0)][userIndex][_0xf(5)] = ''; // Очищаем HWID
            currentUser[_0xf(5)] = '';
        }
        
        const saved = await saveAPI(data);
        
        if (!saved) {
            error.textContent = 'Data save error';
            return;
        }
        
        saveUserToCookie(currentUser);
        
        error.style.color = '#4CAF50';
        error.textContent = 'HWID successfully reset!';
        
        // Меняем фон на зеленый
        const activateForm = document.getElementById('activate-form');
        activateForm.style.transition = 'background 0.5s ease';
        activateForm.style.background = 'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(102, 187, 106, 0.1) 100%)';
        
        updateAccountButton();
        
        // Обновляем отображение HWID
        document.getElementById('account-hwid').textContent = 'Not bound yet';
        
        setTimeout(() => {
            showAccountPanel();
            error.style.color = '#ff6b6b';
            error.textContent = '';
            activateForm.style.background = '';
        }, 2000);
        
        return;
    }
    
    // Обычный ключ активации
    const keyIndex = data[_0xf(1)].indexOf(key);
    
    if (keyIndex === -1) {
        error.textContent = 'Invalid key';
        return;
    }
    
    // Удаляем ключ из массива после активации
    data[_0xf(1)].splice(keyIndex, 1);
    
    const userIndex = data[_0xf(0)].findIndex(u => u[_0xf(2)] === currentUser[_0xf(2)]);
    if (userIndex !== -1) {
        data[_0xf(0)][userIndex][_0xf(4)] = 'Active';
        currentUser[_0xf(4)] = 'Active';
    }
    
    const saved = await saveAPI(data);
    
    if (!saved) {
        error.textContent = 'Data save error';
        return;
    }
    
    saveUserToCookie(currentUser);
    
    error.style.color = '#4CAF50';
    error.textContent = 'Key successfully activated!';
    
    // Меняем фон на зеленый
    const activateForm = document.getElementById('activate-form');
    activateForm.style.transition = 'background 0.5s ease';
    activateForm.style.background = 'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(102, 187, 106, 0.1) 100%)';
    
    updateAccountButton();
    updateNavLoginButton();
    
    setTimeout(() => {
        showAccountPanel();
        error.style.color = '#ff6b6b';
        error.textContent = '';
        activateForm.style.background = '';
    }, 2000);
}

function logout() {
    console.log('Logout function called');
    console.log('Current user before logout:', currentUser);
    
    currentUser = null;
    removeUserFromCookie(); // Удаляем Cookie вместо localStorage
    
    console.log('User logged out, currentUser is now:', currentUser);
    console.log('Calling updateAllButtons...');
    
    updateAllButtons();
    closeAuth();
    
    // Принудительно обновляем кнопку еще раз через небольшую задержку
    setTimeout(() => {
        console.log('Delayed update...');
        updateAllButtons();
    }, 100);
}

function showLogin() {
    document.getElementById('login-form').classList.remove('hidden');
    document.getElementById('register-form').classList.add('hidden');
    document.getElementById('activate-form').classList.add('hidden');
    document.getElementById('account-panel').classList.add('hidden');
    document.getElementById('change-password-form')?.classList.add('hidden');
}

function showRegister() {
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('register-form').classList.remove('hidden');
    document.getElementById('activate-form').classList.add('hidden');
    document.getElementById('account-panel').classList.add('hidden');
    document.getElementById('change-password-form')?.classList.add('hidden');
}

function showActivateForm() {
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('register-form').classList.add('hidden');
    document.getElementById('activate-form').classList.remove('hidden');
    document.getElementById('account-panel').classList.add('hidden');
    document.getElementById('change-password-form')?.classList.add('hidden');
}

function showChangePassword() {
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('register-form').classList.add('hidden');
    document.getElementById('activate-form').classList.add('hidden');
    document.getElementById('account-panel').classList.add('hidden');
    document.getElementById('change-password-form').classList.remove('hidden');
}

async function changePassword() {
    const oldPassword = document.getElementById('change-old-password').value;
    const newPassword = document.getElementById('change-new-password').value;
    const newPassword2 = document.getElementById('change-new-password2').value;
    const error = document.getElementById('change-password-error');
    
    if (!oldPassword || !newPassword || !newPassword2) {
        error.textContent = 'Fill in all fields';
        return;
    }
    
    if (newPassword !== newPassword2) {
        error.textContent = 'New passwords do not match';
        return;
    }
    
    if (newPassword.length < 6) {
        error.textContent = 'New password must be at least 6 characters';
        return;
    }
    
    if (!currentUser) {
        error.textContent = 'You must be logged in';
        return;
    }
    
    // Проверяем старый пароль
    if (currentUser[_0xf(3)] !== oldPassword && currentUser.password !== oldPassword) {
        error.textContent = 'Current password is incorrect';
        return;
    }
    
    error.textContent = 'Changing password...';
    const data = await fetchAPI();
    
    if (!data) {
        error.textContent = 'Server connection error';
        return;
    }
    
    const userIndex = data[_0xf(0)].findIndex(u => u[_0xf(2)] === currentUser[_0xf(2)]);
    if (userIndex !== -1) {
        data[_0xf(0)][userIndex][_0xf(3)] = newPassword;
        currentUser[_0xf(3)] = newPassword;
        if (currentUser.password) currentUser.password = newPassword;
    }
    
    const saved = await saveAPI(data);
    
    if (!saved) {
        error.textContent = 'Data save error';
        return;
    }
    
    saveUserToCookie(currentUser);
    
    error.style.color = '#4CAF50';
    error.textContent = 'Password successfully changed!';
    
    // Очищаем поля
    document.getElementById('change-old-password').value = '';
    document.getElementById('change-new-password').value = '';
    document.getElementById('change-new-password2').value = '';
    
    setTimeout(() => {
        showAccountPanel();
        error.style.color = '#ff6b6b';
        error.textContent = '';
    }, 2000);
}

function showAccountPanel() {
    if (!currentUser) {
        showLogin();
        return;
    }
    
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('register-form').classList.add('hidden');
    document.getElementById('activate-form').classList.add('hidden');
    document.getElementById('account-panel').classList.remove('hidden');
    document.getElementById('change-password-form')?.classList.add('hidden');
    
    document.getElementById('account-username').textContent = currentUser[_0xf(2)];
    
    const statusEl = document.getElementById('account-status');
    statusEl.textContent = `Subscription: ${currentUser[_0xf(4)]}`;
    statusEl.className = 'account-status ' + (currentUser[_0xf(4)] === 'Active' ? 'active' : 'expired');
    
    const hwidEl = document.getElementById('account-hwid');
    
    // Детальное логирование для отладки
    console.log('=== HWID DEBUG ===');
    console.log('currentUser object:', currentUser);
    console.log('_0xf(5) returns:', _0xf(5));
    console.log('currentUser[_0xf(5)]:', currentUser[_0xf(5)]);
    console.log('currentUser.hwid:', currentUser.hwid);
    console.log('currentUser["hwid"]:', currentUser["hwid"]);
    
    // Пробуем разные способы получить HWID
    let hwid = currentUser[_0xf(5)] || currentUser.hwid || currentUser["hwid"] || '';
    
    console.log('Final HWID value:', hwid, 'Type:', typeof hwid, 'Length:', hwid.length);
    
    // Проверяем что HWID существует и не пустой
    if (hwid && hwid !== '' && hwid.trim().length > 0) {
        hwidEl.textContent = hwid;
        console.log('HWID displayed:', hwid);
    } else {
        hwidEl.textContent = 'Not bound yet';
        console.log('HWID not set, showing "Not bound yet"');
    }
}

function openAuth() {
    document.getElementById('auth-overlay').classList.remove('hidden');
    if (currentUser) {
        showAccountPanel();
    } else {
        showLogin();
    }
}

function closeAuth() {
    document.getElementById('auth-overlay').classList.add('hidden');
}

function updateAccountButton() {
    const button = document.getElementById('account-button');
    const text = document.getElementById('account-button-text');
    
    if (!button || !text) {
        console.warn('account-button or account-button-text not found');
        return;
    }
    
    if (currentUser) {
        const username = currentUser[_0xf(2)] || currentUser.username;
        const sub = currentUser[_0xf(4)] || currentUser.sub;
        console.log('Updating account button with username:', username);
        text.textContent = username;
        button.style.background = sub === 'Active' 
            ? 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)'
            : 'linear-gradient(135deg, #ff6b6b 0%, #ff8787 100%)';
    } else {
        console.log('No user, setting account button to Login');
        text.textContent = 'Login';
        button.style.background = 'var(--gradient-1)';
    }
}

window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('account-button')?.classList.remove('hidden');
    }, 500);
    
    // Миграция со старого localStorage на Cookie
    const oldUser = localStorage.getItem('dirma_user');
    if (oldUser) {
        try {
            const user = JSON.parse(oldUser);
            saveUserToCookie(user);
            localStorage.removeItem('dirma_user');
            console.log('Migrated user from localStorage to cookie');
        } catch (e) {
            console.error('Migration error:', e);
            localStorage.removeItem('dirma_user');
        }
    }
    
    // Загружаем пользователя из Cookie
    const savedUser = loadUserFromCookie();
    if (savedUser) {
        currentUser = savedUser;
        console.log('Loaded user from cookie Dirma_ID:', currentUser);
        
        // Синхронизируем данные с API чтобы получить актуальный HWID
        fetchAPI().then(data => {
            if (data && data[_0xf(0)]) {
                const freshUser = data[_0xf(0)].find(u => 
                    u[_0xf(2)] === currentUser[_0xf(2)] && 
                    u[_0xf(3)] === currentUser[_0xf(3)]
                );
                if (freshUser) {
                    console.log('Syncing user data from API:', freshUser);
                    currentUser = freshUser;
                    saveUserToCookie(freshUser);
                    updateAllButtons();
                }
            }
        });
        
        updateAllButtons();
    } else {
        console.log('No saved user found in cookie');
        updateAllButtons(); // Обновляем кнопки даже если нет пользователя
    }
});

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
    
    document.getElementById('change-new-password2')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') changePassword();
    });
});

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


// Обновление кнопки логина в навбаре
function updateNavLoginButton() {
    const navBtn = document.getElementById('nav-login-btn');
    if (!navBtn) {
        console.warn('nav-login-btn not found');
        return;
    }
    
    if (currentUser) {
        const username = currentUser[_0xf(2)] || currentUser.username;
        const sub = currentUser[_0xf(4)] || currentUser.sub;
        
        console.log('Updating nav button with username:', username, 'sub:', sub);
        navBtn.textContent = username;
        
        // Меняем цвет в зависимости от подписки
        if (sub === 'Active') {
            navBtn.style.cssText = 'background: linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%) !important; color: white !important;';
        } else {
            navBtn.style.cssText = 'background: linear-gradient(135deg, #ff6b6b 0%, #ff8787 100%) !important; color: white !important;';
        }
    } else {
        console.log('No user, setting Login text');
        navBtn.textContent = 'Login';
        navBtn.style.cssText = ''; // Убираем inline стили, вернется CSS по умолчанию
    }
}

// Обновляем обе кнопки
function updateAllButtons() {
    console.log('updateAllButtons called, currentUser:', currentUser);
    updateAccountButton();
    updateNavLoginButton();
    console.log('Both buttons updated');
}


// COOKIE FUNCTIONS
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

function saveUserToCookie(user) {
    const userData = JSON.stringify(user);
    const encoded = btoa(userData);
    setCookie('Dirma_ID', encoded, 30); // 30 дней
    console.log('User saved to cookie Dirma_ID');
}

function loadUserFromCookie() {
    const encoded = getCookie('Dirma_ID');
    if (!encoded) return null;
    
    try {
        const userData = atob(encoded);
        return JSON.parse(userData);
    } catch (e) {
        deleteCookie('Dirma_ID');
        return null;
    }
}

function removeUserFromCookie() {
    deleteCookie('Dirma_ID');
    console.log('Cookie Dirma_ID removed');
}


// БЕСКОНЕЧНЫЕ ЧАСТИЦЫ НА ЗАДНЕМ ФОНЕ
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

            // Wrap around screen (бесконечность)
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

    // Адаптивное количество частиц
    function getParticleCount() {
        const width = window.innerWidth;
        if (width < 480) return 40;
        if (width < 768) return 60;
        return 80;
    }

    const particles = [];
    for (let i = 0; i < getParticleCount(); i++) {
        particles.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // Рисуем соединения между близкими частицами
        const maxDistance = window.innerWidth < 768 ? 100 : 120;
        particles.forEach((p1, i) => {
            particles.slice(i + 1).forEach(p2 => {
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < maxDistance) {
                    ctx.strokeStyle = `rgba(87, 83, 222, ${0.15 * (1 - distance / maxDistance)})`;
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

    // Обновляем размер canvas при изменении окна
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Пересоздаем частицы при изменении размера
        const newCount = getParticleCount();
        if (newCount !== particles.length) {
            particles.length = 0;
            for (let i = 0; i < newCount; i++) {
                particles.push(new Particle());
            }
        }
    });
}


// ПЛАВАЮЩИЕ ОРБЫ
const orbsContainer = document.getElementById('orbs-container');
if (orbsContainer) {
    const orbCount = window.innerWidth < 768 ? 3 : 4;
    for (let i = 0; i < orbCount; i++) {
        const orb = document.createElement('div');
        orb.className = 'orb';
        const baseSize = window.innerWidth < 768 ? 150 : 200;
        const size = Math.random() * 150 + baseSize;
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
        
        orb.style.background = colors[i % colors.length];
        orb.style.animationDelay = (i * 5) + 's';
        orb.style.animationDuration = (15 + i * 3) + 's';
        orbsContainer.appendChild(orb);
    }
}
