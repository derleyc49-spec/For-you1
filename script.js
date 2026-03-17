let current = 0;
let pages = [];

function checkPassword() {
  if (document.getElementById("password").value === "007@Mary") {
    show("cover");
  } else {
    document.getElementById("error").innerText = "Senha errada";
  }
}

function show(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function openBook() {
  current = 0;
  show("book");
  createPages();
}

function createPages() {
  const container = document.getElementById("pages-container");
  if (container.innerHTML !== "") return;

  const textos = [
`Mary (Batman) 🦇
Eu gosto de falar contigo.
Você melhora meu dia.`,

`Tudo é leve contigo.
E isso é raro.`,

`Eu sinto falta quando você some.
E isso diz muito.`,

`Tô ansioso pra te ver.
Dia 3 vai ser especial.`,

`Página em branco pra nossa história 💌`
  ];

  for (let i = 0; i < 50; i++) {

    let div = document.createElement("div");
    div.className = "page";

    let text = document.createElement("div");
    text.className = "text-content";

    if (i < textos.length) {
      text.innerHTML = textos[i].replace(/\n/g,"<br>");
    } else {
      text.contentEditable = true;
      text.innerHTML = localStorage.getItem("p"+i) || "";
      text.oninput = ()=> localStorage.setItem("p"+i,text.innerHTML);
    }

    let num = document.createElement("div");
    num.className = "page-number";
    num.innerText = i+1;

    div.appendChild(text);
    div.appendChild(num);
    container.appendChild(div);
  }

  pages = document.querySelectorAll(".page");
  pages[0].classList.add("active");

  applySavedColors();
}

function nextPage() {
  if (current < pages.length - 1) {
    pages[current].classList.remove("active");
    current++;
    pages[current].classList.add("active");
  }
}

function prevPage() {
  if (current === 0) {
    show("cover");
    return;
  }
  pages[current].classList.remove("active");
  current--;
  pages[current].classList.add("active");
}

/* cores */
function toggleSettings(){
  const p = document.getElementById("settings");
  p.style.display = p.style.display === "flex" ? "none" : "flex";
}

function setColor(c){
  localStorage.setItem("bookColor", c);
  document.querySelectorAll(".page").forEach(p=>p.style.background=c);
}

function setTextColor(c){
  localStorage.setItem("textColor", c);
  document.querySelectorAll(".text-content").forEach(t=>t.style.color=c);
}

function applySavedColors(){
  let bc = localStorage.getItem("bookColor");
  let tc = localStorage.getItem("textColor");

  if(bc){
    document.querySelectorAll(".page").forEach(p=>p.style.background=bc);
  }

  if(tc){
    document.querySelectorAll(".text-content").forEach(t=>t.style.color=tc);
  }
}
