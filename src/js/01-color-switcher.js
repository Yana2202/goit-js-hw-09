const refs = {
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};
let interval = null;
refs.btnStop.setAttribute('disabled', true);
refs.btnStart.addEventListener('click', start);
refs.btnStop.addEventListener('click', stop);

function start() {
  refs.btnStart.setAttribute('disabled', true);
  refs.btnStop.removeAttribute('disabled');
  interval = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stop() {
  refs.btnStart.removeAttribute('disabled');
  refs.btnStop.setAttribute('disabled', true);
  clearInterval(interval);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
