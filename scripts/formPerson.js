import { createElement } from "./createElement.js"


function createFormPerson(number){
    const form = createElement('form',{className:'person'})
    const h2 = createElement('h2',{className:'person__title',
    textContent:`Пасажир #${number}`})
    const fieldName =createElement('div',{
        className:'field'
    })
    fieldName.innerHTML = `
    <label class="field__label" for="name${number}">ФИО</label>
    <input class="field__input" id="name${number}" name="name" type="text" placeholder="Введите ваше ФИО" required="">
    `
    const fieldTicket = createElement('div',{
        className : 'field'
    })
    fieldTicket.innerHTML = `
    <label class="field__label" for="ticket${number}">Номер билета (10 цифр)</label>
    <input class="field__input" id="ticket${number}" name="ticket" type="text" placeholder="Номер билета" required="" minlength="10" maxlength="10">
    `
    const btn = createElement('button',{
        className:'btn-confirm',
        type:'submit',
        textContent:'Подтвердить'
    })
    form.append(h2, fieldName, fieldTicket, btn)
    return form
}

export const getFormPerson = (count) => {
    const forms = []
    for(let i = 1; i <= count; i++){
        forms.push(createFormPerson(i))
    }
    return forms
}


