// Toggle do menu hamburguer
const btnMenu = document.getElementById("btnMenu");
const mainNav = document.getElementById("mainNav");

if (btnMenu && mainNav) {
  btnMenu.addEventListener("click", () => {
    mainNav.classList.toggle("open");
  });
}

// Seletores do dashboard
const selectRegion = document.getElementById("selectRegion");
const selectPeriod = document.getElementById("selectPeriod");
const kpiTemp = document.getElementById("kpiTemp");
const kpiUmi = document.getElementById("kpiUmi");
const kpiChuva = document.getElementById("kpiChuva");
const kpiRisco = document.getElementById("kpiRisco");
const alertList = document.getElementById("alertList");
const recommendationList = document.getElementById("recommendationList");
const summaryList = document.getElementById("summaryList");

// Botões de ação rápida
const btnRegistrar = document.getElementById("btnRegistrar");
const btnRelatorio = document.getElementById("btnRelatorio");
const btnAbrirAssistente = document.getElementById("btnAbrirAssistente");

// Chat IA
const iaChat = document.getElementById("iaChat");
const fabChat = document.getElementById("fabChat");
const btnOpenChat = document.getElementById("btnOpenChat");
const btnCloseChat = document.getElementById("btnCloseChat");
const iaChatBody = document.getElementById("iaChatBody");
const iaChatForm = document.getElementById("iaChatForm");
const iaMessageInput = document.getElementById("iaMessage");

// ==== DADOS SIMULADOS POR REGIÃO ====

const fakeData = {
  agro_sp: {
    temp: "28 °C",
    umi: "62 %",
    chuva: "18 mm",
    risco: "Moderado",
    resumo: [
      "Máxima registrada: 32 °C",
      "Mínima registrada: 21 °C",
      "Chuva mais intensa: 12 mm em 1h",
      "ICA médio: 35 (bom)"
    ],
    alertas: [
      "Possível chuva forte no final da tarde.",
      "Temperaturas acima da média para o período."
    ],
    recomendacoes: [
      "Ajustar irrigação para evitar encharcamento.",
      "Rever agenda de colheita em áreas mais baixas.",
      "Monitorar previsões nas próximas 4 horas."
    ]
  },
  log_rj: {
    temp: "30 °C",
    umi: "70 %",
    chuva: "45 mm",
    risco: "Alto",
    resumo: [
      "Máxima registrada: 33 °C",
      "Mínima registrada: 24 °C",
      "Acúmulo de chuva significativo nas últimas 24h.",
      "ICA médio: 52 (moderado)"
    ],
    alertas: [
      "Risco de alagamentos em rotas urbanas.",
      "Visibilidade reduzida em determinados trechos."
    ],
    recomendacoes: [
      "Redirecionar rotas em áreas de risco de alagamento.",
      "Reforçar comunicação com equipes em campo.",
      "Consultar atualização a cada 2 horas."
    ]
  },
  const_bh: {
    temp: "24 °C",
    umi: "55 %",
    chuva: "5 mm",
    risco: "Baixo",
    resumo: [
      "Máxima registrada: 26 °C",
      "Mínima registrada: 18 °C",
      "Chuva fraca e isolada.",
      "ICA médio: 28 (bom)"
    ],
    alertas: [
      "Sem eventos críticos no momento."
    ],
    recomendacoes: [
      "Atividades externas mantidas sem restrições.",
      "Manter monitoramento de ventos para estruturas altas.",
      "Revisar previsão em 12 horas."
    ]
  }
};

// Atualiza o dashboard quando muda a região ou o período
function atualizarDashboard() {
  const region = selectRegion ? selectRegion.value : "default";

  if (!fakeData[region]) {
    if (kpiTemp) kpiTemp.textContent = "-- °C";
    if (kpiUmi) kpiUmi.textContent = "-- %";
    if (kpiChuva) kpiChuva.textContent = "-- mm";
    if (kpiRisco) kpiRisco.textContent = "Aguardando dados";

    if (alertList) {
      alertList.innerHTML = "<li>Nenhum alerta carregado. Selecione uma região.</li>";
    }
    if (recommendationList) {
      recommendationList.innerHTML = "<li>Selecione uma região para visualizar recomendações específicas.</li>";
    }
    if (summaryList) {
      summaryList.innerHTML = "";
    }
    return;
  }

  const data = fakeData[region];

  if (kpiTemp) kpiTemp.textContent = data.temp;
  if (kpiUmi) kpiUmi.textContent = data.umi;
  if (kpiChuva) kpiChuva.textContent = data.chuva;
  if (kpiRisco) kpiRisco.textContent = data.risco;

  if (alertList) {
    alertList.innerHTML = "";
    data.alertas.forEach((a) => {
      const li = document.createElement("li");
      li.textContent = a;
      alertList.appendChild(li);
    });
  }

  if (recommendationList) {
    recommendationList.innerHTML = "";
    data.recomendacoes.forEach((rec) => {
      const li = document.createElement("li");
      li.textContent = rec;
      recommendationList.appendChild(li);
    });
  }

  if (summaryList) {
    summaryList.innerHTML = "";
    data.resumo.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      summaryList.appendChild(li);
    });
  }
}

