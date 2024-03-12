import { createElement } from "./createElement.js";

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

function createBlockSeat(n, count) {
  const letters = ["A", "B", "C", "D", "E", "F"];
  const fuselage = createElement("ol", { className: "fuselage" });

  for (let i = n; i < count + n; i++) {
    const wrapperRow = createElement("li");
    const seats = createElement("ol", { className: "seats" });
    wrapperRow.append(seats);

    let elems = letters.map((letter) => {
      const li = createElement("li", { className: "seat" });
      li.innerHTML = `
        <label><input name="seat" type="checkbox" value="${i}${letter}"></label>`;
      return li;
    });

    seats.append(...elems);
    fuselage.append(wrapperRow);
  }
  return fuselage;
}

function createAirplane(title, scheme) {
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
      const blockSeat = createBlockSeat(n, type);
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

export const airplane = (root, data) => {
  const title = `Выберите ${data.length} ${declOfNum(data.length, [
    "место",
    "места",
    "мест",
  ])}`;

  const scheme = ["exit", 11, "exit", 1, "exit", 17, "exit"];

  root.append(createAirplane(title, scheme));
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
