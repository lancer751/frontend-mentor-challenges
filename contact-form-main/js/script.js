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
    let option = box.querySelector('input[type="radio"]');
    
    // Escuchamos el evento change del input radio
    option.addEventListener('change', (e) => {
        // Obtenemos el valor del radio button seleccionado
        const selectedValue = e.target.value;
        
        // Removemos la clase 'selected-query' de todos los boxes
        queryOptionsBox.forEach(box => {
            box.classList.remove('selected-query');
        });
        
        // Agregamos la clase 'selected-query' al box actual
        box.classList.add('selected-query');
    });
});
