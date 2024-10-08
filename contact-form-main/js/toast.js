const toast = document.querySelector('#toast-success');
const btnSubmit = document.querySelector('#form-btn');

btnSubmit.addEventListener('submit', e => {
    e.preventDefault()

    toast.classList.add('toast__show');
    
    setTimeout(() => {
        toast.classList.remove('toast__show');
    }, 3000);
})