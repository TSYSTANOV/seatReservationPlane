import getData from "./api.js";
import { start } from "./app.js";
import { getFormPerson } from "./formPerson.js";
import { readyPlane } from "./readyPlane.js";

async function init(selectorApp, title) {
  const app = document.querySelector(selectorApp);
  let data = await getData();

  let { main, firstForm, h1 } = start(app, title, data);
  firstForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const forms = getFormPerson(firstForm.count.value);
    const tourData = data.find((el) => {
      if (+el.id === +firstForm.tour.value) {
        return el;
      }
    });
    firstForm.remove();
    h1.textContent = tourData.tour;
    main.append(...forms);

    readyPlane(forms, main, tourData, h1);
  });
}

init(".app", "Выберите тур");
