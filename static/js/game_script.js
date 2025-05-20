const score_text = document.querySelector("#score");
const first_tab = document.querySelector(".first-tab");
const sec_tab = document.querySelector(".sec-tab");
const third_tab = document.querySelector(".third-tab");
const scene = document.querySelector("#scene-img");
const evidences_container = document.querySelector(".evidences-container");
let score = 0;
let tab = 1;
let evidencias = [];
let cards_sequencia = [];
let suspects_sequencia = [];
let sequencia_da_cena = "";

const fios = {
  nome: "FIOS DE CABELO",
  descricao:
    "Fios de cabelo encontrados próximos ao corpo, possíveis vestígios deixados durante o contato físico.",
  icone: "/static/imgs/evidences/evidencia1.png",
};

const sangue = {
  nome: "AMOSTRA DE SANGUE",
  descricao:
    "Impressão digital identificada na cena, pode revelar quem esteve no local.",
  icone: "/static/imgs/evidences/evidencia2.png",
};

const digital = {
  nome: "IMPRESSÃO DIGITAL",
  descricao:
    "Manchas de sangue espalhadas pelo local, indicam luta ou ferimento durante o crime.",
  icone: "/static/imgs/evidences/evidencia3.png",
};

renderizar();

function aumentar(x) {
  score += x;
  atualizarPontos();
}

function atualizarPontos() {
  score_text.textContent = score;
}

function trocarTab() {
  if (tab == 3) {
    tab = 1;
    atualizarTab();
    console.log(tab);
  } else {
    tab++;
    atualizarTab();
    console.log(tab);
  }
}

function atualizarTab() {
  if (tab == 1) {
    first_tab.classList.remove("hide");
    sec_tab.classList.add("hide");
    third_tab.classList.add("hide");
  } else if (tab == 2) {
    first_tab.classList.add("hide");
    sec_tab.classList.remove("hide");
    third_tab.classList.add("hide");
  } else {
    first_tab.classList.add("hide");
    sec_tab.classList.add("hide");
    third_tab.classList.remove("hide");
  }
}

function renderizar() {
  // Geração da sequencia de base nitrogenada

  const bases_nitrogenadas = ["A", "T", "C", "G"];
  for (let i = 0; i < 4; i++) {
    sequencia_da_cena +=
      bases_nitrogenadas[Math.floor(Math.random() * bases_nitrogenadas.length)];
  }
  console.log(sequencia_da_cena);

  // Geração da cena

  scene.setAttribute(
    "src",
    `/static/imgs/scenes/Cena${Math.floor(Math.random() * 4) + 1}.png`
  );

  // Geração das evidências

  let numero_evidencias = Math.floor(Math.random() * 3) + 1;
  console.log(numero_evidencias);
  evidencias = [];
  for (let i = 0; i < numero_evidencias; i++) {
    let evidencia = Math.floor(Math.random() * 3) + 1;
    if (evidencia == 1) {
      evidencias.push(fios);
    } else if (evidencia == 2) {
      evidencias.push(sangue);
    } else {
      evidencias.push(digital);
    }
  }
  console.log(evidencias);

  // Geração da pista

  renderizarCards();

  let tip = `Após uma análise detalhada, foram encontradas evidências na cena do crime. Examine essas evidências e compare-as com as sequências obtidas dos suspeitos.`;
  document.querySelector(".scene-tip").textContent = tip;
}

function renderizarCards() {
  const card = document.querySelector(".evidence");
  for (let i = 0; i < evidencias.length; i++) {
    const bases_nitrogenadas = ["A", "T", "C", "G"];
    let sequencia_da_cena = "";
    for (let i = 0; i < 4; i++) {
      sequencia_da_cena +=
        bases_nitrogenadas[
          Math.floor(Math.random() * bases_nitrogenadas.length)
        ];
    }
    cards_sequencia.push(sequencia_da_cena);
  }
  cards_sequencia[Math.floor(Math.random() * cards_sequencia.length)] =
    sequencia_da_cena;
  console.log(cards_sequencia);

  let card_id = 0;
  evidencias.forEach((evidencia) => {
    const clone = card.cloneNode(true);
    console.log(evidencia);

    clone.querySelector(".titulo").innerText = evidencia.nome;
    clone.querySelector(".descricao").innerText = evidencia.descricao;
    clone.querySelector("img").setAttribute("src", `${evidencia.icone}`);
    clone.classList.remove("hide");
    clone.dataset.id = card_id;
    card_id++;

    evidences_container.appendChild(clone);
  });
}

function renderizarSuspeitos() {
  for (let i = 0; i < 3; i++) {
    const bases_nitrogenadas = ["A", "T", "C", "G"];
    let sequencia_da_cena = "";
    for (let i = 0; i < 4; i++) {
      sequencia_da_cena +=
        bases_nitrogenadas[
          Math.floor(Math.random() * bases_nitrogenadas.length)
        ];
    }
    suspects_sequencia.push(sequencia_da_cena);
  }
  console.log(suspects_sequencia);
  suspects_sequencia[Math.floor(Math.random() * cards_sequencia.length)] =
    sequencia_da_cena;

  let suspeitos = document.querySelectorAll(".suspect");

  suspeitos.forEach((suspeito, index) => {
    let p = suspeito.querySelector(".sequence");
    if (p) {
      p.textContent = suspects_sequencia[index];
    }
  });
}

function showSequence(event) {
  let id = event.target.parentElement.getAttribute("data-id");
  let timer = Math.floor(Math.random() * (22 - 14 + 1)) + 14;
  event.target.disabled = true;
  let interval = setInterval(() => {
    timer--;
    event.target.parentElement.querySelector(
      ".sequence"
    ).textContent = `ANALISANDO... (${timer})`;
    if (timer == 0) {
      event.target.parentElement.querySelector(".sequence").textContent =
        cards_sequencia[id];
      event.target.parentElement.querySelector("button").style.display = "none";
      clearInterval(interval);
    }
  }, 1000);
}

function acusarSuspeito(x) {
  if (suspects_sequencia[x] == sequencia_da_cena) {
    if (score == 9) {
      alert("VOCÊ GANHOU O JOGO!");
      window.location.href = "start_screen.html";
    }

    score++;
    atualizarPontos();
    alert("VOCÊ ACERTOU!");
    tab = 1;
    atualizarTab();
    const container = document.querySelector(".evidences-container");
    sequencia_da_cena = "";
    suspects_sequencia = [];
    cards_sequencia = [];

    container.querySelectorAll(":scope > div:not(.hide)").forEach((filho) => {
      container.removeChild(filho);
    });
    let suspeitos = document.querySelectorAll(".suspect");

    suspeitos.forEach((suspeito) => {
      let p = suspeito.querySelector(".sequence");
      if (p) {
        p.textContent = "???";
      }
    });

    renderizar();
  } else {
    if (score == 0) {
      alert("VOCÊ PERDEU O JOGO!");
      window.location.href = "start_screen.html";
    }
    score--;
    alert("VOCÊ ERROU!");
    atualizarPontos();
    tab = 1;
    atualizarTab();
    const container = document.querySelector(".evidences-container");
    sequencia_da_cena = "";
    suspects_sequencia = [];
    cards_sequencia = [];

    container.querySelectorAll(":scope > div:not(.hide)").forEach((filho) => {
      container.removeChild(filho);
    });
    let suspeitos = document.querySelectorAll(".suspect");

    suspeitos.forEach((suspeito) => {
      let p = suspeito.querySelector(".sequence");
      if (p) {
        p.textContent = "???";
      }
    });

    renderizar();
  }
}
