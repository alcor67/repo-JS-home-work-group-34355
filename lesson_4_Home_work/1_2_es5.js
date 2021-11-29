"use strict";

// создаем функцию конструктор Post
function Post(author, text, dateAndTime) {
  this.author = author;
  this.text = text;
  this.dateAndTime = dateAndTime;

}

// создаем метод edit в пртотипе объекта Post
Post.prototype.edit = function () {
  this.text = prompt('введите новый текст');
  // от себя добавил обновление даты и времени по заново вводимому тексту
  this.dateAndTime = new Date().toLocaleString();
}

/*
при создании объекта получим текущую дату и время командой 
new Date().toLocaleString()
https://itchief.ru/javascript/date
*/
const post_1 = new Post('Alice', 'Hello!', new Date().toLocaleString());
console.log(post_1);
post_1.edit();
console.log(post_1);

// создаем функцию конструктор AttachedPost
function AttachedPost(author, text, dateAndTime) {
  /* 
  вызываем функцию Post и инициализируем из нее параметры
  файл записи вебинара 4 урок тайм код 1.20.24
  */
  Post.call(this, author, text, dateAndTime);
  //создаваем свойство highlighted со значением false
  this.highlighted = false;
  // создаем метод makeTextHighlighted в прототипе объекта AttachedPost
  AttachedPost.prototype.makeTextHighlighted = function () {
    this.highlighted = true;
  }
}

/* 
Наследуем методы из prototype Post при этом удаляется из корневого prototype 
исходный конструктор из AttachedPost. Причем это наследование надо делать не 
в самой функии конструкторе AttachedPost, а после, снаружи, иначе 
наследованная из prototype конструктора Post функция edit не опознается как 
функция и у меня выпала ошибка 
Uncaught TypeError: post_2.edit is not a function
файл записи вебинара 4 урок тайм код 1.38.35 и 1.40.00
Object.create создает/create пустой объект AttachedPost.prototype и
прототипом в этом объекте будет Post.prototype
и получим такую штуку
{
  __proto__: Post.prototype
}
Здесь, кстати, на мой взгляд любопытная штука.
Ведь сначала у нас в прототипе был метод
AttachedPost.prototype.makeTextHighlighted,
а потом мы типа перезаписали объект AttachedPost.prototype
информацией из Post.prototype, но этот метод остался.
Получается, что метод constructor затирается, а метод
makeTextHighlighted не затирается.
*/
AttachedPost.prototype = Object.create(Post.prototype);
/* 
возвращаем этот конструктор в AttachedPost который должен быть по правилам 
хорошего тона в корневом прототипе (который на самом верхнем уровне), чтобы 
и у дочерних объектов в корневом прототипе тоже был указан конструктор,
который является свойством, ссылающимся на порождающий этот объект функцию 
конструктор (прям фраза с вэбинара тайм код 51.50)
*/
AttachedPost.prototype.constructor = AttachedPost;

const post_2 = new AttachedPost('Alex', 'Hi!', new Date().toLocaleString());
console.log(post_2);
post_2.edit();
console.log(post_2);
post_2.makeTextHighlighted();
console.log(post_2);
console.log(post_1.constructor);
console.log(post_2.constructor);