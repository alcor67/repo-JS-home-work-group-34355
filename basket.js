'use strict'

// получаем из index.html элемент (где иконка корзины)
// с классом cartIconWrap тэгом span и обзываем basketCountEl
const basketCounterEl = document.querySelector('.cartIconWrap span');
// получаем элемент с классом basketTotalValue (общая цена товаров в корзине)
// и обзываем basketTotalValueEl
const basketTotalValueEl = document.querySelector('.basketTotalValue');
// получаем элемент с классом basket (корзина)
// и обзываем basketEl
const basketEl = document.querySelector('.basket');
//получаем элемент с классом basketTotal (Tоваров в корзине на сумму)
//сверху которого на экране или что то же самое перед которым в html коде
//надо расположить вывод информации по товарам в корзине
// ключ beforebegin в команде значит перед открывающим тэгом элемента element
//element.insertAdjacentHTML("beforebegin", 'текст который надо вставить'))
//и обзываем basketTotalEl
const basketTotalEl = document.querySelector('.basketTotal');

// добавим действие по клику на корзине (элемент с классом cartIconWrap)
document.querySelector('.cartIconWrap').addEventListener('click', () => {
  // на элементе basketEl применяем к списку его классов
  // метод toggle (инверсия наличия класса - если класс есть, то он уберется,
  // если нет, то появится)
  // поскольку используем метод classList то класс указываем без точки
  basketEl.classList.toggle('hidden');
});

//для хранения в скрипте информации о товарах для начала создаем пустой объект
const basket = {};

/*
поскольку все товары хранятся в общем контейнере featuredItems это по отношению
к товарам родительский объект, вешаем на него обработчик событий
делегирование событий, ага и ловим событие на всплытии (это по умолчанию)
и проверяем, что кликнули на кнопке Add to Cart
Для этого в index.html добавляем к кнопке для добавления товаров 
с текстом Add to Cart класс addToCart
и далее в скрипте вместо метода classList.contains - 
event.target.classList.contains('addToCart')
применяем метод closest - 
event.target.closest('.addToCart')
на предмет проверки наличия класса addToCart у него или
у его ближайшего родителя (проверяются все родители вверх по иерархии) 
(<div class="featuredImgDark"> и выше по иерархии)
для того, чтобы по клике на самой картинке с иконкой корзины 
(<img src="images/cart.svg" alt="">)
тоже срабатывал обработчик события
*/
document.querySelector('.featuredItems').addEventListener('click', (event) => {
  if (event.target.closest('.addToCart')) {
    //console.log(123); // проверка кликера
    /*
    обзываем featuredItem тот элемент у которого самого или у его 
    ближайшего родителя наличествует класс featuredItem
    в нашем случае это будет div - блочный элемент html страницы,
    содержащий все элементы/данные товара, на который был клик
    например элемент первого товара
    <div class="featuredItem" data-id="1" data-name="ELLERY X M'O CAPSULE" 
    data-price="52"> ... </div>
    */
    const featuredItem = event.target.closest('.featuredItem');
    //и из этого элемента достаем нужные нам данные через дата-атрибуты
    const id = +featuredItem.dataset.id; //(+ это превращаем в число)
    const name = featuredItem.dataset.name;
    const price = +featuredItem.dataset.price;//(+ это превращаем в число)
    //console.log(id, name, price); // проверка что выводится то что нужно
    //добавляем в корзину через написанную нами функцию addToBasket
    addToBasket(id, name, price)
  }
});

function addToBasket(id, name, price) {
  //условие, если такого id в basket не существует, тогда создаем новый
  if (!(id in basket)) {
    //у нас был создан пустой объект const basket = {}; и теперь его заполняем
    basket[id] = {
      id: id, // (наименование свойства- id): (значение свойства)
      name: name, // (наименование свойства- name): (значение свойства)
      price: price, // (наименование свойства- price): (значение свойства)
      count: 0, // (наименование свойства- count ): (значение свойства- 0)
    };
    /*
    второй вариант создания объекта
    basket[id] = {id, name, price, count: 0}; где свойства объекта имеют
    те же наименования (кроме count), что и параметры в функции addToBasket 
    а значения этих свойств равны передаваемым в функцию аргументам 
    (кроме count там значание присваивается внутри функции)
    */
  }
  //если существует, то к count прибавляем 1
  basket[id].count++;
  //указываем,количество купленных товаров, т.е. по всем объектам
  //суммируем count
  basketCounterEl.textContent = getTotalBasketCount();
  //console.log(basketCounterEl.textContent);
  //вывод общей суммы товаров в корзине два знака после запятой toFixed(2)
  basketTotalValueEl.textContent = getTotalBasketPrice().toFixed(2);
  //выводим отображение товара
  renderProductInBasket(id);

}

