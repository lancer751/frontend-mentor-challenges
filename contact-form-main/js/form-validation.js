const contactForm = document.querySelector('#contact-form')
const btnSend = contactForm.querySelector('#form-btn')
const dataTextarea = contactForm.querySelector('textarea')
const firstNameBox = contactForm.querySelector('#firstNameBox')
const lastNameBox = contactForm.querySelector('#lastNameBox')
const emailBox = contactForm.querySelector('#emailBox')
const quetyTypeRatioContainer = contactForm.querySelector('#queryOptionContainer')
const consentBox = contactForm.querySelector('#consetBox')
const inputsTextField = contactForm.querySelectorAll('input[type="text"]')
const inputEmailField = contactForm.querySelector('input[type="email"]')
const inputsRatioField = contactForm.querySelectorAll('input[type="radio"]')
const inputCheckboxField = contactForm.querySelector('input[type="checkbox"]')

// const dataForm = {
//     firstName: '',
//     lastName: '',
//     email: '',
//     queryType: '',
//     message: '',
//     acceptConditions: ""
// }

btnSend.addEventListener('click', validateForm);
dataTextarea.addEventListener('input', checkField);
inputsTextField.forEach(input => input.addEventListener('input', checkField))
inputEmailField.addEventListener('input', checkField)
inputsRatioField.forEach(input => input.addEventListener('input', checkField))
inputCheckboxField.addEventListener('change', checkField)


function validateForm(e){
    e.preventDefault()
    const formData = new FormData(contactForm)
    const userData = Object.fromEntries(formData.entries())
    console.log(userData)

    if(userData.acceptConditions === undefined){
        userData.acceptConditions = ''
    }

    if(userData.queryType === undefined){
        userData.queryType = ''
    }

    const isFormFilled = Object.values(userData).every(field => field !== '')
    const isValidEmail = checkEmail(userData.email)
    
    if(isFormFilled && isValidEmail){
        const toast = document.querySelector('#toast-success');
        
        toast.classList.add('toast__show');
    
        setTimeout(() => {
            toast.classList.remove('toast__show');
        }, 3000);
        console.log('exitoso')
        return
    }
    
    for(let field in userData){
        if(userData[field] === ''){
            showMessageError(field)
        }
        if(field === 'email' && !isValidEmail && userData[field] !== ''){
            showMessageError(field, !isValidEmail)
        }
    }
    
}

function checkField(e){
    const typeField = e.target.type
    const fieldElement = e.target

    if(typeField === 'text' || typeField === 'textarea'){
        const fieldBox = fieldElement.parentElement
        cleanErrorMessage(fieldBox)
        return
    }

    if(typeField === 'email'){
        const fieldBox = fieldElement.parentElement
        const isValidEmail = checkEmail(fieldElement.value)
        console.log(isValidEmail)
        if(!isValidEmail) {
            showMessageError(typeField, !isValidEmail); return
        }
        
        cleanErrorMessage(fieldBox)
        return
    }

    if(typeField === 'radio'){
        const isSelected = e.target.checked
        const fieldBox = fieldElement.parentElement.parentElement.parentElement

        if(isSelected){
            cleanErrorMessage(fieldBox)  
        }
        return
    }

    if(typeField === 'checkbox'){
        const isChecked = e.target.checked
        const fieldBox = fieldElement.parentElement.parentElement

        if(isChecked){
            cleanErrorMessage(fieldBox)  
        }
        return
    }

}

function showMessageError(fieldName, invalidEmail = false){
    const { textErrorElement } = generateErrorMessage(fieldName, invalidEmail)
    console.log(invalidEmail)

    if(fieldName === 'firstName'){
        cleanErrorMessage(firstNameBox)
        firstNameBox.appendChild(textErrorElement)
        return
    }

    if(fieldName === 'email'){
        cleanErrorMessage(emailBox)
        emailBox.appendChild(textErrorElement)
        return
    }

    if(fieldName === 'lastName'){
        cleanErrorMessage(lastNameBox)
        lastNameBox.appendChild(textErrorElement)
        return
    }

    if(fieldName === 'queryType'){
        cleanErrorMessage(quetyTypeRatioContainer)
        quetyTypeRatioContainer.appendChild(textErrorElement)
        return
    }

    if(fieldName === 'acceptConditions'){
        cleanErrorMessage(consentBox)
        consentBox.appendChild(textErrorElement)
        return
    }

    if(fieldName === 'message'){
        const messageBox = dataTextarea.parentElement
        cleanErrorMessage(messageBox)
        
        messageBox.appendChild(textErrorElement)
        return
    }
}

function generateErrorMessage(fieldName, invalidEmail = false){
    const textErrorElement = document.createElement('p')
    textErrorElement.classList.add('error-message');
    let errorMessage = "";

    if(fieldName === "firstName" || fieldName === "lastName" || fieldName ===   "message" || fieldName === "email"){
        console.log(invalidEmail)

        if(invalidEmail){
            errorMessage = "Please enter a valid email address"
            textErrorElement.textContent = errorMessage;
             return { textErrorElement }
        }

        errorMessage = "This field is required"
        textErrorElement.textContent = errorMessage;
         return { textErrorElement }
    }

    if(fieldName === "queryType"){
        errorMessage = "Please select a query type"
        textErrorElement.textContent = errorMessage;
         return { textErrorElement }
    }
    
    if(fieldName === "acceptConditions"){
        errorMessage = "To submit this item please consent to being contacted"
        textErrorElement.textContent = errorMessage;
         return { textErrorElement }
    }
}

function cleanErrorMessage(inputBox){
    const existErrorMessage = inputBox.querySelector('.error-message')
    
    if(existErrorMessage){
        existErrorMessage.remove('error-message')
    }
}

function checkEmail(email){
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return regex.test(email)
}