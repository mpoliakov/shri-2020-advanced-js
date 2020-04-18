/*
in, который игнорирует свойства прототипа
Написать прокси-объект, для которого оператор in вернет истину только в том случает, когда свойство находится в самом объекте, но не в его прототипе.
*/

const proto = { value: 42 };
const object = Object.create(proto);

Object.defineProperty(object, 'year', {
    value: 2020,
    writable: true,
    configurable: true,
    enumerable: false,
});

const symbol = Symbol('bazzinga');
object[symbol] = 42;

console.log('-----без прокси:-----')
console.log('value' in object); // true
console.log('year' in object); // true
console.log(symbol in object); // true

const proxy =  new Proxy(object, {
  has (trapTarget, key, value, receiver) {
    return object.hasOwnProperty(key);
  }
});

console.log('-----прокси:-----')
console.log('value' in proxy) // false
console.log('year' in proxy); // true
console.log(symbol in proxy); // true