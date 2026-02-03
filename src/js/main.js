/* menu */
const menuBtn = document.querySelector('.burger');
const menu = document.querySelector('.menu');

menuBtn.addEventListener('click', () => {
    menu.classList.toggle('show');
});

/* format:
        "code": "dt084g",
        "coursename": "Introduktion till programmering i JavaScript",
        "progression": "A",
        "syllabus": "https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT084G/"
 */

let data = [];
let ascending = true;

/* get data */
async function getData() {
    try {
        const response = await fetch('https://webbutveckling.miun.se/files/ramschema.json');
        if (!response.ok) {
            throw new Error('Response inte ok!');
        }

        data = await response.json();

        render(data);

    } catch (error) {
        console.error('Error:', error);
        alert('Kunde inte ladda in data');
    }
}

/* place data */
function render(rows) {

    const tbody = document.querySelector('tbody');

    tbody.innerHTML = '';

    rows.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td><a target="_blank" href="${row.syllabus}">${row.code}</a></td><td>${row.coursename}</td><td>${row.progression}</td>`;
        tbody.appendChild(tr);
    });
}

/* handle sorting */
function sortRows(th) {

  ascending = !ascending;

  let index = th.dataset.idx;

  const headers = document.querySelectorAll('th');

  headers.forEach(th => {
    th.classList.remove('sorted');
  });
  
  th.classList.add('sorted');

  data.sort((a, b) => {
    let A = Object.values(a)[index].toLowerCase();
    let B = Object.values(b)[index].toLowerCase();

    return ascending ? A.localeCompare(B) : B.localeCompare(A);
  });

  render(data);
}

/* handle filtering */

// start when dom read
window.addEventListener('DOMContentLoaded', getData);

// listen for clicks on th
const headers = document.querySelectorAll('th');
headers.forEach(th => {
  th.addEventListener('click', () => sortRows(th));
});