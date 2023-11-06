let isClockedIn = false;
const logList = document.getElementById('log-list');
const clockButton = document.getElementById('clock-button');
const employeeInput = document.getElementById('employee-name');
const employeeID = document.getElementById('employee-id');
const generatePDFButton = document.getElementById('generate-pdf');
const clearBtn = document.getElementById('clear-btn');
const requestOffBtn = document.getElementById("request-off-btn");
let yPos = 6;


const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');


const moonIcon = document.getElementById("moon");
const sunIcon = document.getElementById("sun");

function toggleTheme() {
    const darkToggle = document.querySelector(".toggle")
  
    if (darkToggle) {
      darkToggle.classList.toggle('dark');
      moonIcon.classList.toggle('hidden');
    sunIcon.classList.toggle('hidden');
    if (darkToggle.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
      } else {
        localStorage.setItem('theme', 'light');
      }
    } else {
        darkToggle.classList.toggle('dark');
       moonIcon.classList.toggle('hidden');
    sunIcon.classList.toggle('hidden');
    }
  }

  window.onload = function() {
    const storedTheme = localStorage.getItem('theme');
    const darkToggle = document.querySelector(".toggle");
    if (storedTheme === 'dark') {
      darkToggle.classList.add('dark');
      moonIcon.classList.add('hidden');
      sunIcon.classList.remove('hidden');
    } else {
      darkToggle.classList.remove('dark');
      moonIcon.classList.remove('hidden');
      sunIcon.classList.add('hidden');
    }
  }
  

moonIcon.addEventListener('click', toggleTheme);
sunIcon.addEventListener('click', toggleTheme);

setInterval(() => {

    let currentTime = new Date();

    hours.textContent = (currentTime.getHours()<10?'0':'') + currentTime.getHours();
    minutes.textContent = (currentTime.getMinutes()<10?'0':'') + currentTime.getMinutes();
    seconds.textContent = (currentTime.getSeconds()<10?'0':'') + currentTime.getSeconds();

}, 1000)


window.jsPDF = window.jspdf.jsPDF;
const doc = new jsPDF();

const maxLogEntries = 6;

employeeInput.addEventListener('change', () => {
    employeeID.textContent = 'Employee ID: ' + employeeInput.value;
});

employeeInput.addEventListener("input", () => {
    
    if (employeeInput.value == "" || employeeInput.value == null) {
        clockButton.setAttribute("disabled");
        generatePDFButton.setAttribute("disabled")
    } else {
        clockButton.removeAttribute("disabled");
        generatePDFButton.removeAttribute("disable");
    }
});

generatePDFButton.addEventListener("click", () => {
    const logEntries = Array.from(logList.querySelectorAll("li"));

    const maxLogEntries = 6;

    doc.addPage();

    logEntries.forEach((entry, index) => {
        if (yPos + 6 > 280) { 
            doc.addPage();
            yPos = 6;
        }

        doc.text(6, yPos, entry.textContent);
        yPos += 6;
    });

    doc.save("attendance_log.pdf");
});


clockButton.addEventListener('click', () => {
    if(isClockedIn) {
        const currentTime = new Date().toLocaleString();
        const li = document.createElement('li');
        li.textContent = `${employeeInput.value} Clocked out at ${currentTime}`;
        logList.appendChild(li);
        clockButton.textContent = 'Clock In';
        isClockedIn = false;
    } else {
        const currentTime = new Date().toLocaleString();
        const li = document.createElement('li');
        li.textContent = `${employeeInput.value} Clocked in at ${currentTime}`;
        logList.appendChild(li);
        clockButton.textContent = 'Clock Out';
        isClockedIn = true;
     }

     const logEntries = logList.getElementsByTagName("li");
     if (logEntries.length >= maxLogEntries) {
         logList.removeChild(logEntries[0]); 
     }
});

requestOffBtn.addEventListener("click", () => {
    const name = prompt("Enter your name:");
    const date = prompt("Enter the date for your day off (e.g., YYYY-MM-DD):");
    const reason = prompt("Enter the reason for your day off:");

    if (date && reason && name) {
        alert(`${name} has requested for day off on ${date} due to ${reason} has been submitted.`);
    } else {
        alert("Please enter the required information to request day off.");
    }
});


clearBtn.addEventListener('click', () => {
    logList.textContent = '';
    employeeInput.value = '';
    employeeID.textContent = 'Employee ID: ';
    clockButton.textContent = 'Clock In';
    isClockedIn = false;
});


//animation section

var tl = gsap.timeline();

tl.to("#title", { 
    opacity: 1,
     y: -5,
    duration: 1 });

tl.to("#subtitle", { 
    opacity: 1,
    duration: 2 });

tl.to("#clockTime", { 
    opacity: 1,
    duration: 2 });

