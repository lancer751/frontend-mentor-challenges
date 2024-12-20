const routinesContainer = document.querySelector('#routines')
const filterButtons = document.querySelectorAll('#filters__timeframe li')

filterButtons.forEach(btn => {

    btn.addEventListener('click', (e) => {
        filterButtons.forEach(btn => btn.classList.remove("active"))
        btn.classList.add('active')
        showRoutinesByTimeframes(e)
    })
})

async function getAllRoutines(){

    try{
        const res = await fetch('./data.json')
        const routines = await res.json()
        return routines
    }catch(e){
        console.error(e)
        return {'message': 'no se pude acceder al json'}
    }

}

async function getFilteredRoutines(frecuency){
    const routines = await getAllRoutines()
    return routines.filter(routine => {
        if(!routine.timeframes[frecuency]) return
        return routine.timeframes[frecuency]
    })
}

async function showRoutinesByTimeframes(e){
    const frecuency = e ? e.target.textContent : 'daily'

        // Mostrar Skeleton Loader
    routinesContainer.innerHTML = `
    <div class="skeleton__card">
        <div class="skeleton__back"></div>
        <div class="skeleton__title"></div>
        <div class="skeleton__text"></div>
    </div>
    <div class="skeleton__card">
        <div class="skeleton__back"></div>
        <div class="skeleton__title"></div>
        <div class="skeleton__text"></div>
    </div>
    `;

    const routines = await getAllRoutines()
    
    routinesContainer.innerHTML = ''
    
    routines.forEach((routine, index) => {
        const {title, bg_color} = routine

        if(!routine.timeframes || !routine.timeframes[frecuency.toLowerCase()]) return false
        
        let routineCard = `
            <div class="routine__card">
            <div class="back__background" style="background: ${bg_color}">
            <img src="./images/icon-${title.replace(' ','-')}.svg" alt="${title}">
            </div>

            <div class="routine__report">
            <div class="routine__box routine__box--1">
                <p class="routine__title">${title}</p>
                <img src="./images/icon-ellipsis.svg" alt="menu-options">
            </div>

            <div class="routine__box routine__box--2">
                <span class="routine__duration">${routine.timeframes[frecuency.toLowerCase()].current}hrs</span>
                <p class="time__dedicated">Lask Week - ${routine.timeframes[frecuency.toLowerCase()].previous}hrs</p>
            </div>
            </div>
        </div>
        `
        routinesContainer.innerHTML += routineCard
        return
    })

}

showRoutinesByTimeframes()