let options = document.getElementById('icOptions');
//link
//let icLink = document.getElementById('iclist');

document.getElementById('iclist').addEventListener('click', displayOptions);
console.log("wle", options);

function displayOptions(e) {
    e.preventDefault();
    options.classList.toggle('active');

    document.getElementById('icHolder').innerHTML = value;
    
    };