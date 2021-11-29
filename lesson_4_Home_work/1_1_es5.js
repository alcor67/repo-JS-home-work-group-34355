"use strict";
// создаем функцию конструктор
function Product(name, price) {
  this.name = name;
  this.price = price;
}

/* 
отдельно создаем метод make25PercentDiscount
который будет находиться не в свойствах а в прототипе объекта*/
Product.prototype.make25PercentDiscount = function () {
  this.price *= .75;
}

/*
с посмощью функции конструктора Product с добаленным в него методом 
make25PercentDiscount создаем объект prod_1 и передаем в него 
параметры Toyota и 10000 которые станут значением таких свойств 
объекта, как prod_1.name и prod_1.price
*/
const prod_1 = new Product('Toyota', 10000);
console.log(prod_1);
/* 
применяем к объекту prod_1 метод make25PercentDiscount()
который добавлен дополнительно в прототип конструктора Product
и выводим свойство объекта price в консоль
*/
prod_1.make25PercentDiscount();
console.log(prod_1.price);
console.log(prod_1.constructor);