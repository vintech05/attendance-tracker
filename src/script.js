
let isClockedIn = false;
const logList = document.getElementById('log-list');
const clockButton = document.getElementById('clock-button');
const employeeInput = document.getElementById('employee-name');
const employeeID = document.getElementById('employee-id');
const generatePDFButton = document.getElementById('generate-pdf');
const clearBtn = document.getElementById('clear-btn');



window.jsPDF = window.jspdf.jsPDF;
const doc = new jsPDF();

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
});

clearBtn.addEventListener('click', () => {
    logList.innerHTML = '';
    employeeInput.value = '';
    employeeID.textContent = 'Employee ID: ';
    clockButton.textContent = 'Clock In';
    isClockedIn = false;
});


generatePDFButton.addEventListener("click", () => {
    const logEntries = Array.from(logList.getElementsByTagName("li"));

    const maxLogEntries = 10;

    doc.addPage();

    logEntries.slice(0, maxLogEntries).forEach((entry, index) => {
        doc.text(10, 10 + index * 10, entry.textContent);
    });


    doc.save("attendance_log.pdf");
});