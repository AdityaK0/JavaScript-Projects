let name = document.getElementById('name')
let email = document.getElementById('email')
let password = document.getElementById('password')
let password1 = document.getElementById('password1')
let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
let btn = document.getElementById('sub');


function formValid(name,email,password,password1){
    let isValid = true;

    let nameValue = name.value
    console.log(nameValue);
    
    if(nameValue.length<8){
        document.getElementById('forname').innerText = "The name length should be greater than 8";
        name.style.border = "3px solid red";
        isValid = false;
    }
    else{
        document.getElementById('forname').innerHTML = "<b style='color:green;' >perfect<b>";
        name.style.border = "4px solid green";
        setTimeout(()=>{
            document.getElementById('forname').innerHTML = ""
            name.style.border = "none";
        },2000)
        
        
    }

    if(document.getElementById('password').value == password1.value ){
        
        document.getElementById('forpassword1').innerHTML = ""
        password.style.border = "2px solid green"
        password1.style.border = "2px solid green"

    }
    else{
        document.getElementById('forpassword1').innerText = "Password and Confirm Password doesnot Match";
        // setTimeout(()=>{
        //     document.getElementById('forpassword1').innerHTML = "";
        // },1000)
        password1.style.border = "2px solid red";
        isValid = false;
    }


    
    if(isValid){
        btn.disabled = false;
        btn.style.background= "#0056b3";
    }
    else{
        btn.disabled = true;
        btn.style.background= "lightblue";
        
    }
    
   
}

// name.addEventListener('input',formValid(name,email,password,password1));
name.addEventListener('input', ()=> formValid(name,email,password,password1));
password1.addEventListener('input',()=>formValid(name,email,password,password1))

// here i have returned function using arrow function bcoz if directly pass the formValid()with args
// then it will immediately invoke the funtion eventlistner wants the function to be returned