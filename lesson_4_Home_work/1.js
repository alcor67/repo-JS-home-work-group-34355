"use strict";

/**
 * Функция преобразует число в объект
 * @param {number} origNumber - число  в диапазоне [0, 999]
 * @returns {object}
 * единицы (в свойстве units)
 * десятки (в свойстве tens)
 * сотни (в свойстве hundereds)
 */

// Функция ввода числа
function inputNumber() {
  let npNumber = prompt('введите число от 0 до 999');
  return npNumber;
}

// Функция проверки на на условие выполнения преобразования
function getCondition(orNumber) {
  //console.log(String(orNumber).length);
  let numGigit = +orNumber;
  if (orNumber === undefined || String(orNumber).length == 0
    || orNumber.includes(' ') || !Number.isInteger(numGigit) || numGigit < 0
    || numGigit > 999) {
    console.log('Введено некорректное значение')
    return 'incorrect';
  }
  return numGigit;
}

// Функция преобразования числа в объект
function transfNumb() {
  let inpNumb = getCondition(inputNumber());
  if (inpNumb !== 'incorrect') {
    const objNumber = {};
    objNumber.units = inpNumb % 10;
    objNumber.tens = (inpNumb % 100 - objNumber.units) / 10;
    objNumber.hundereds = (inpNumb - objNumber.tens * 10 - objNumber.units) / 100;
    return objNumber;
  } return {};
}

console.log(transfNumb());
