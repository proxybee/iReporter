const basePath = "../";

if (localStorage.userToken) {
  window.location = `userp.html?id=${localStorage.id}` || `admin.html?id=${localStorage.id}`;
}

  function submitSignUp(e) {
  e.preventDefault()

  const signUpData = {
    firstname: document.getElementById("firstname").value,
    lastname: document.getElementById("lastname").value,
    username: document.getElementById("username").value,
    email: document.getElementById('email').value,
    phone_number: document.getElementById('phone_number').value,
    password: document.getElementById("password").value,
    
  }
    fetch('http://localhost:3020/api/v1/users/signup', {
    method: "POST",
    body: JSON.stringify(signUpData),
    headers: {
        // Accept: 'application/JSON',
        "Content-Type": "application/json"
    }
   })
  .then((res) => {
      return res.json();
    })
  .then((r) => {
    if(r.token) window.location.href = `${basePath}/sign-in.html`
    else {
    let newParagraph = document.createElement("p")
    let  textNode = document.createTextNode("An error occurred while trying to register you")
    let newDiv = document.getElementById("msg")
      newParagraph.appendChild(textNode)
      newDiv.insertBefore(newParagraph, newDiv.childNodes[0])
      newParagraph.style.display.color = ('red')
    }
  })
  .catch(error => {
    console.log("error message", error)
  })
}

document.getElementById("signUpForm").addEventListener("submit", submitSignUp);