import { isValidCardNumber } from './cardValidator.js';
import { initWidget } from './widget.js';

import './styles.css';

initWidget({
  containerSelector: '#payment-widget-container',
  onValidate: (number) => isValidCardNumber(number),
});