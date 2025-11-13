import { getCardType} from '../cardValidator.js';
import { isValidCardNumber } from '../cardValidator.js';

test('Определяет Visa', () => {
      expect(getCardType('4111111111111111')).toBe('Visa');
    });
test('Определяет MasterCard', () => {
      expect(getCardType('5555555555554444')).toBe('MasterCard');
    });

test('Определяет American Express', () => {
    expect(getCardType('378282246310005')).toBe('American Express');
});

test('Определяет Discover', () => {
    expect(getCardType('6011111111111117')).toBe('Discover');
});

test('Определяет Мир', () => {
    expect(getCardType('2204111111111117')).toBe('Мир');
});

test('Возвращает Unknown для неизвестных карт', () => {
    expect(getCardType('1234567890')).toBe('Unknown');
});

test('Проверяет валидный номер Visa', () => {
    expect(isValidCardNumber('4111111111111111')).toBe(true);
});
    
test('Проверяет невалидный номер', () => {
    expect(isValidCardNumber('4111111111111112')).toBe(false);
});

test('Проверка короткого номера', () => {
    expect(isValidCardNumber('1234')).toBe(false);
});

test('Проверка с ошибочной длиной', () => {
    expect(isValidCardNumber('4111111111111')).toBe(false);
});