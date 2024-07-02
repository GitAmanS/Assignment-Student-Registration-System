// script.js

const studentForm = document.getElementById('registration-form');
const studentTable = document.getElementById('student-table');
let students = []; 

// Function to validate user input
function validateInput(name, studentId, email, contactNo) {
  const nameRegex = /^[a-zA-Z ]+$/;
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const contactRegex = /^\d+$/;

  if (!nameRegex.test(name)) {
    alert('Please enter a valid name (letters and spaces only)');
    return false;
  }

  if (!studentId || !contactRegex.test(studentId)) {
    alert('Please enter a valid student ID (numbers only)');
    return false;
  }

  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address');
    return false;
  }

  if (!contactRegex.test(contactNo)) {
    alert('Please enter a valid contact number (numbers only)');
    return false;
  }

  return true;
}

// Function to load student data from local storage
function loadStudents() {
  const storedStudents = localStorage.getItem('students');
  if (storedStudents) {
    students = JSON.parse(storedStudents);
  }
  displayStudents();
}

// Function to display student data in the table
function displayStudents() {
    const tbody = document.querySelector('#student-table tbody');
    tbody.innerHTML = ''; // Clear existing table content

    students.forEach((student) => {
      const tableRow = document.createElement('tr');
      
      tableRow.innerHTML = `
        <td>${student.name}</td>
        <td>${student.studentId}</td>
        <td>${student.email}</td>
        <td>${student.contactNo}</td>
        <td>
          <button class="edit" data-id="${student.studentId}">Edit</button>
          <button class="delete" data-id="${student.studentId}">Delete</button>
        </td>
      `;
      
      tbody.appendChild(tableRow);
    });
  }

// Function to add a new student record
function addStudent(name, studentId, email, contactNo) {
  if (!validateInput(name, studentId, email, contactNo)) return;

  const newStudent = {
    name,
    studentId,
    email,
    contactNo,
  };
  students.push(newStudent);
  localStorage.setItem('students', JSON.stringify(students));
  displayStudents();
  studentForm.reset(); // Clear form after successful submission
}

// Function to handle form submission
studentForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const studentId = document.getElementById('student-id').value;
  const email = document.getElementById('email').value;
  const contactNo = document.getElementById('contact-no').value;

  addStudent(name, studentId, email, contactNo);
});

// Function to handle edit button click
studentTable.addEventListener('click', (event) => {
  const target = event.target;
  if (target.classList.contains('edit')) {
    const studentId = target.dataset.id;
    const selectedStudent = students.find((student) => student.studentId === studentId);

    students = students.filter((student) => student.studentId !== studentId);
    localStorage.setItem('students', JSON.stringify(students));
    displayStudents();
    document.getElementById('name').value = selectedStudent.name;
    document.getElementById('student-id').value = selectedStudent.studentId;
    document.getElementById('email').value = selectedStudent.email;
    document.getElementById('contact-no').value = selectedStudent.contactNo;
  }
});

// Function to handle delete button click
studentTable.addEventListener('click', (event) => {
  const target = event.target;
  if (target.classList.contains('delete')) {
    const studentId = target.dataset.id;
    const confirmed = confirm(`Are you sure you want to delete student with ID ${studentId}?`);
    if (confirmed) {
      students = students.filter((student) => student.studentId !== studentId);
      localStorage.setItem('students', JSON.stringify(students));
      displayStudents();
    }
  }
});

// Load student data from local storage on page load
loadStudents();
