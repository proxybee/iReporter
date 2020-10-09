document.getElementById("logout")

logout.addEventListener('click', () => {
    localStorage.clear()
    window.location = `${basePath}index.html`
});

const logUserOut = userToken =>{
    setTimeout(()=> MyLogoutFunction(), userToken.expiresIn)
}