import { createElement } from "./createElement.js";
import { getStorage, setStorage } from "./storage.js";

function createCockpit(titleText) {
  const cockpit = createElement("div", {
    className: "cockpit",
  });
  const title = createElement("h1", {
    className: "cockpit-title",
    textContent: titleText,
  });
  const btn = createElement("button", {
    className: "cockpit-confirm",
    type: "submit",
    textContent: "Подтвердить",
  });
  cockpit.append(title, btn);
  return cockpit;
}

function createExit() {
  const fuselage = createElement("div", { className: "exit fuselage" });
  return fuselage;
}

function createBlockSeat(n, count, bookingSeat) {
  const letters = ["A", "B", "C", "D", "E", "F"];
  const fuselage = createElement("ol", { className: "fuselage" });
  
  for (let i = n; i < count + n; i++) {
    const wrapperRow = createElement("li");
    const seats = createElement("ol", { className: "seats" });
    wrapperRow.append(seats);

    let elems = letters.map((letter) => {
      const li = createElement("li", { className: "seat" });

      const label = createElement('label')
      const input = createElement('input',{
        name:'seat',
        type:'checkbox',
        value:`${i}${letter}`
      })
      label.append(input)
      li.append(label)
      
      if(bookingSeat.includes(`${i}${letter}`)){
        input.disabled = true
      }
      return li;
    });

    seats.append(...elems);
    fuselage.append(wrapperRow);
  }
  return fuselage;
}

function createAirplane(title, tourData) {
  const scheme = tourData.scheme;

  const bookingSeat = getStorage(tourData.id).map(item=>item.seat)
  
  const choisesSeat = createElement("form", { className: "choises-seat" });

  const plane = createElement("fieldset", {
    className: "plane",
    name: "plane",
  });

  const cockpit = createCockpit(title);
  /////
  /////
  let n = 1;

  const elements = scheme.map((type) => {
    if (type === "exit") {
      return createExit();
    }
    if (typeof type === "number") {
      const blockSeat = createBlockSeat(n, type, bookingSeat);
      n = n + type;
      return blockSeat;
    }
  });
  /////
  /////
  plane.append(cockpit, ...elements);
  choisesSeat.append(plane);
  return choisesSeat;
}

function checkSeat(form, data, h1, id) {
  const bookingSeat = getStorage(id).map(el=>el.seat)
  form.addEventListener("change", () => {
    const formData = new FormData(form);
    const checked = [...formData].map(([key, value]) => {
      return value;
    });
console.log(bookingSeat)
    if (checked.length === data.length) {
      [...form].forEach((item) => {
        if (item.checked === false && item.name === "seat") {
          item.disabled = true;
        }
      });
    } 
    else {
      [...form].forEach((item) => {
        if (item.checked === false && item.name === "seat" && !bookingSeat.includes(item.value)) {
          item.disabled = false;
        }
      });
    }

  });
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const booking = [...formData].map(([key, value]) => {
      return value;
    });
    for (let i = 0; i < data.length; i++) {
      data[i].seat = booking[i];
    }
    console.log(data);
    const seatPlaces = data.map((item) => {
      return item.seat;
    });
    h1.textContent = `Спасибо хорошего полёта, ваши места: ${seatPlaces.join(
      ", "
    )}`;
    setStorage(id, data)
    form.remove();
  });
}

export const airplane = (root, data, tourData, h1) => {
  const title = `Выберите ${data.length} ${declOfNum(data.length, [
    "место",
    "места",
    "мест",
  ])}`;

  const choiseForm = createAirplane(title, tourData);

  checkSeat(choiseForm, data, h1, tourData.id);

  // const scheme = ["exit", 11, "exit", 1, "exit", 17, "exit"];

  root.append(choiseForm);
};

//////
//////
function declOfNum(n, titles) {
  return titles[
    n % 10 === 1 && n % 100 !== 11
      ? 0
      : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)
      ? 1
      : 2
  ];
}
