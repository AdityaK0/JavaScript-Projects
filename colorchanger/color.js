let colorsButton = document.querySelectorAll(".button")

// colorsButton.forEach((button)=>{
//    button.addEventListener('click',(e)=>{
//     document.body.style.background = e.target.id;
//    })
// })


colorsButton.forEach((button)=>{
    
 button.addEventListener('click',(e)=>{
    
     document.body.style.background = getComputedStyle(e.target).background
 })
})

