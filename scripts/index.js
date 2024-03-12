import { start } from "./app.js";
import { getFormPerson } from "./formPerson.js";
import { readyPlane } from "./readyPlane.js";

function init(selectorApp, title) {
  const app = document.querySelector(selectorApp);

  let { main, firstForm, h1 } = start(app, title);
  firstForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const forms = getFormPerson(firstForm.count.value);
    firstForm.remove();
    h1.remove();
    main.append(...forms);

    readyPlane(forms, main);
  });
}

init(".app", "Выберите тур");
