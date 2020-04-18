/*
allKeysAndSymbols
Написать функцию, которая принимает объект и возвращает все свойства и символы как в самом объекте, так и во всей его цепочке прототипов.
*/

function allKeysAndSymbols (object) {
  if (object === null) {
    return [];
  }

  return [
    ...Object.getOwnPropertyNames(object),
    ...Object.getOwnPropertySymbols(object),
    ...allKeysAndSymbols(object.__proto__)
  ].filter(i => i !== '__proto__');
}

const Person = function(firstName, lastName, birthDate) {
  this.firstName = firstName;
  this.lastName = lastName;
  this[Symbol('birthDate')] = birthDate;
}

Person.prototype.getFullName = function() {
  return `${this.firstName} ${this.lastName}`;
}

const elon = new Person('Elon', 'Musk', new Date(1971, 6, 28));

console.table(allKeysAndSymbols(elon));

