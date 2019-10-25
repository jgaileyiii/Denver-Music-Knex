window.addEventListener("DOMContentLoaded", (event) => {
    console.log("Dom Content Loaded")
})

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

function addTeacher () {
    while ($container.firstChild) {
        $container.removeChild($container.firstChild)
    }
    const teacherForm = document.createElement('form')
    teacherForm.className = 'teacherForm'
    

    teacherForm.innerHTML = 
    `<input id="comment_input" type="text" name="name" placeholder="Name"/>
    <input id="comment_input" type="text" name="bio" placeholder="Add Bio"/>
    <input id="comment_input" type="text" name="instruments" placeholder="Instrument(s)"/>
    <input id="comment_input" type="text" name="style" placeholder="Styles Played"/>
    <input id="comment_input" type="text" name="url" placeholder="Website"/>
    <input id="comment_input" type="text" name="phone_number" placeholder="Phone Number"/>
    <input id="comment_input" type="text" name="email" placeholder="E-Mail"/>
    <input class="submit" type="submit" value="Submit"/>
    `
    $container.appendChild(teacherForm)

    teacherForm.addEventListener('submit', () => {
        const formData = new FormData(teacherForm)
        const teacherData = {
            name: formData.get("name"), 
            bio: formData.get("bio"), 
            instruments: formData.get("instruments"), 
            style: formData.get("style"),
            url: formData.get("url"), 
            phone_number: formData.get("phone_number"), 
            email: formData.get("email")
          }
        
          fetch(`http://localhost:3000/api/v1/teachers/`, {
            method: 'POST',
            headers: {
              "Accept": "application/json",
              'Content-Type': 'application/json'  
            },
            body: JSON.stringify(teacherData)     
          })
    })
}
