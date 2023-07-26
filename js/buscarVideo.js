import { conectaAPI } from "./conectaAPI.js";
import constroiCards from "./mostrarVideos.js";

async function buscarVideo(evento) {
    evento.preventDefault();

    const dadosDePesquisa = document.querySelector("[data-pesquisa]").value;
    const busca = await conectaAPI.buscaVideo(dadosDePesquisa);

    const lista = document.querySelector("[data-lista]")

    while (lista.firstChild) {
        lista.removeChild(lista.firstChild)
    }

    busca.forEach(elemento => lista.appendChild(
        constroiCards(elemento.titulo, elemento.descricao, elemento.url, elemento.imagem)
        ));

    if (busca.length == 0) {
        lista.innerHTML = `<h2 class="mensagem__titulo">Não existem videos com esse termo</h2>`
    }    
}

const botao = document.querySelector("[data-botao-pesquisa]")

botao.addEventListener("click", evento => buscarVideo(evento))