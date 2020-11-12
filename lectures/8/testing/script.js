const pow = (a, x) => {
    if (a === null || x === null) {
        return null;
    }

    let res = 1;

    for (let i = 0; i < x; i++) {
        res *= a;
    }

    return res;
};

module.exports = {
    pow,
};


// Виды тестов: 
// - Ручное
// - Статические - IDE, ESLint, Prettier, Stylelint
// - Модульные (unit) - тестирование функций, классов
// - Интеграционные - связь нескольких модулей
// - Сквозное, E2E (end-to-end) - проверка кейсов от начала до конца

