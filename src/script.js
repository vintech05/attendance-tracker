let isClockedIn = false;
const logList = document.getElementById('log-list');
const clockButton = document.getElementById('clock-button');
const employeeInput = document.getElementById('employee-name');
const employeeID = document.getElementById('employee-id');
const generatePDFButton = document.getElementById('generate-pdf');
const clearBtn = document.getElementById('clear-btn');
const requestOffBtn = document.getElementById("request-off-btn");

const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');


setInterval(() => {

    let currentTime = new Date();

    hours.textContent = (currentTime.getHours()<10?'0':'') + currentTime.getHours();
    minutes.textContent = (currentTime.getMinutes()<10?'0':'') + currentTime.getMinutes();
    seconds.textContent = (currentTime.getSeconds()<10?'0':'') + currentTime.getSeconds();

}, 1000)


window.jsPDF = window.jspdf.jsPDF;
const doc = new jsPDF();

const maxLogEntries = 10;

employeeInput.addEventListener('change', () => {
    employeeID.textContent = 'Employee ID: ' + employeeInput.value;
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
    const date = prompt("Enter the date for your time off (e.g., YYYY-MM-DD):");
    const reason = prompt("Enter the reason for your time off:");

    if (date && reason && name) {
        alert(`${name} has requested for time off on ${date} due to ${reason} has been submitted.`);
    } else {
        alert("Please enter the required information to request time off.");
    }
});


clearBtn.addEventListener('click', () => {
    logList.textContent = '';
    employeeInput.value = '';
    employeeID.textContent = 'Employee ID: ';
    clockButton.textContent = 'Clock In';
    isClockedIn = false;

    window.location.reload();
});

employeeInput.addEventListener("input", () => {
    const name = employeeInput.value.trim(); 
    employeeID.textContent = name;
    
    if (name) {
        clockButton.removeAttribute("disabled");
    } else {
        clockButton.setAttribute("disabled", "true");
    }
});


generatePDFButton.addEventListener("click", () => {
    const logEntries = Array.from(logList.querySelectorAll("li"));

    const maxLogEntries = 10;

    doc.addPage();

    logEntries.forEach((entry, index) => {
        if (yPos + 10 > 280) { 
            doc.addPage();
            yPos = 10;
        }

        doc.text(10, yPos, entry.textContent);
        yPos += 10;
    });

    doc.save("attendance_log.pdf");
});


//animation section

var tl = gsap.timeline();

tl.to("#title", { 
    opacity: 1,
     y: -5,
    duration: 1 });

tl.to("#subtitle", { 
    opacity: 1,
     y: -5,
    duration: 2 });

tl.to("#clockTime", { 
    opacity: 1,
    duration: 2 });

