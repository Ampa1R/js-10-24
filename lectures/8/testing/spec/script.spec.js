const { pow } = require('../script.js');

describe('Функция pow', () => {
    it('должна возвращать 16 при аргументах 4 и 2', () => {
        const result = pow(4, 2);
        expect(result).toBe(16);
    });
    it('должна возвращать 9 при аргументах 3 и 2', () => {
        const result = pow(3, 2);
        expect(result).toBe(9);
    });

    it('должна возвращать 4 при аргументах 2 и 2', () => {
        const result = pow(2, 2);
        expect(result).toBe(4);
    });

    it('должна возвращать null при аргументах null и 2', () => {
        const result = pow(null, 2);
        expect(result).toBeNull();
    });

    it('должна возвращать null при аргументах 2 и null', () => {
        const result = pow(2, null);
        expect(result).toBeNull();
    });
});
