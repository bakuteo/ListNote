const endpoint = "https://6391cd6cb750c8d178cdd131.mockapi.io/api/todolist";
const endpointTas = "https://6391cd6cb750c8d178cdd131.mockapi.io/api/todoTas";
const form = document.querySelector(".form");
const input = form.querySelector(".form__input");
const ulList = document.querySelector(".todoList");
let updateId = null;

async function addPost({ text, id }) {
  await fetch(endpoint, {
    method: "POST",
    body: JSON.stringify({
      text,
      id,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
}

async function deleteText(id) {
  await fetch(`${endpoint}/${id}`, {
    method: "DELETE",
  });
}

async function getSingleCourse(id) {
  const response = await fetch(`${endpoint}/${id}`);
  const data = await response.json();
  return data;
}

// create li

function renderText(item) {
  const template = `<li id="${item.id}">
        <p class="text-list">${item.text}</p>
        <span class="close" data-id="${item.id}">x</span>
    </li>`;
  ulList.insertAdjacentHTML("beforeend", template);
}

async function getText(link = endpoint) {
  const response = await fetch(link);
  const data = await response.json();
  ulList.innerHTML = "";
  if (data.length > 0 && Array.isArray(data)) {
    data.forEach((item) => renderText(item));
  }
}

// event listeners
form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const text = { text: this.elements["text"].value };
  await addPost(text);
  this.reset();
  await getText();
});

// delete li
ulList.addEventListener("click", async function (e) {
  if (e.target.matches(".close")) {
    const id = +e.target.dataset.id;
    await deleteText(id);
    await getText();
  } else if (e.target.matches(".course-edit")) {
    const id = +e.target.dataset.id;
    const data = await getSingleCourse(id);
    form.elements["text"].value = data.text;
    updateId = id;
  }
});

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector("ul");
list.addEventListener(
  "click",
  function (ev) {
    if (ev.target.tagName === "LI") {
      ev.target.classList.toggle("checked");
    }
  },
  false
);

getText();
