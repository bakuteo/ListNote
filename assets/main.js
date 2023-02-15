const api = "https://6391cd6cb750c8d178cdd131.mockapi.io/api/todoTas";
const formTask = document.querySelector(".form-task");
const inputTask = document.querySelector(".input-task");
const listTask = document.querySelector(".todoTask");

let updateIdTask = null;

async function addAPI({ text, id }) {
  await fetch(api, {
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

async function delText(id) {
  await fetch(`${api}/${id}`, {
    method: "DELETE",
  });
}

async function getCourse(id) {
  const responseTask = await fetch(`${endpoint}/${id}`);
  const dataTask = await responseTask.json();
  return dataTask;
}

// cre Li
function createLi(item) {
  const temp = `<li id="${item.id}">
    <p class="text-list">${item.text}</p>
    <span class="close" data-id="${item.id}">x</span>
</li>`;
  listTask.insertAdjacentHTML("beforeend", temp);
}

async function getTextTask(link = api) {
  const res = await fetch(link);
  const dataTask = await res.json();
  listTask.innerHTML = "";
  if (dataTask.length > 0 && Array.isArray(dataTask)) {
    dataTask.forEach((item) => createLi(item));
  }
}

formTask.addEventListener("submit", async function (e) {
  e.preventDefault();
  const text = { text: this.elements["text"].value };
  await addAPI(text);
  this.reset();
  await getTextTask();
});

// dele li
listTask.addEventListener("click", async function (e) {
  if (e.target.matches(".close")) {
    const id = +e.target.dataset.id;
    await delText(id);
    await getTextTask();
  } else if (e.target.matches(".course-edit")) {
    const id = +e.target.dataset.id;
    const data = await getCourse(id);
    formTask.elements["text"].value = data.text;
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

getTextTask();
