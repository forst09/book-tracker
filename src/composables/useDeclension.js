export function useDeclension(number, forms) {
    // склонение существительных
    // forms - массив с формами существительного [единственное число, форма для чисел, оканчиваюшихся на 2-4, форма для остальных случаев]

    const lastDigit = number % 10;
    const lastTwoDigits = number % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
        return forms[2];
    }

    if (lastDigit === 1) {
        return forms[0];
    }

    if (lastDigit >= 2 && lastDigit <= 4) {
        return forms[1];
    }

    return forms[2];
}