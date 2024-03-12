import { start } from "./app.js"
import { getFormPerson } from "./formPerson.js"


function init(selectorApp, title){
    const app = document.querySelector(selectorApp)
    
    let {main, firstForm} = start(app, title)
    firstForm.addEventListener('submit', (event)=>{
        event.preventDefault()
        const forms = getFormPerson(firstForm.count.value)
        firstForm.remove()
        main.append(...forms)
    })
}

init('.app','Выберите тур')