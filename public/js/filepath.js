// for upload

// document.querySelector("html").classList.add('js');

let fileInput  = document.querySelector( ".input-file" ),  
    button     = document.querySelector( ".input-file-trigger" ),
    the_return = document.querySelector(".file-return");
      
button.addEventListener( "keydown", function( event ) {  
    if ( event.keyCode == 13 || event.keyCode == 32 ) {  
        fileInput.focus();  
    }  
});
// button.each( function() {
//     fileInput.addEventListener( "change", function( event ) {  
//         the_return.innerHTML = this.value;  
//     }); 

//     let mediaArray = fileInput.split('\\');
//     files = mediaArray[mediaArray.length -1]
// })

button.addEventListener( "click", function( event ) {
   fileInput.focus();
   return false;
}); 

// let files = fileInput.files
// fileInput.addEventListener( "change", function( event ) {  
//     files.forEach(file => {
//         console.log (file)
//     //    the_return.innerHTML[i] = fileUpload.file[i].name;
//    })  
// }); 
fileInput.addEventListener( "change", function( event ) {  
    the_return.innerHTML = fileInput.files[0].name;
    the_return.value = fileInput.files[0].name;   
});  

