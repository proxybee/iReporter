const basePath = "../";

const userToken = window.localStorage.getItem("userToken");
  if(!userToken) {
    window.location.href = `${basePath}sign-in.html`
  } 
        
 function newIncident(e) {
     e.preventDefault()

  const incidentData = {
    type: checker,
    subject: getValue (),
    comment: commentVal (),
    image: the_return.value,
    video: the_return.value,
    location: document.getElementById("result").placeholder,
    
  }
   
    fetch(`https://ireporterafrica.herokuapp.com/api/v1/incidents`, {
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
    console.log(res)
    return res.json();
    })
  .then((r) => {
    if (r.error && r.error.expiredAt < Date.now()) {
      localStorage.clear()
      window.location.href = `${basePath}sign-in.html`;
    };
    if (r.error && r.success === false) {
      window.location.href = `${basePath}index.html`;
    };
    if(r.status == 201) {
        alert('Your iReport report has been posted')
        window.location.href = `${basePath}dashboardu.html`
  }
    else {
    document.getElementById('created').innerText = "An error occurred while trying to post incident"; 
    }
  })
  .catch(error => {
    console.log("error message", error)
  })
}

// function resetForm() {
//   getValue () = "";
//   commentVal () = "";
//   the_return.value = "",
//   the_return.value = "",
//   document.getElementById("result").placeholder = "",
//   checker = false;
// }

// function incidentFormSubmit() {
//   newIncident
//   resetForm();
// }

document.getElementById("submitIncident").addEventListener("submit", newIncident);

// Toggle between create red flag && intervene on Homepage
const redFlag = document.getElementById('redText');
const intervene = document.getElementById('intText');
const redFlagh = document.getElementById('redf')
const interveneh = document.getElementById('interv');
const change = document.getElementById('defaultCheck1');
const change1 = document.getElementById('defaultCheck');
redFlagh.style.display = 'none'
interveneh.style.display = 'none'

//console.log(redText.value, intText.value, 'fffffffffffffffffffff')

commentVal = () => {
  if ( redFlagh.style.display = 'block')
  return redText.value
  else{
    return intText.value
  }
}

change1.addEventListener('click', () => {
  change1.checked = true;
  change.checked = false;
  checker = change1.value
  redFlagh.style.display = 'block';
  interveneh.style.display = 'none';

});
change.addEventListener('click', () => {
    change.checked = true;
    change1.checked = false;
    checker = change.value
    interveneh.style.display = 'block';
    redFlagh.style.display = 'none';

});


const formControl = document.getElementById('icHolder');
const otherSelect = document.querySelector('option[value="other"]');
const otherText = document.getElementById("otherValue");
const otherTexth = document.getElementById("otherh");
otherTexth.style.display = 'none';

formControl.addEventListener('click', () => {
  if(otherSelect.selected) {
    otherTexth.style.display = 'block';
    } 
    else {
      otherTexth.style.display = 'none';
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
