//(ТАЙМЕР)
// Встановлюємо час на 4 години в мілісекундах 

let timeLeft = 3 * 60 * 60 * 1000; // 3 години
// Оновлюємо таймер кожну секунду
const timerInterval = setInterval(updateTimer, 1000);
// Функція для оновлення таймера
function updateTimer() {
    // Обчислюємо години, хвилини та секунди
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    // Оновлюємо текст на сторінці
    document.getElementById("hours").innerText = String(hours).padStart(2, '0');
    document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
    document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');

    // Зменшуємо залишок часу
    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        document.getElementById("countdown").innerText = "Час вийшов!";
    } else {
        timeLeft -= 1000; // Зменшуємо на 1 секунду (1000 мс)
    }
}


document.getElementById('scrollButton').addEventListener('click', function() {
    document.getElementById('orderForm').scrollIntoView({
        behavior: 'smooth' // Плавний скрол
    });
});

                                        // СЛАЙДЕР
let currentSlide = 0;
const slides = document.querySelectorAll('.slides img');
const slidesContainer = document.querySelector('.slides');

function showSlide(slideIndex) {
    currentSlide = (slideIndex + slides.length) % slides.length;
    const slideWidth = slides[0].clientWidth;
    slidesContainer.style.transform = `translateX(-${slideWidth * currentSlide}px)`;
}

function moveSlide(direction) {
    showSlide(currentSlide + direction);
}

// Показуємо перший слайд при завантаженні сторінки
showSlide(0);



document.addEventListener('DOMContentLoaded', function() {
    const reviewCards = document.querySelectorAll('.review-card');

    reviewCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.15)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 50px rgba(0,0,0,0.1)';
        });
    });
});


document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        // Page is visible, reinitialize any necessary state
        console.log('Page is visible');
    }
});

if ('onfreeze' in document) {
    document.addEventListener('freeze', function() {
        // Page is being frozen (moved to bfcache)
        console.log('Page is being frozen');
    });

    document.addEventListener('resume', function() {
        // Page is being resumed from bfcache
        console.log('Page is being resumed');
    });
}

const TOKEN = "7872932457:AAGFCkJlFRBvKav1uA8zfiKRd1bKMf9TETk";
const CHAT_ID = "-4587915644";
const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
const success = document.getElementById('success');

document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const nameField = this.name;
    const phoneField = this.phone;

    const namePattern = /^[A-Za-zА-Яа-яЁёІіЇїЄє\s]+$/;
    const phonePattern = /^(\+?380|0)\d{9}$/;

    // Validate fields
    if (!namePattern.test(nameField.value)) {
        alert('Будь ласка, введіть тільки букви в полі "Імя".');
        return;
    }

    if (!phonePattern.test(phoneField.value)) {
        alert('Будь ласка, введіть номер тел. у форматі "0XXXXXXXXX".');
        return;
    }

    const message = `<b>Замовлення BEEMAN</b>\n` +
                    `----------------------\n` +
                    `<b>Замовник: </b> ${nameField.value}\n` +
                    `<b>Номер: </b> ${phoneField.value}\n` 

    // Send request using fetch
    fetch(URI_API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            parse_mode: 'html',
            text: message
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Message sent:', data);
        nameField.value = "";
        phoneField.value = "";
        
        window.location.href = "confirmation.html";
    })
    .catch(error => {
        console.warn('Error:', error);
    })
    .finally(() => {
        console.log("The end");
    });
});

