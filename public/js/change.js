//Toggle between create red flag && intervene on Homepage
let signUp = document.getElementById("sign-up"),
    signIn = document.getElementById("sign-in");
    
let change = document.getElementById("change"),
    change1 = document.getElementById("change1");

    change1.addEventListener("click", ()=>{
        //prevent button's default action
         //e.preventDefault();
        if (signUp.style.display = "none") {
            signUp.style.display = "block";
            signIn.style.display = "none";
        } 
    });   
    change.addEventListener("click", ()=>{
        if (signIn.style.display = "none") {
            signIn.style.display = "block";
            signUp.style.display = "none"
        };

    });

