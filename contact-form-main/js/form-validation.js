const contactForm = document.querySelector('#contact-form')
const btnSend = contactForm.querySelector('#form-btn')
const dataTextarea = contactForm.querySelector('textarea')
const inputFields = contactForm.querySelectorAll('input')

const dataForm = {
    firstName: '',
    lastName: '',
    email: '',
    queryType: '',
    message: '',
    acceptConditions: ""
}

btnSend.addEventListener('click', validateForm);
dataTextarea.addEventListener('input', fillFormData);
inputFields.forEach(input => input.addEventListener('input', fillFormData))


function fillFormData(e){
    const field = e.target;

    if(field.type !== 'checkbox'){
        dataForm[field.name] = field.value
    }else{
        dataForm[field.name] = field.checked
    }
}


function validateForm(){
    const isFormCompleted = Object.values(contactForm).some(field => field ==='')
    const isEmailValid = checkEmail(contactForm.email)

    if(!isFormCompleted || !isEmailValid){
        showError()
    }

}

function showError(dataForm){
    
}

function checkEmail(email){

}
