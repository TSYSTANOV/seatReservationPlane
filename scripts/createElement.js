
export const createElement = (tag, attr) =>{
    let element = document.createElement(tag)
    Object.assign(element, attr)
    return element
}