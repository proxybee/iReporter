const basePath = "../";

if (localStorage.userToken) {
  window.location = `dashboardu.html?id=${localStorage.id}` || `admin.html?id=${localStorage.id}`;
}

function submitLogin(e) {
   e.preventDefault()
  const loginData = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value
  }
//https://ireporterafrica.herokuapp.com
  fetch(`https://ireporterafrica.herokuapp.com/api/v1/users/signin`, {
    method: "POST",
    body: JSON.stringify(loginData),
    headers: {
      "Content-Type": "application/json"
    }
    
  })
  .then((res) => {
      return res.json();
    })
  .then((r) => {
  if(!r.token) throw('token not recieved')
   window.localStorage.setItem('userToken', r.token)
   window.localStorage.setItem('id', r.id)
    if(r.isadmin) {
      window.location.href = `${basePath}admin.html?id=${r.id}`
    } else {
      window.location.href = `${basePath}dashboardu.html?id=${r.id}`
    }
  })
  .catch(error => {
    console.log("error message:", error)
  });
};

document.getElementById("signInForm").addEventListener("submit", submitLogin);
