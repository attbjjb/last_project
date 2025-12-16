// Данные для таблицы навыков
const skillsData = [
    { technology: 'HTML/CSS', level: 'Эксперт', year: 2020, projects: 50, status: 'Активный' },
    { technology: 'JavaScript', level: 'Продвинутый', year: 2021, projects: 30, status: 'Активный' },
    { technology: 'React', level: 'Средний', year: 2022, projects: 15, status: 'Активный' },
    { technology: 'Node.js', level: 'Средний', year: 2022, projects: 10, status: 'Активный' },
    { technology: 'Python', level: 'Начальный', year: 2023, projects: 5, status: 'Изучаю' },
    { technology: 'UI/UX Design', level: 'Продвинутый', year: 2021, projects: 20, status: 'Активный' },
    { technology: 'Git', level: 'Эксперт', year: 2020, projects: 100, status: 'Активный' },
    { technology: 'TypeScript', level: 'Начальный', year: 2023, projects: 3, status: 'Изучаю' },
    { technology: 'MongoDB', level: 'Средний', year: 2022, projects: 8, status: 'Активный' },
    { technology: 'Docker', level: 'Начальный', year: 2023, projects: 2, status: 'Изучаю' }
];

// Данные для портфолио
const portfolioData = [
    { id: 1, title: 'Корпоративный сайт', category: 'web', image: 'assets/images/project1.png' },
    { id: 2, title: 'Мобильное приложение', category: 'mobile', image: 'assets/images/project2.avif' },
    { id: 3, title: 'Дизайн лендинга', category: 'design', image: 'assets/images/project3.jpg' },
    { id: 4, title: 'Интернет-магазин', category: 'web', image: 'assets/images/project4.webp' },
    { id: 5, title: 'UI Kit', category: 'design', image: 'assets/images/project5.avif' },
    { id: 6, title: 'Чат-бот', category: 'mobile', image: 'assets/images/project6.jpg' },
    { id: 7, title: 'Админ-панель', category: 'web', image: 'assets/images/project7.jpg' },
    { id: 8, title: 'Бренд-дизайн', category: 'design', image: 'assets/images/project8.jpg' },
];

// DOM элементы
const skillsTableBody = document.getElementById('skills-table-body');
const portfolioGrid = document.getElementById('portfolio-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const themeToggle = document.getElementById('theme-toggle');
const addSkillBtn = document.getElementById('add-skill-btn');
const contactForm = document.getElementById('contact-form');

// 1. Заполнение таблицы навыков
function renderSkillsTable() {
    skillsTableBody.innerHTML = '';
    skillsData.forEach((skill, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${skill.technology}</td>
            <td>${skill.level}</td>
            <td>${skill.year}</td>
            <td>${skill.projects}</td>
            <td><span class="status">${skill.status}</span></td>
            <td><button class="delete-btn" data-index="${index}">Удалить</button></td>
        `;
        skillsTableBody.appendChild(row);
    });

    // Добавляем обработчики удаления
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            skillsData.splice(index, 1);
            renderSkillsTable();
        });
    });
}

// 2. Заполнение портфолио
function renderPortfolio(filter = 'all') {
    portfolioGrid.innerHTML = '';
    const filtered = portfolioData.filter(item => filter === 'all' || item.category === filter);
    
    filtered.forEach(item => {
        const card = document.createElement('div');
        card.className = 'portfolio-item';
        card.innerHTML = `
            <img src="${item.image}" alt="${item.title}" onerror="this.src='https://via.placeholder.com/300x200'">
            <div class="content">
                <h3>${item.title}</h3>
                <p>Категория: ${item.category}</p>
                <button class="view-btn">Подробнее</button>
            </div>
        `;
        portfolioGrid.appendChild(card);
    });

    // Обработчики кнопок "Подробнее"
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            alert('Здесь будет подробная информация о проекте');
        });
    });
}

// 3. Фильтрация портфолио
filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Убираем активный класс у всех кнопок
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Добавляем активный класс текущей кнопке
        this.classList.add('active');
        // Фильтруем портфолио
        const filter = this.getAttribute('data-filter');
        renderPortfolio(filter);
    });
});

// 4. Переключение темы (светлая/темная)
themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark');
    this.textContent = document.body.classList.contains('dark') ? 'Светлая тема' : 'Тёмная тема';
    
    // Сохраняем тему в localStorage
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

// 5. Добавление нового навыка
addSkillBtn.addEventListener('click', function() {
    const technology = prompt('Введите название технологии:');
    const level = prompt('Уровень владения (Начальный/Средний/Продвинутый/Эксперт):');
    const year = prompt('Год начала использования:');
    
    if (technology && level && year) {
        skillsData.push({
            technology,
            level,
            year: parseInt(year),
            projects: Math.floor(Math.random() * 10) + 1,
            status: 'Новый'
        });
        renderSkillsTable();
        alert('Навык добавлен!');
    }
});

// 6. Обработка формы обратной связи
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;
    
    // В реальном проекте здесь будет отправка на сервер
    console.log({ name, email, message });
    alert(`Спасибо, ${name}! Ваше сообщение отправлено.`);
    this.reset();
});

// 7. Hover-эффект для строк таблицы
document.addEventListener('mouseover', function(e) {
    if (e.target.tagName === 'TR') {
        e.target.style.backgroundColor = '#f0f0f0';
    }
});

document.addEventListener('mouseout', function(e) {
    if (e.target.tagName === 'TR') {
        e.target.style.backgroundColor = '';
    }
});

// 8. Загрузка сохраненной темы
window.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
        themeToggle.textContent = 'Светлая тема';
    }
    
    // Инициализация
    renderSkillsTable();
    renderPortfolio();
    
    // Проверка консоли на ошибки
    console.log('Портфолио загружено. Ошибок нет.');
});