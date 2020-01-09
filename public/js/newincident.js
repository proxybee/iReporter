const basePath = "../";

const userToken = window.localStorage.getItem('userToken')
const briefButton = document.getElementById('irepButton')
const reportForm = document.getElementById('ireport-form')
    if (userToken) {
        briefButton.style.display = 'none';
        reportForm.style.display = 'block';
    }
    else {
        reportForm.style.display = 'none';
        briefButton.style.display = 'block';
        briefButton.addEventListener('click', () => {window.location.href = `${basePath}/sign-in.html`});
        }
        
 function newIncident(e) {
     e.preventDefault()

  const incidentData = {
    type: checker,
    subject: getValue (),
    comment: commentVal (),
    image: document.getElementById('vidim').value,
    video: document.getElementById('vidim').value,
    location: document.getElementById("result").placeholder,
    
  }
  
    fetch('https://ireporterafrica.herokuapp.com/api/v1/incidents', {
    method: "POST",
    body: JSON.stringify(incidentData),
    mode: 'cors',
    headers: {
        "Content-Type": 'Application/JSON',
        'x-access-token': `${userToken}`
    },
   // 'credentials': "same-origin"
   })
  .then((res) => {
    console.log('hhhhhhhhhhhhhhhhhhhhh', res)
    return res.json();
    })
  .then((r) => {
    console.log('hhhhhhhhhhhh', r)
    if(r.status == 201) {
        alert('Your iReport report has been posted')
        window.location.href = `${basePath}/userp.html`
  }
    else {
    document.getElementById('created').innerText = "An error occurred while trying to post incident"; 
    }
  })
  .catch(error => {
    console.log("error message", error)
  })
}

document.getElementById("submitIncident").addEventListener("submit", newIncident);

// Toggle between create red flag && intervene on Homepage
const redFlag = document.getElementById('redText');
const intervene = document.getElementById('intText');
const change = document.getElementById('defaultCheck1');
const change1 = document.getElementById('defaultCheck');
redFlag.style.display = 'none'
intervene.style.display = 'none'

commentVal = () => {
  if ( redFlag.style.display = 'block')
  return redText.value
  else{
    return intText.value
  }
}

change1.addEventListener('click', () => {
  change1.checked = true;
  change.checked = false;
  checker = change1.value
  redFlag.style.display = 'block';
  intervene.style.display = 'none';

});
change.addEventListener('click', () => {
    change.checked = true;
    change1.checked = false;
    checker = change.value
    intervene.style.display = 'block';
    redFlag.style.display = 'none';

});


const formControl = document.getElementById('icHolder');
const otherSelect = document.querySelector('option[value="other"]');
const otherText = document.getElementById("otherValue");
otherText.style.display = 'none';

formControl.addEventListener('click', () => {
  if(otherSelect.selected) {
    otherText.style.display = 'block';
    } else {
      otherText.style.display = 'none';
    }
});

function getValue() {
  if(otherSelect.selected) {
    return otherText.value
    } else {
      let s = document.getElementById("icHolder");
      selectedValue=s.options[s.selectedIndex].text
      return selectedValue
    }
}


// let sub = document.getElementById("icHolder");
// let subValue = sub.options.selected[i].value;
