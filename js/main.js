//Function for dashboard switch display
let homea = document.getElementById ("homea"),
    flag = document.getElementById ("flaga"),
    interv = document.getElementById ("interva"),
    settings = document.getElementById ("settingsa");

let clhome = document.getElementById("clhome"),
    clflag = document.getElementById("clflag"),
    clinterv = document.getElementById("clinterv"),
    clset = document.getElementById("clset");

    homea.style.display = "none",
    flag.style.display = "none",
    interv.style.display = "none",
    settings.style.display = "none";

    let admbuttons = [clhome, clflag, clinterv, clset]
    let actions = [homea, flag, interv, settings]
        
admbuttons.forEach((b, i) => {
    b.addEventListener('click', (e) => {
        //prevent button's default action
        e.preventDefault();
        actions.forEach((a, index) => {
            if (i == index) {
                actions[index].style.display = 'block'
            } else {
                actions[index].style.display = 'none'
            }
        }); 
    });
    return;
 });




