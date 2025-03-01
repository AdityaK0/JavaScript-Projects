let decrease = document.getElementById("dec");
let increase = document.getElementById("inc");
let reset = document.getElementById("res");
let data = document.getElementById("data");
let msg = document.getElementById("msg");

decrease.addEventListener("click", () => {
    let val = Number(data.textContent);
    
    if (val === 0) {
        console.log("fc");
        
        msg.innerText = "⚠️ Can't reduce below zero!";
        msg.style.color = "red";

        setTimeout(() => {
            msg.innerText = "";
        }, 1500);
    } else {
        data.innerText = val - 1;
    }
});

increase.addEventListener("click", () => {
    let val = Number(data.textContent);
    data.innerText = val + 1;
});

reset.addEventListener("click", () => {
    data.innerText = "0";
    msg.innerText = ""; 
});
