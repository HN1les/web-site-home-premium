// Данные о домах
const houses = [
    {
        id: 1,
        title: "Премиум вилла у озера",
        price: "125 000 000 ₽",
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600",
        description: "Роскошная вилла с панорамными окнами, собственным причалом и спа-комплексом. Площадь дома 500 м².",
        details: "5 спален • 6 ванных • Бассейн • Причал"
    },
    {
        id: 2,
        title: "Современный особняк",
        price: "89 000 000 ₽",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600",
        description: "Инновационный дизайн, умный дом, панорамное остекление. Площадь дома 350 м².",
        details: "4 спальни • 4 ванных • Терраса • Гараж"
    },
    {
        id: 3,
        title: "Эко-резиденция",
        price: "150 000 000 ₽",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600",
        description: "Уникальный проект в гармонии с природой. Энергоэффективные технологии, зимний сад.",
        details: "6 спален • 5 ванных • Сад • Бассейн"
    }
];

// Мобильная навигация
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    // Создаем оверлей
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    function toggleMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        body.style.overflow = body.style.overflow === 'hidden' ? '' : 'hidden';
    }

    hamburger.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    // Закрытие меню при клике на ссылку
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            overlay.classList.remove('active');
            body.style.overflow = '';
        });
    });

    // Закрытие меню при изменении размера окна
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            overlay.classList.remove('active');
            body.style.overflow = '';
        }
    });

    // Свайп для закрытия меню
    let touchStartX = 0;
    let touchEndX = 0;

    navMenu.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    navMenu.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) { // Свайп влево
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            overlay.classList.remove('active');
            body.style.overflow = '';
        }
    });

    // Загрузка карточек домов
    const housesGrid = document.querySelector('.houses-grid');
    houses.forEach(house => {
        housesGrid.innerHTML += createHouseCard(house);
    });

    // Плавная прокрутка
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// Создание карточки дома
function createHouseCard(house) {
    return `
        <div class="house-card" onclick="showHouseDetails(${house.id})">
            <img src="${house.image}" alt="${house.title}" loading="lazy">
            <div class="house-info">
                <h3>${house.title}</h3>
                <p class="house-price">${house.price}</p>
                <div class="house-details">${house.details}</div>
            </div>
        </div>
    `;
}

// Показ деталей дома
function showHouseDetails(houseId) {
    const house = houses.find(h => h.id === houseId);
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">×</span>
            <h2>${house.title}</h2>
            <img src="${house.image}" alt="${house.title}" loading="lazy">
            <p class="house-price">${house.price}</p>
            <p>${house.description}</p>
            <div class="house-details">${house.details}</div>
            <button onclick="contactAgent(${house.id})">Связаться с агентом</button>
        </div>
    `;
    document.body.appendChild(modal);

    const closeBtn = modal.querySelector('.close');
    closeBtn.onclick = () => modal.remove();
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
}

function contactAgent(houseId) {
    alert('Спасибо за интерес! Наш премиум-агент свяжется с вами в ближайшее время.');
}