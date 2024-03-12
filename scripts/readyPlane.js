import { airplane } from "./airplane.js";

export const readyPlane = (forms, root) => {
  const data = [];

  forms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      for (let element of form.elements) {
        element.disabled = true;
      }
      data.push({
        name: form.name.value,
        ticket: form.ticket.value,
      });
      if (forms.length === data.length) {
        root.innerHTML = "";
        airplane(root, data);
      }
    });
  });
};
