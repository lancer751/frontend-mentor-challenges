const modalPuntuation = document.querySelector('#thanks-modal')
const ratingBox = document.querySelector('#rating-container')
const ratingNumberCalification = document.querySelectorAll('#item-puntuation')
const btnSendRating = document.getElementById('rating-btn-send')

ratingNumberCalification.forEach(numberBox => {
    numberBox.addEventListener('click', markCalification)
})

btnSendRating.addEventListener('click', sendRating)

function markCalification(e) {
    const element = e.target
    ratingNumberCalification.forEach(numberBox => {
        numberBox.classList.remove('number__calification--active')
    })

    element.classList.add('number__calification--active')
}

function sendRating(){
    ratingNumberCalification.forEach(item => {
        if(item.classList.contains('number__calification--active')){
            const ratingPuntuation = item.textContent
            showThanksModal(ratingPuntuation)
            return
        }
    })
}

function showThanksModal(ratingPuntuation){
    const modalMessage = `You selected ${ratingPuntuation} out of 5`
    const paragraghRating = modalPuntuation.querySelector('.thanks__puntuation')
    paragraghRating.textContent = modalMessage
    ratingBox.style.display = 'none'
    modalPuntuation.style.display = 'block'
}



