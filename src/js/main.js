/* menu */
const menuBtn = document.querySelector('.burger');
const menu = document.querySelector('.menu');

menuBtn.addEventListener('click', () => {
  menu.classList.toggle('show');
});