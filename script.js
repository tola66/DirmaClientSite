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
    showNotification('Скачивание начато!', 'success');
    
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
        showNotification('Не забудьте установить Java 25!', 'info');
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
    const os = detectOS();
    const downloadBtn = document.querySelector('.btn-download');
    if (downloadBtn && os !== 'Unknown') {
        downloadBtn.innerHTML = `
            <span class="btn-icon">⬇</span>
            Скачать для ${os}
        `;
    }
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
