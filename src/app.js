import 'jquery';
import SmoothScroll from 'smooth-scroll';
// import 'magnific-popup/dist/jquery.magnific-popup.js';
import 'jquery.maskedinput/src/jquery.maskedinput';

import './modules/calc/calc';

$('input[type="tel"]').mask("+7 (999) 999-99-99");
new SmoothScroll('a[href*="#"]');
