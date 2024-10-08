const contactForm = document.querySelector('#contact-form')
const dataInputs = contactForm.querySelectorAll('input')
const dataTextarea = contactForm.querySelector('textarea')

console.log(dataInputs)
const userInformation = {
    firstName: null,
    lastName: null,
    email: null,
    queryType: null,
    message: null,
    acceptConditions: null
}


dataInputs.forEach(input => {
    input.addEventListener('input', validateField);
})

dataTextarea.addEventListener('input', validateField);


function validateField(e){
    e.preventDefault()

    const field = e.target;
    const elementType = field.type;

    if(field.value !== '' && elementType !== 'checkbox'){
        userInformation[field.name] = field.value;
        return
    }

    console.log(field.value)


    console.log(userInformation)
    
}