if (selectRegion) {
  selectRegion.addEventListener("change", atualizarDashboard);
}
if (selectPeriod) {
  selectPeriod.addEventListener("change", atualizarDashboard);
}

// ==== AÇÕES RÁPIDAS (apenas feedback visual no protótipo) ====

function mostrarToastSimples(msg) {
  alert(msg); // pode virar um toast bonitinho depois
}

if (btnRegistrar) {
  btnRegistrar.addEventListener("click", () => {
    mostrarToastSimples("Aqui você pode integrar com a tela de registro de dados climáticos.");
  });
}

if (btnRelatorio) {
  btnRelatorio.addEventListener("click", () => {
    mostrarToastSimples("Aqui você pode gerar um relatório automático em PDF ou outra saída.");
  });
}

if (btnAbrirAssistente) {
  btnAbrirAssistente.addEventListener("click", () => {
    abrirChatIA();
  });
}

// ==== CHAT DO ESPECIALISTA DE IA ====

// Abre/fecha o chat
function abrirChatIA() {
  if (iaChat) {
    iaChat.classList.add("open");
    iaChat.setAttribute("aria-hidden", "false");
  }
}

function fecharChatIA() {
  if (iaChat) {
    iaChat.classList.remove("open");
    iaChat.setAttribute("aria-hidden", "true");
  }
}

if (fabChat) {
  fabChat.addEventListener("click", abrirChatIA);
}
if (btnOpenChat) {
  btnOpenChat.addEventListener("click", abrirChatIA);
}
if (btnCloseChat) {
  btnCloseChat.addEventListener("click", fecharChatIA);
}

// Simulador de respostas simples do "Especialista IA"
function gerarRespostaIA(texto) {
  const pergunta = texto.toLowerCase();

  if (pergunta.includes("chuva") || pergunta.includes("tempestade")) {
    return "Com base nos dados atuais, há probabilidade de chuva forte nas próximas horas. Recomendo revisar rotas e atividades externas.";
  }

  if (pergunta.includes("risco") || pergunta.includes("alerta")) {
    return "O nível de risco é calculado a partir de extremos de temperatura, volume de chuva e qualidade do ar. Verifique o card 'Nível de risco atual' no dashboard.";
  }

  if (pergunta.includes("logística") || pergunta.includes("rota")) {
    return "Para logística, o ideal é evitar regiões com chuva intensa e risco de alagamento. Use o mapa e os alertas para redirecionar rotas críticas.";
  }

  if (pergunta.includes("agro") || pergunta.includes("agronegócio") || pergunta.includes("plantio")) {
    return "No agronegócio, recomendo acompanhar umidade do solo, volume de chuva acumulada e eventos de estiagem. Ajuste irrigação conforme as projeções.";
  }

  if (pergunta.includes("const") || pergunta.includes("obra") || pergunta.includes("construção")) {
    return "Para obras, atenção especial a ventos fortes, chuvas intensas e variações bruscas de temperatura que possam impactar estruturas e cronogramas.";
  }

  if (pergunta.includes("como funciona") || pergunta.includes("climatewise")) {
    return "O ClimateWise centraliza dados climáticos, analisa padrões e gera recomendações automáticas para apoiar decisões em tempo real.";
  }

  return "Entendi sua pergunta. Com base nos indicadores, avalie sempre risco, impacto operacional e necessidade de ações preventivas. Se quiser, detalhe o setor (logística, agro, construção) para uma resposta mais específica.";
}

// Adiciona mensagem na janela do chat
function adicionarMensagem(texto, autor = "user") {
  if (!iaChatBody) return;
  const div = document.createElement("div");
  div.classList.add("msg");
  if (autor === "bot") {
    div.classList.add("msg-bot");
  } else {
    div.classList.add("msg-user");
  }
  div.textContent = texto;
  iaChatBody.appendChild(div);
  iaChatBody.scrollTop = iaChatBody.scrollHeight;
}

// Envio do formulário do chat
if (iaChatForm && iaMessageInput) {
  iaChatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const texto = iaMessageInput.value.trim();
    if (!texto) return;

    adicionarMensagem(texto, "user");
    iaMessageInput.value = "";

    // “IA” responde com base em palavras-chave
    const resposta = gerarRespostaIA(texto);
    setTimeout(() => {
      adicionarMensagem(resposta, "bot");
    }, 500);
  });
}

// Inicializa o estado padrão
atualizarDashboard();
