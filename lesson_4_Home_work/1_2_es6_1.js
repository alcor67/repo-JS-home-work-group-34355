"use strict";

// создаем класс Post
class Post {
  constructor(author, text, dateAndTime) {
    this.author = author;
    this.text = text;
    this.dateAndTime = dateAndTime;
  }
  // создаем метод edit в прототипе объекта Post
  edit() {
    this.text = prompt('введите новый текст');
    // от себя добавил обновление даты и времени по заново вводимому тексту
    this.dateAndTime = new Date().toLocaleString();
  }
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

/*
создаем класс AttachedPost на основе на основе наследования из класса Post
с помощью extends Post прописываем свойства класса и методы в прототипе 
класса Post в класс AttachedPost
*/
class AttachedPost extends Post {
  constructor(author, text, dateAndTime) {
    /* 
    вызываем базовый класс super() - 
    это вызов базового конструктора у класса Post 
    и инициализация из него параметров
    файл записи вебинара 4 урок тайм код 2.01.50
    фактически аналог операции
    Post.call(this, author, text, dateAndTime);
    */
    super(author, text, dateAndTime);
    //создаваем свойство highlighted со значением false
    this.highlighted = false;
  }
  // создаем метод makeTextHighlighted в прототипе объекта AttachedPost
  makeTextHighlighted() {
    this.highlighted = true;
  }
}



const post_2 = new AttachedPost('Alex', 'Hi!', new Date().toLocaleString());
console.log(post_2);
post_2.edit();
console.log(post_2);
post_2.makeTextHighlighted();
console.log(post_2);
console.log(post_1.constructor);
console.log(post_2.constructor);