//создаем функцию возвращающую общее количество купленных товаров
function getTotalBasketCount() {

  //примечание: это код функции в таком виде для учебных целей
  //получаем в виде массива все перечисляемые свойства объекта basket
  //т.е. получаем массив объектов, где каждый элемент массива это объект
  //который содержит все перечисляемые свойства исходного объекта basket
  //https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/values
  //console.log(Object.values(basket));
  //console.dir(basket);
  const dimensBasket = Object.values(basket);
  //и фишка в том, что из basket в массив dimensBasket
  //прилетают не только значания, а именно объекты
  //console.log(dimensBasket);
  /*
  (2) [{…}, {…}]
  0: {id: 1, name: "ELLERY X M'O CAPSULE", price: 52, count: 2}
  1: {id: 2, name: 'ELLERY X', price: 40, count: 1}
  length: 2
  */

  /*
используем метод для массивов reduce для полученния из массива dimensBasket
сумму по значениям параметра .count и записываем ее в redusDimensBasket
Метод reduce() выполняет заданную функцию к каждому элементу массива 
и возвращает «аккумулированный» результат
https://web-dev.guru/javascript/reduce-js-kak-rabotaet-i-kogda-ego-nuzhno-primenjat/
к total прибавляем product.count, которое берется из значения 
свойства (.count) объекта basket 
(теперь это массив dimensBasket, у которого
в элементе массива присутствует 'count: "значение"', и это "значение"
надо вытащить) 
и считаться аккумулятор total будет начиная с 0

здесь как product обзываем элемент (который сам является объектом) 
массива dimensBasket и значение его перечисляемого свойства 
.count (это количество единиц товара по конкретному товару) 
суммируем в аккумулятор total перебирая
все элементы в массиве dimensBasket по этому свойству .count
*/
  const redusDimensBasket = dimensBasket.reduce((total, product) => {
    total += product.count;
    //возвращаем из внутренней анонимной функции 
    //счетчик количества товаров total
    return total;
  }, 0);
  //возвращаем из внешней функции getTotalBasketCount счетчик количества товаров
  //который теперь redusDimensBasket
  return redusDimensBasket;
  /*
  более общая сборка без дополнительных внутренних переменных функции
  return Object.values(basket).reduce((total, product) => {
    total += product.count;
    return total;
  }, 0);
  */
  /*
  можно записать и так
  return Object.values(basket)
  .reduce((total, product) => total + product.count, 0);
*/
  /*
    вариант через цикл for
    const productsArr = Object.values(basket);
    let count = 0;
    здесь перебираем значения
    for (const product of productsArr) {
      count += product.count;
    }
    return count;
  }
  */
}

//функция вывода общей стоимости товаров в корзине
function getTotalBasketPrice() {
  /*
  берем все объекты по товарам Object.values(basket) (это массив объектов
  перечисляемых свойств исходного объекта basket)
  по рассмотренной выше аналогии применяем метод reduce,
  вытаскивая значения .price и .count из массива Object.values(basket)
  product.price - цена на товар
  product.count - количество единиц товара
  и пробегаемся по всему массиву Object.values(basket), 
  полученному на основе объекта basket методом Object.values 
  суммируя все в аккумулятор total
  */
  return Object.values(basket)
    .reduce((total, product) => total + product.price * product.count, 0);
}

//создаем функцию вывода отображение товара в корзине
function renderProductInBasket(id) {
  //проверка на предмет наличия этого продукта в корзине
  //получаем элемент basketRowEl из элемента корзина basketEl
  //с классом basketRow с атрибутом data-productId

  const basketRowEl = basketEl
    .querySelector(`.basketRow[data-productId="${id}"]`);
  //если этот элемент не находим, то  используем функцию renderNewProductInBask
  //с помощью которой отображаем продукт с помощью вставка html разметки
  if (!basketRowEl) {
    renderNewProductInBasket(id);
    return;
  }

  /*
  модифицируем данные для html разметки по товарам в корзине
  записываем в basketRowEl в элементе с классом productCount
  в текстовку содержимое элемента basket[id].count
  */
  //console.log(basket[id].count);
  //console.log(basketRowEl);
  basketRowEl.querySelector('.productCount').textContent = basket[id].count;
  /*
  и в элемент с классом productTotalRow в текстовку произведение
  (basket[id].price * basket[id].count).toFixed(2) с округлением до 
  2-х знаков после запятой
  */
  basketRowEl.querySelector('.productTotalRow').
    textContent = (basket[id].price * basket[id].count).toFixed(2);

  //иначе не используем функцию renderNewProductInBask 
}

//создаем функцию для html разметки отображение товара в корзине
function renderNewProductInBasket(productId) {
  const productRow = `
    <div class="basketRow" data-productId="${productId}">
      <div>${basket[productId].name}</div>
      <div>
        <span class="productCount">${basket[productId].count}</span> шт.
      </div>
      <div>$${basket[productId].price}</div>
      <div>
        $<span class="productTotalRow">${(basket[productId].price * basket[productId].count).toFixed(2)}</span>
      </div>
    </div>
    `;
  /*
  insertAdjacentHTML() разбирает указанный текст как HTML или XML и вставляет 
  полученные узлы (nodes) в DOM дерево в указанную позицию. Данная функция не 
  переписывает имеющиеся элементы, что предотвращает дополнительную сериализацию
  и поэтому работает быстрее, чем манипуляции с innerHTML.
  'beforebegin': до самого element (до открывающего тега).
  */

  basketTotalEl.insertAdjacentHTML("beforebegin", productRow);
}