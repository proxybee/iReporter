const basePath = "../";

const userToken = window.localStorage.getItem('userToken')
const briefButton = document.getElementById('irepButton')
const reportForm = document.getElementById('ireport-form')
    if (userToken) {
        briefButton.addEventListener('click', () => {window.location.href = `${basePath}addNew.html`})
    }
    else {
        briefButton.addEventListener('click', () => {window.location.href = `${basePath}sign-in.html`});
        }