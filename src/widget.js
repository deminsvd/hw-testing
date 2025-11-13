import { getCardType } from './cardValidator.js';

function highlightIcon(cardType) {
  const icons = document.querySelectorAll('.payment-icons img');
  
  icons.forEach(icon => {
    const altText = icon.alt.toLowerCase();
    if ((cardType.toLowerCase() == altText) )
    {
      icon.classList.add('active');
    } else {
      icon.classList.remove('active');
    }
  });
}

export function initWidget({ containerSelector, onValidate }) {
  const container = document.querySelector(containerSelector);
  
  // Создаем внутренний HTML
  container.innerHTML = `
    <div class="payment-icons">
      <img src="https://img.icons8.com/?size=96&id=Slz3MCvA7kOv&format=png" alt="Мир" />
      <img src="https://cdn-icons-png.flaticon.com/128/196/196578.png" alt="Visa" />
      <img src="https://cdn.iconscout.com/icon/free/png-512/free-mastercard-logo-icon-svg-download-png-675722.png?f=webp&w=256" alt="MasterCard" />
      <img src="https://cdn-icons-png.flaticon.com/128/179/179431.png" alt="American Express" />
      <img src="https://cdn-icons-png.flaticon.com/128/349/349230.png" alt="Discover" />
    </div>
    <div class="card-input">
      <input type="text" placeholder="Введите номер карты" id="cardNumber" />
      <button id="validateBtn">Валидировать</button>
    </div>
    <div class="validation-result" id="validationResult"></div>
  `;

  const input = container.querySelector('#cardNumber');
  const btn = container.querySelector('#validateBtn');
  const resultDiv = container.querySelector('#validationResult');

  // Обработчик для подсветки при вводе номера
  input.addEventListener('input', () => {
    const number = input.value.trim();
    const type = getCardType(number);
    highlightIcon(type);
  });

  btn.addEventListener('click', () => {
    const number = input.value.trim();
    const isValid = onValidate(number);
    const type = getCardType(number);
    
    if (isValid) {
      resultDiv.innerHTML = `✅ Карта валидна.<br/>Платёжная система: <strong>${type}</strong>.`;
      resultDiv.style.color = 'green';
    } else {
      resultDiv.innerHTML = `❌ Неверный номер карты или невалидная карта.`;
      resultDiv.style.color = 'red';
    }
    // Можно оставить подсветку активной, чтобы было видно
    highlightIcon(type);
  });
}