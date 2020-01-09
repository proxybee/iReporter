// Function for dashboard switch display
const homea = document.getElementById('homea');


const flag = document.getElementById('flaga');


const interv = document.getElementById('interva');


const settings = document.getElementById('settingsa');

const clhome = document.getElementById('clhome');


const clflag = document.getElementById('clflag');


const clinterv = document.getElementById('clinterv');


const clset = document.getElementById('clset');

homea.style.display = 'none',
flag.style.display = 'none',
interv.style.display = 'none',
settings.style.display = 'none';

const admbuttons = [clhome, clflag, clinterv, clset];
const actions = [homea, flag, interv, settings];

admbuttons.forEach((b, i) => {
  b.addEventListener('click', (e) => {
    // prevent button's default action
    e.preventDefault();
    actions.forEach((a, index) => {
      if (i == index) {
        actions[index].style.display = 'block';
      } else {
        actions[index].style.display = 'none';
      }
    });
  });
});
