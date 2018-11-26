let options = document.getElementById('icOptions');

//link
//let icLink = document.getElementById('iclist');

document.getElementById('iclist').addEventListener('click', displayOptions);
console.log('asds', options.innerText)

function displayOptions(e) {
    e.preventDefault();
    let value = options.innerText;
    let select = options.classList.toggle('active');
  
    iclist.innerHTML = select.value;
    //iclist.innerHTML = appendSelection('active').innerText;
        
    };