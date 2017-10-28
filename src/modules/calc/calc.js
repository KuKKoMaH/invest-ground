import 'ion-rangeslider';

const yearEnd = ['год', 'года', 'лет'];
const monthEnd = ['месяц', 'месяца', 'месяцев'];

const $summ = $('#summ');
const $time = $('#time');
const $summSlider = $("#summ-slider");
const $timeSlider = $("#time-slider");
const $total = $('#total');

const declOfNum = ( number, titles ) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
};

const formatPrice = ( value ) => {
  if (value >= 1000000) return Math.floor(value / 1000) / 1000 + ' млн. руб.';
  return Math.round(value / 1000) + ' тыс. руб.';
};

const formatTime = ( value ) => {
  const years = Math.floor(value / 12);
  const months = value % 12;
  let res = '';
  if (years) res += years + ' ' + declOfNum(years, yearEnd) + ' ';
  if (months) res += months + ' ' + declOfNum(months, monthEnd);
  return res;

  if (value >= 1000000) return Math.floor(value / 1000) / 1000 + ' млн. руб.';
  return Math.round(value / 1000) + ' тыс. руб.';
};

const update = ( sel, value ) => {
  if (sel && value) sel.html(value);
  if (!timeSlider || !summSlider) return;
  const percent = 0.0577;
  const summ = summSlider.result.from;
  const time = timeSlider.result.from;
  const total = Math.floor((summ + summ * time * percent) / time);
  $total.html(total);
};

$summSlider.ionRangeSlider({
  hide_from_to: true,
  hide_min_max: true,
  grid:         true,
  grid_snap:    true,
  force_edges:  true,
  prettify:     formatPrice,
  onStart:      ( value ) => update($summ, formatPrice(value.from)),
  onChange:     ( value ) => update($summ, formatPrice(value.from)),
});

$timeSlider.ionRangeSlider({
  hide_from_to: true,
  hide_min_max: true,
  grid:         true,
  force_edges:  true,
  grid_num:     1,
  prettify:     formatTime,
  onStart:      ( value ) => update($time, formatTime(value.from)),
  onChange:     ( value ) => update($time, formatTime(value.from)),
});

const summSlider = $summSlider.data("ionRangeSlider");
const timeSlider = $timeSlider.data("ionRangeSlider");
update();