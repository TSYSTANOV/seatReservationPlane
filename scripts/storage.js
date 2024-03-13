

export const getStorage = (tourID) => {

    if(localStorage.getItem(`tour-${tourID}`)){
        return JSON.parse(localStorage.getItem(`tour-${tourID}`))
    }
    else{
        return []
    }
}


export const setStorage = (tourID, data) => {

    const storage = getStorage()
    const filterBooking = storage.filter(item=>{
        for(let i=0; i< data.length; i++){
            if(data[i].ticket === item.ticket){
                return false
            }
        }
        return item
    })

    const newBooking = [...filterBooking, ...data]

    localStorage.setItem(`tour-${tourID}`, JSON.stringify(newBooking))
}