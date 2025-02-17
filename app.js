function fnBuscarPrevisao() {
    let cidade = document.getElementById("input-cidade").value.trim();
    if (cidade) {
        fnPrevisaoDoTempo(cidade);
    } else {
        alert("Digite o nome de uma cidade!");
    }
}

function fnPrevisaoDoTempo(cidade) {
    const url = `https://goweather.herokuapp.com/weather/${cidade}`;
    
    fetch(url)
        .then(resposta => resposta.json())
        .then(dados => {
            if (dados.temperature) {
                fnExibirInformacoes(cidade, dados.temperature, dados.description, dados.wind);
            } else {
                alert("Cidade não encontrada!");
            }
        })
        .catch(error => {
            console.error("Erro ao buscar previsão:", error);
            alert("Erro ao buscar a previsão. Tente novamente mais tarde.");
        });
}

function fnExibirInformacoes(cidade, temperatura, descricao, vento) {
    document.getElementById("cidade").innerText = cidade;
    document.getElementById("temperatura").innerText = temperatura;
    document.getElementById("descricao").innerText = descricao;
    document.getElementById("vento").innerText = vento;
    document.getElementById("hora-atual").innerText = new Date().toLocaleTimeString();

    // Atualiza o ícone com base na descrição do tempo
    let icon = "bi-cloud";
    if (descricao.toLowerCase().includes("rain")) {
        icon = "bi-cloud-rain";
    } else if (descricao.toLowerCase().includes("sun")) {
        icon = "bi-brightness-high";
    } else if (descricao.toLowerCase().includes("storm")) {
        icon = "bi-cloud-lightning-rain";
    } else if (descricao.toLowerCase().includes("snow")) {
        icon = "bi-snow";
    }

    document.getElementById("weather-icon").className = `bi ${icon} weather-icon`;

    fnUmidade(descricao)
}

function fnUmidade(descricao){
    let umidadeValor = "";

    if(descricao.toLowerCase().includes("rain")){
        umidadeValor = "82";
    }else if(descricao.toLowerCase().includes("sun")){
        umidadeValor = "40";
    }else if(descricao.toLowerCase().includes("storm")){
        umidadeValor = "95";
    }else{
        umidadeValor = "50";
    }

    document.getElementById("umidade").innerText = umidadeValor + "%";
}