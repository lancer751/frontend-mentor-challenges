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

function showError(){
    
    // Identifying which inputs are empties
    const voidFiels = Object.keys(dataForm).filter(data => {
        if(dataForm[data] !== ''){
            return
        }
        return dataForm[data] === '';
    })

    console.log(voidFiels)
    
    voidFiels.forEach(fieldName => {
        
        const textElement = document.createElement('p')
        textElement.classList.add('error-message');
        let errorMessage = "";

        if(fieldName === "firstName" || fieldName === "lastName" || fieldName === "message" || fieldName === "email"){
            errorMessage = "This field is required"
            textElement.textContent = errorMessage;
        }

        if(fieldName === "queryType"){
            errorMessage = "Please select a query type"
            textElement.textContent = errorMessage;
        }

        if(fieldName === "acceptConditions"){
            errorMessage = "To submit this item please consent to being contacted"
            textElement.textContent = errorMessage;
        }

        inputFields.forEach(input => {
            if(input.name !== fieldName) return

            if(input.name === fieldName && input.type === 'text'){
                const parentField = input.parentElement;
                const existErrorMessage = parentField.querySelector('.error-message')
                if(existErrorMessage){
                    return
                }

                parentField.appendChild(textElement)
                return
            }

            if(input.name === fieldName && input.type === 'email'){
                const parentField = input.parentElement;
                const existErrorMessage = parentField.querySelector('.error-message')
                if(existErrorMessage){
                    return
                }
                parentField.appendChild(textElement)
                return
            }

            if(input.name === fieldName && input.type === 'radio'){
                const parentField = input.parentElement.parentElement.parentElement;
                const existErrorMessage = parentField.querySelector('.error-message')
                if(existErrorMessage){
                    return
                }
                parentField.appendChild(textElement)
                console.log(input.parentElement.parentElement.parentElement)
                return
            }

            if(input.name === fieldName && input.type === 'checkbox'){
                const parentField = input.parentElement.parentElement;
                const existErrorMessage = parentField.querySelector('.error-message')
                if(existErrorMessage){
                    return
                }
                parentField.appendChild(textElement)
                return
            }
        });

        if(fieldName === 'message'){
            const parentField = dataTextarea.parentElement;
            const existErrorMessage = parentField.querySelector('.error-message')
            if(existErrorMessage){
                return
            }
            parentField.appendChild(textElement)
            return
        }
    })

}

function checkEmail(email){

}
