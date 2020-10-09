const basePath = "../";

function newContact(e) {
    e.preventDefault()
const contactData = {
    firstname: document.getElementById("fname").value,
    lastname: document.getElementById("lname").value,
    email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value    
  }
 
  // http://localhost:4020
    fetch('https://ireporterafrica.herokuapp.com/api/v1/contact', {
    method: "POST",
    body: JSON.stringify(contactData),
    mode: 'cors',
    headers: {
        "Content-Type": 'Application/JSON',
    },
   })
  .then((res) => {
    return res.json();
    })
  .then((r) => {
    if(r.status === 200) {
        // alert('Your message has been sent, click ok to continue on the site')
        document.getElementById('created').innerText = "Your message has been sent, click ok to continue on the site";
        window.location.href = `${basePath}index.html`
  }
    else {
    document.getElementById('created').innerText = "An error occurred while trying to post contact";
      window.location.href = `${basePath}index.html`;
    }
  })
  .catch(error => {
    console.log("error message", error)
  })
}

document.getElementById("submitContact").addEventListener("submit", newContact);