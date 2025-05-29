document.addEventListener("DOMContentLoaded", () => {
const form= document.querySelector("#form-id");
const studentjsDetails = document.querySelector(".studentjs-details");

//load from local storage 
let savedStudentsDetails = JSON.parse(localStorage.getItem('studentsList')) || [];
savedStudentsDetails.forEach((studentHtml)=>{
  studentjsDetails.insertAdjacentHTML("beforeend",studentHtml);
});

//Setting students details in local storage
studentjsDetails.addEventListener("click",function(e){
  if(e.target.classList.contains("delete-btn")){
    const card= e.target.closest(".student-card");
    const index=parseInt(card.dataset.index);
    //card.remove();
    savedStudentsDetails.splice(index,1);
    localStorage.setItem('studentsList',JSON.stringify(savedStudentsDetails));
    renderStudentList();
  }
});
// Clear existing cards
function renderStudentList() {
  studentjsDetails.innerHTML = ""; 

  savedStudentsDetails.forEach((studentHtml, index) => {
    const updatedHtml = studentHtml.replace(/data-index="\d+"/, `data-index="${index}"`);
    // update with corrected index
    savedStudentsDetails[index] = updatedHtml;
    studentjsDetails.insertAdjacentHTML("beforeend", updatedHtml);
  });


  localStorage.setItem('studentsList', JSON.stringify(savedStudentsDetails));
}


//Adding submit functionality
form.addEventListener("submit",function(event){
event.preventDefault() 

// Valid Student name
const inputName = document.querySelector(".student-name")
if(!inputName.value.trim()){
  alert("Please enter the Student Name.");
  inputName.focus();
  return;
}
// Valid Student id
const inputId = document.querySelector('input[name="id"]')
if(!inputId.value.trim()){
  alert("Please enter the Student Id");
  inputId.focus();
  return;
}
//Valid Student Email
const inputEmail = document.querySelector('input[name="email"]')
if(!inputEmail.value.trim()){
  alert("Please enter the Email Id");
  inputEmail.focus();
  return;
}
//Valid Student Contact
const inputContact = document.querySelector('input[name="contact"]')
if(!inputContact.value.trim()){
  alert("Please enter the Contact details");
  inputContact.focus();
  return;
}
//Valid Student Gender
const inputGender = document.querySelector('input[name="gender"]:checked');
if(!inputGender){
  alert("Please Select your Gender");
  inputGender.focus();
  return;
}
//Valid Student Skills
const allInputSkills = document.querySelectorAll('input[name="Skills"]')
const oneAtleastSkill = Array.from(allInputSkills)
.filter(cb=> cb.checked);
if (oneAtleastSkill.length===0){
  alert("Please Select atleast one Skills");
  return;
}
//Storing Students enteries
const index = savedStudentsDetails.length;
const studentDetailsHtml = `
<div class="student-card" data-index="${index}">
<p><strong>Name:</strong> ${inputName.value}</p>
<p><strong>Id:</strong> ${inputId.value}</p>
<p><strong>Email:</strong> ${inputEmail.value}</p>
<p><strong>Contact:</strong> ${inputContact.value}</p>
<p><strong>Gender:</strong> ${inputGender.value}</p>
<p><strong>Skills:</strong> ${
    oneAtleastSkill.map(cb=>cb.id)
    .join(", ")}
</p>
<button class="delete-btn">Delete</button>
<hr>
</div>
`;
// save to local storage
savedStudentsDetails.push(studentDetailsHtml);
localStorage.setItem('studentsList', JSON.stringify(savedStudentsDetails));


renderStudentList();



// Clear the form for next entry
    form.reset();
  })
});



