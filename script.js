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

// Загрузка данных с API
async function fetchAPI() {
    try {
        const response = await fetch(API_URL);
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        return null;
    }
}

// Сохранение данных на API
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
    
    // Успешный вход
    currentUser = user;
    localStorage.setItem('dirma_user', JSON.stringify(user));
    
    showAccountPanel();
    updateAccountButton();
    error.textContent = '';
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
    const data = await fetchAPI();
    
    if (!data) {
        error.textContent = 'Server connection error';
        return;
    }
    
    // Проверка существования пользователя
    if (data[_0xf(0)].find(u => u[_0xf(2)] === username)) {
        error.textContent = 'User with this name already exists';
        return;
    }
    
    // Создание нового пользователя
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
    
    // Автоматический вход
    currentUser = newUser;
    localStorage.setItem('dirma_user', JSON.stringify(newUser));
    
    showAccountPanel();
    updateAccountButton();
    error.textContent = '';
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
    
    // Проверка существования ключа
    const keyIndex = data[_0xf(1)].indexOf(key);
    
    if (keyIndex === -1) {
        error.textContent = 'Invalid key';
        return;
    }
    
    // Удаление ключа из списка
    data[_0xf(1)].splice(keyIndex, 1);
    
    // Активация подписки
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
    
    localStorage.setItem('dirma_user', JSON.stringify(currentUser));
    
    // Показываем успех
    error.style.color = '#4CAF50';
    error.textContent = 'Key successfully activated!';
    
    setTimeout(() => {
        showAccountPanel();
        error.style.color = '#ff6b6b';
        error.textContent = '';
    }, 2000);
}

// Выход
function logout() {
    currentUser = null;
    localStorage.removeItem('dirma_user');
    updateAccountButton();
    closeAuth();
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
    
    document.getElementById('account-username').textContent = currentUser[_0xf(2)];
    const statusEl = document.getElementById('account-status');
    statusEl.textContent = `Subscription: ${currentUser[_0xf(4)]}`;
    statusEl.className = 'account-status ' + (currentUser[_0xf(4)] === 'Active' ? 'active' : 'expired');
}

// Открыть окно авторизации
function openAuth() {
    document.getElementById('auth-overlay').classList.remove('hidden');
    if (currentUser) {
        showAccountPanel();
    } else {
        showLogin();
    }
}

// Закрыть окно авторизации
function closeAuth() {
    document.getElementById('auth-overlay').classList.add('hidden');
}

// Обновить кнопку аккаунта
function updateAccountButton() {
    const button = document.getElementById('account-button');
    const text = document.getElementById('account-button-text');
    
    if (currentUser) {
        text.textContent = currentUser[_0xf(2)];
        button.style.background = currentUser[_0xf(4)] === 'Active' 
            ? 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)'
            : 'linear-gradient(135deg, #ff6b6b 0%, #ff8787 100%)';
    } else {
        text.textContent = 'Login';
        button.style.background = 'var(--gradient-1)';
    }
}

// Проверка авторизации при загрузке
window.addEventListener('load', () => {
    // Показываем кнопку аккаунта после прохождения капчи
    setTimeout(() => {
        document.getElementById('account-button').classList.remove('hidden');
    }, 500);
    
    // Проверяем сохраненного пользователя
    const savedUser = localStorage.getItem('dirma_user');
    if (savedUser) {
        try {
            currentUser = JSON.parse(savedUser);
            updateAccountButton();
        } catch (e) {
            localStorage.removeItem('dirma_user');
        }
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
