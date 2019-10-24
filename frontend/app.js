function openInstrNav() {
    document.getElementById("instrument-content").style.width = "15%";
}

function openSSNav() {
    document.getElementById("ss-content").style.width = "15%";
}

function closeInstrNav() {
    document.getElementById("instrument-content").style.width = "0";
}
function closeSSNav() {
    document.getElementById("ss-content").style.width = "0";
}

const $container = document.querySelector('#card-container')

fetch(`http://localhost:3000/api/v1/teachers/`)
    .then(response => response.json())
    .then(filterInstruments)

 

function filterInstruments(teachers) {
    const instrumentTags = document.getElementsByClassName('instrument')
    const instruments = Array.from(instrumentTags)
    instruments.forEach(instrument => {
        instrument.addEventListener('click', (event) => {
            while ($container.firstChild) {
                $container.removeChild($container.firstChild)
            }
            createTeacherCards(teachers, event)
        })  
    })
}


function createTeacherCards(teachers, event){
    teachers.forEach(teacher => {
        if (teacher.instruments == event.target.innerText){
            const div2 = document.createElement('div')
            const $container = document.querySelector('#card-container')
            div2.className = 'teacherCard' 
            

            div2.innerHTML = 
            `<h1>${teacher.name}</h1>
            <p>${teacher.style}</p>
            <p>${teacher.bio}</p>
            <a href='${teacher.url}'>Website</a>
            `
            $container.appendChild(div2)
        }
    })
}
