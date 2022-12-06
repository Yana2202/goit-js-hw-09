import { Notify } from 'notiflix/build/notiflix-notify-aio';
const formRef = document.querySelector('.form');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
function onFormSubmit(event) {
  event.preventDefault();
  let {
    elements: { delay, amount, step },
  } = event.currentTarget;
  let elDelay = Number(delay.value);
  let elStep = Number(step.value);
  let elAmount = Number(amount.value);
  for (let position = 0; position <= elAmount; position += 1) {
    createPromise(position, elDelay)
      .then(({ position, delay }) => {
        console.log('success');
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log('error');
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    elDelay += elStep;
  }
  event.currentTarget.reset();
  console.log(elDelay);
  console.log(elStep);
  console.log(elAmount);
}

formRef.addEventListener('submit', onFormSubmit);
