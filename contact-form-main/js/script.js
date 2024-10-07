const queryRatios = document.querySelectorAll('.query__options input[type="radio"]')
const queryOptionsBox = document.querySelectorAll('.query__options');

queryRatios.forEach(radio => {
    radio.addEventListener('change', (e) => {
        const element = e.target
        const optionContainer = element.parentElement

        queryOptionsBox.forEach(option => {
            option.classList.remove('selected-query')
        })

        optionContainer.classList.add('selected-query')
    })
})

queryOptionsBox.forEach((box, index) => {
    box.addEventListener('click', e => {
        option = box.querySelector('input[type="radio"]')
        
        queryOptionsBox.forEach(option => {
            option.classList.remove('selected-query')
        })

        box.classList.add('selected-query')

        option.checked = true
    })
})