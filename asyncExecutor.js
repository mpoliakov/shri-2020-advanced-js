/*
Написать функцию, которая позволит использовать внутри генератора асинхронные вызовы.
Реализация на Promise, async/await использовать запрещено.
*/

function asyncExecutor (Generator) {
  const generator = Generator();

  function resolveNext(result) {
    const step = generator.next(result);

    if (step.done) {
      return;
    }

    Promise.resolve(step.value)
      .then((res) => {
        resolveNext(res);
      })
      .catch((err) => {
        resolveNext(err);
      });
  }

  resolveNext();
}

// тесты
const ID = 42;
const delayMS = 1000;

function getId () {
  return new Promise((resolve) => {
      setTimeout(() => {
          resolve(ID);
      }, delayMS);
  });
}

function getDataById (id) {
  return new Promise((resolve, reject) => {
      setTimeout(() => {
          id === ID ? resolve('🍎') : reject('💥');
      }, delayMS);
  });
}

asyncExecutor(function* () {
  console.time("Time");

  const id = yield getId();
  const data = yield getDataById(id);
  console.log('Data', data);

  console.timeEnd("Time");
});
