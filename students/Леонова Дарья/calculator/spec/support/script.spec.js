const { calculate } = require('../../script');

describe('калькуляток, реализующий простейшие расчеты', () => {
    it('проверка на сложение', () => {
        const plus = calculate(5, '+', 5);
        expect(plus).toBe(10);
    });
    it('проверка на вычитание', () => {
        const plus = calculate(8, '-', 5);
        expect(plus).toBe(3);
    });
    it('проверка на умножение', () => {
        const plus = calculate(3, '*', 5);
        expect(plus).toBe(15);
    });
    it('проверка на деление', () => {
        const plus = calculate(10, '/', 5);
        expect(plus).toBe(2);
    });
    it('проверка на сложение отрицательных чисел', () => {
        const plus = calculate(-8, '+', 5);
        expect(plus).toBe(-3);
    });
    it('проверка на вычитание отрицательных чисел', () => {
        const plus = calculate(8, '-', -5);
        expect(plus).toBe(13);
    });
    it('проверка на умножение отрицательных чисел', () => {
        const plus = calculate(3, '*', -5);
        expect(plus).toBe(-15);
    });
    it('проверка на деление отрицалельных чисел', () => {
        const plus = calculate(10, '/', -5);
        expect(plus).toBe(-2);
    });
    it('проверка на сложение 2х отрицальных чисел', () => {
        const plus = calculate(-8, '+', -5);
        expect(plus).toBe(-13);
    });
    it('проверка на вычитание 2х отрицальных чисел', () => {
        const plus = calculate(-8, '-', -5);
        expect(plus).toBe(-3);
    });
    it('проверка на умножение 2х отрицальных чисел', () => {
        const plus = calculate(-3, '*', -5);
        expect(plus).toBe(15);
    });
    it('проверка на деление 2х отрицальных чисел', () => {
        const plus = calculate(-10, '/', -5);
        expect(plus).toBe(2);
    });
    it('проверка на строку', () => {
        const plus = calculate('text', '+', -5);
        expect(plus).toBeFalse;
    });
    it('проверка на null', () => {
        const plus = calculate(null, '+', -5);
        expect(plus).toBe(null);
    });
    it('проверка на undefined', () => {
        const plus = calculate(undefined, '+', -5);
        expect(plus).toBe(undefined);
    });
})