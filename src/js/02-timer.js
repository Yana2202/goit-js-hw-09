import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const timerRef = document.querySelector('.timer');
const inputRef = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button[data-start]');

btnStart.disabled = true;

let time = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (selectedDates[0].getTime() < Date.now()) {
      Notify.failure('Please choose a date in the future');
      return;
    }
    btnStart.disabled = false;
    time = selectedDates[0];
    btnStart.addEventListener('click', () => {
      timer.start(timerRef, time);
    });
  },
};
flatpickr(inputRef, options);

const timer = {
  timerId: null,
  refs: {},

  start(rootSelector, deadline) {
    const delta = deadline.getTime() - Date.now();
    console.log(delta);

    this.getRefs(rootSelector);
    this.timerId = setInterval(() => {
      const ms = deadline.getTime() - Date.now();
      if (ms <= 1000) {
        clearInterval(this.timerId);
      }
      const data = this.convertMs(ms);
      Object.entries(data).forEach(([name, value]) => {
        this.refs[name].textContent = this.addLeadinZero(value);
      });
    }, 1000);
  },
  getRefs(rootSelector) {
    this.refs.days = rootSelector.querySelector('[data-days]');
    this.refs.hours = rootSelector.querySelector('[data-hours]');
    this.refs.minutes = rootSelector.querySelector('[data-minutes]');
    this.refs.seconds = rootSelector.querySelector('[data-seconds]');
  },

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    return { days, hours, minutes, seconds };
  },
  addLeadinZero(value) {
    return String(value).padStart(2, '0');
  },
};
