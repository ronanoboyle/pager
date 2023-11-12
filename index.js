const phoneDigits = [1, 2, 3, 4, 5, 6, 7, 8, 9, "*", 0, "#"]

const phoneDigitsEl = document.querySelector("#phone-digits")
const resetBtn = document.querySelector("#reset-btn")
const sendBtn = document.querySelector("#send-btn")
const phoneWindowEl = document.querySelector("#phone-window-el")
const pagerWindowEl = document.querySelector("#pager-window-el")
const audio = new Audio('assets/pager.wav')
let msgToSend = ""

// resets both pager and phone windows
resetBtn.addEventListener("click", function(){
    resetPhoneWindowEl()
    pagerWindowEl.textContent = ""
})

// initiates message sending
sendBtn.addEventListener("click", function(){
    msgToSend = phoneWindowEl.textContent
    if (msgToSend === "") {
        phoneWindowEl.textContent = "No Message..."
        setTimeout(() => {resetPhoneWindowEl()}, 1000)
    } else {
        phoneWindowEl.textContent = "Sending..."
        toggleButtons()
        setTimeout(() => {sendMessage()}, 3000)
    }
    
})

// toggles all buttons so that they cannot be pressed whilst sending a message.
function toggleButtons() {
    const buttons = document.querySelectorAll('button')
    buttons.forEach(function(button) {
        if ( button.disabled === true) {
            button.disabled = false 
        } else {
            button.disabled = true
        }
    })
}

// sends message to pager
function sendMessage() {
    pagerWindowEl.textContent = msgToSend
    resetPhoneWindowEl()
    audio.play()
    toggleButtons()
}

function resetPhoneWindowEl() {
    phoneWindowEl.textContent = ""
}

// creates phone buttons from an array, adding ids.
function setPhone() {
    for (let i = 0; i < phoneDigits.length; i++){
    const button = document.createElement("button")
    button.id = `digit_${i}`
    button.textContent = phoneDigits[i];
    button.addEventListener("click", function() {
        phoneWindowEl.textContent += phoneDigits[i];
    });
    phoneDigitsEl.appendChild(button);
    }
}

// // adds event listeners to each of the phone buttons
// function addEventListeners() {
//     phoneDigits.forEach(function(digit, index) {
//         document.querySelector(`#digit_${index}`).addEventListener("click", function() {
//             phoneWindowEl.textContent += `${phoneDigits[index]}`
//         })
//     })  
// }

document.addEventListener('DOMContentLoaded', function() {
    setPhone();
})