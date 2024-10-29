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

function showSlide(slideIndex) {
    // Перевіряємо, що індекс не виходить за межі
    if (slideIndex >= slides.length) {
        currentSlide = 0; // Повертаємось до першого слайда
    } else if (slideIndex < 0) {
        currentSlide = slides.length - 1; // Повертаємось до останнього слайда
    } else {
        currentSlide = slideIndex;
    }

    // Рахуємо ширину слайдера і зсуваємо всі зображення
    const slideWidth = slides[0].clientWidth;
    document.querySelector('.slides').style.transform = `translateX(-${slideWidth * currentSlide}px)`;
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

// document.addEventListener('DOMContentLoaded', function() {
//     const form = document.getElementById('orderForm');
    
//     form.addEventListener('submit', function(event) {
//         event.preventDefault();
//         window.location.href = 'confirmation.html';
//     });
    
// });

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

// document.addEventListener('DOMContentLoaded', function() {
    const addProductCheckbox = document.getElementById('add-optical-sight');
    const discountedPriceElement = document.querySelector('.discounted-price');
    const originalPrice = 5899; // Original price of the main product
    const additionalProductPrice = 900; // Price of the optical sight
    let totalPrice = 5899;
    let additionalValue = ' - ';



    addProductCheckbox.addEventListener('change', function() {
        totalPrice = originalPrice;
        if (this.checked) {
            additionalValue = ' + '
            totalPrice += additionalProductPrice;
        }
        // Update the price displayed in the main order section
        // You'll need to add an id or class to the main price element to select it here
        document.querySelector('.order-price__new2 .price-value').textContent = totalPrice + 'грн';
    });
// });

const TOKEN = "7872932457:AAGFCkJlFRBvKav1uA8zfiKRd1bKMf9TETk";
const CHAT_ID = "1067816217";
const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
const success = document.getElementById('success');

document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const nameField = this.name;
    const phoneField = this.phone;
    const priceField = totalPrice
    const optValue = additionalValue

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

    const message = `<b>Дай Боже вуйко! Замовлення прийшло!!!</b>\n` +
                    `<b>Замовник: </b> ${nameField.value}\n` +
                    `<b>Номер: </b> ${phoneField.value}\n` +
                    `<b>Оптичний приціл: </b> ${optValue}\n` +
                    `<b>Ціна: </b> ${priceField} грн`; 

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
document.addEventListener('DOMContentLoaded', function() {
    const checkbox = document.getElementById('add-optical-sight');
    const checkmark = checkbox.nextElementSibling;
    
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            checkmark.style.animation = 'none';
            setTimeout(() => {
                checkmark.style.animation = 'checkmark 0.3s ease-in-out';
            }, 10);
        }
    });
});
