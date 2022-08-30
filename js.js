

function envia() {
    const nomeMercado = document.getElementById('nomeMercado');
    const logoMercado = document.getElementById('logoMercado');

    window.localStorage.setItem('nomeMercado', nomeMercado.value);
    window.localStorage.setItem('logoMercado', logoMercado.value);
}

const createModal = (index) => {
    document.getElementById(`containerProdutos_${index}`).style.display = 'block'
    document.getElementById('imagem2').style.zIndex = 0;
    document.getElementById('voltarParaOLado').style.zIndex = 0;
}
const fecharModal = (index) => {
    document.getElementById(`containerProdutos_${index}`).style.display = 'none'
    document.getElementById(`imgFtProduto_${index}`).style.display = 'block';
}

const fecharEditar = (index) => {
    document.getElementById(`modalEditar${index}`).style.display = 'none'
}

const openEditar = (index) => {
    document.getElementById(`modalEditar${index}`).style.display = 'block'
    document.getElementById('imagem2').style.zIndex = 0;
    document.getElementById('voltarParaOLado').style.zIndex = 0;
}

function irParaOLado(index) {
    document.getElementById(`imgFtProduto_${index}`).style.display = 'none';
}

const voltarParaOLado = (index) => {
    document.getElementById(`imgFtProduto_${index}`).style.display = 'block';
}

const procuraDB = () => JSON.parse(localStorage.getItem("db_produtos")) ?? [];
const adicionaDB = (dadosProdutos) => localStorage.setItem("db_produtos", JSON.stringify(dadosProdutos));

const createProduct = (produtos) => {
    const dadosProdutos = procuraDB();
    dadosProdutos.push(produtos);
    adicionaDB(dadosProdutos);
}

const readProduct = () => procuraDB();

const deletar = (index) => {
    const dbProduto = readProduct();
    const resposta = confirm("Deseja excluir mesmo?")
    if (resposta) {
        dbProduto.splice(index, 1);
        adicionaDB(dbProduto);
        atualizarTabela()
    }
}

const validarCampos = () => {
    return document.getElementById('containerInputs').reportValidity();
}

const limparCampos = () => {
    const campos = document.querySelectorAll('.camposInputs')
    campos.forEach(campos => campos.value = "")
}

const saveProduto = () => {
    if (validarCampos()) {
        const produtos = {
            codigo: document.getElementById('codigoProduto').value,
            nomeProduto: document.getElementById('nomeProduto').value,
            tipoMedida: document.getElementById('unidadeMedida').value,
            descricao: document.getElementById('descricao').value,
            tipoProduto: document.getElementById('categoriaProduto').value,
            qtdProduto: document.getElementById('qtdProduto').value,
            numCorredor: document.getElementById('numCorredor').value,
            numPrateleira: document.getElementById('numPrateleira').value,
            fotoLocalizacao: document.getElementById('fotoLocalizacao').value,
            fotoProduto: document.getElementById('fotoProduto').value,
            preco: document.getElementById('precoProduto').value
        }
        createProduct(produtos);
        limparCampos();
    }
}

const criarLinha = (produto, index) => {
    const novaLinha = document.createElement('tr');
    novaLinha.innerHTML = `
    <td>${produto.codigo}</td>
    <td>${produto.nomeProduto}</td>
    <td>${produto.tipoMedida}</td>
    <td>${produto.descricao}</td>
    <td>${produto.tipoProduto}</td>
    <td>${produto.qtdProduto}</td>
    <td>${produto.numCorredor}</td>
    <td>${produto.numPrateleira}</td>
    <td>${produto.preco}</td>
    <td id="botaoVisu"><input type="text" class="botaoVisualizar" onclick="createModal(${index})" value="VISUALIZAR" readonly></td>
    <div id="containerProdutos_${index}" class="containerProdutos">
        <div class="botoes">
            <button class="botaoEditar" onclick="openEditar(${index})">Editar</button>
            <button class="botaoDeletar" onclick="deletar(${index})">Deletar</button>
        </div>
        <div>
            <img src="${produto.fotoLocalizacao}" id="imagem2" id="imgFtLocalizacao_${index}">
            <img src="${produto.fotoProduto}" class="imagem1" id="imgFtProduto_${index}">
        </div>
        <buttom id="xis" onclick="fecharModal(${index})">
            <div id="xizinho">X</div>
        </buttom>
        <buttom id="irParaOLado" id="irParaOLado_${index}" onclick="irParaOLado(${index})">
            <div id="setinha">></div>
        </buttom>
        <buttom id="voltarParaOLado" id="voltarParaOLado_${index}" onclick="voltarParaOLado(${index})">
            <div id="setinha"><</div>
        </buttom>
        <div class="mexerInputs">
            <div id="ladoEsquerdo">
                <label class="tituloInputsEsquerdo">Nome do produto:</label>
                <br>
                <input id="modalNome" class="inputsModalEsquerdo" type="text" value="${produto.nomeProduto}" readonly>
                <br>
                <br>
                <label class="tituloInputsEsquerdo">Código:</label>
                <br>
                <input id="modalCodigo" class="inputsModalEsquerdo" type="text" value="${produto.codigo}" readonly>
                <br>
                <br>
                <label class="tituloInputsEsquerdo">Preço:</label>
                <br>
                <input id="modalPreco" class="inputsModalEsquerdo" type="number" value="${produto.preco}" readonly>
                <br>
                <br>
                <label class="tituloInputsEsquerdo">Tipo do produto:</label>
                <br>
                <input id="modalTipoProduto" class="inputsModalEsquerdo" type="text" value="${produto.tipoProduto}" readonly>
                <br>
                <br>
                <label class="tituloInputsEsquerdo">Número do corredor:</label>
                <br>
                <input id="modalNumCorredor" class="inputsModalEsquerdo" type="number" value="${produto.numCorredor}" readonly>
            </div>
            <div id="ladoDireito">
                <label class="tituloInputsDireito">Número da prateleira:</label>
                <input id="modalNumPrateleira" class="inputsModalDireito" type="number" value="${produto.numPrateleira}" readonly>
                <br>
                <br>
                <label class="tituloInputsDireito">Unidade de medida:</label>
                <br>
                <input id="modalMedida" class="inputsModalDireito" type="text" value="${produto.tipoMedida}" readonly>
                <br>
                <br>
                <label class="tituloInputsDireito">Quantidade:</label>
                <br>
                <input id="modalQuantidade" class="inputsModalDireito" type="text" value="${produto.qtdProduto}" readonly>
                <br>
                <br>
                <label class="tituloInputsDireito">Descrição:</label>
                <br>
                <input id="modalQuantidade" class="inputsModalDireito" type="text" value="${produto.descricao}" readonly>
                <br>
                <br>
                <label class="tituloInputsDireito">Total:</label>
                <br>
                <input id="modalTotalEstoque" class="inputsModalDireito" type="number" value="${(produto.preco * produto.qtdProduto)}" readonly>
            </div>
        </div>
    </div>
    <div id="modalEditar${index}" class="containerProdutos1">
                <img src="${produto.fotoProduto}" class="imagem1" id="imgFtProduto_${index}">
                <buttom id="xis" onclick="fecharEditar(${index})">
                    <div id="xizinho">X</div>
                </buttom>
                <button id="confirmar" id="confirmar_${index}" onclick="editarProduct(${index})">
                    <div id="escritoConfirmar">CONFIRMAR</div>
                </button>
                <button id="cancelar" onclick="fecharEditar(${index})">
                    <div id="escritoCancelar">CANCELAR</div>
                </button>
                <div>
                    <div class="mexerInputs" id="mexerInputs">
                        <div id="ladoEsquerdo1">
                            <label class="tituloInputsEsquerdo">Nome do produto:</label>
                            <br>
                            <input id="editNome" class="inputsModalEsquerdo" type="text" value="${produto.nomeProduto}" >
                            <br>
                            <br>
                            <label class="tituloInputsEsquerdo">Código:</label>
                            <br>
                            <input id="editCodigo" class="inputsModalEsquerdo" type="text" value="${produto.codigo}" >
                            <br>
                            <br>
                            <label class="tituloInputsEsquerdo">Preço:</label>
                            <br>
                            <input id="editPreco" class="inputsModalEsquerdo" type="number" value="${produto.preco}" >
                            <br>
                            <br>
                            <label class="tituloInputsEsquerdo">Tipo do produto:</label>
                            <br>
                            <input id="editTipoProduto" class="inputsModalEsquerdo" type="text" value="${produto.tipoProduto}" >
                            <br>
                            <br>
                            <label class="tituloInputsEsquerdo">Número do corredor:</label>
                            <br>
                            <input id="editNumCorredor" class="inputsModalEsquerdo" type="number" value="${produto.numCorredor}" >
                            <br>
                            <br>
                            <label class="tituloInputsDireito">Número da prateleira:</label>
                            <br>
                            <input id="editNumPrateleira" class="inputsModalDireito" type="number" value="${produto.numPrateleira}" >
                            <br>
                        </div>
                        <div id="ladoDireito1">
                            <label class="tituloInputsDireito">Unidade de medida:</label>
                            <br>
                            <input id="editMedida" class="inputsModalDireito" type="text" value="${produto.tipoMedida}" >
                            <br>
                            <br>
                            <label class="tituloInputsDireito">Quantidade:</label>
                            <br>
                            <input id="editQuantidade" class="inputsModalDireito" type="text" value="${produto.qtdProduto}" >
                            <br>
                            <br>
                            <label class="tituloInputsDireito">Descrição:</label>
                            <br>
                            <input id="editDescricao" class="inputsModalDireito" type="text" value="${produto.descricao}" >
                            <br>
                            <br>
                            <label class="tituloInputsDireito">Foto do Produto:</label>
                            <br>
                            <input id="editFotoProduto" class="inputsModalDireito" type="text" value="${produto.fotoProduto}" >
                            <br>
                            <br>
                            <label class="tituloInputsDireito">Foto da Localização:</label>
                            <br>
                            <input id="editFotoLocalizacao" class="inputsModalDireito" type="text" value="${produto.fotoLocalizacao}" ><br>
                            <br>
                            <label class="tituloInputsDireito">Total:</label>
                            <br>
                            <input id="modalTotalEstoque" class="inputsModalDireito" type="number" value="${(produto.preco * produto.qtdProduto)}" readonly>
                        </div>
                    </div>
    </div>
    `
    let validacao = document.querySelector('#tblDados tbody');
    if (validacao) {
        validacao.appendChild(novaLinha);
    }
}

const deletarEdit = (index) => {
    const dbProduto = readProduct();
    const resposta = confirm("Confirma as edições?")
    if (resposta) {
        dbProduto.splice(index, 1);
        adicionaDB(dbProduto);
        atualizarTabela()
    }
}

const editarProduct = (index) => {
    const produtos = {
        codigo: document.getElementById('editCodigo').value,
        nomeProduto: document.getElementById('editNome').value,
        tipoMedida: document.getElementById('editMedida').value,
        descricao: document.getElementById('editDescricao').value,
        tipoProduto: document.getElementById('editTipoProduto').value,
        qtdProduto: document.getElementById('editQuantidade').value,
        numCorredor: document.getElementById('editNumCorredor').value,
        numPrateleira: document.getElementById('editNumPrateleira').value,
        fotoLocalizacao: document.getElementById('editFotoLocalizacao').value,
        fotoProduto: document.getElementById('editFotoProduto').value,
        preco: document.getElementById('editPreco').value
    }
    createProduct(produtos);
    deletarEdit(index);
}

const nomeLogo = (nomeMercado, logoMercado) => {
    let listaObjetos = procuraDB();
    let armazenarQuantidade = 0;
    for(let i = 0; i < listaObjetos.length; i++){
        armazenarQuantidade += (listaObjetos[i].qtdProduto * listaObjetos[i].preco);
    }
    const novaLinha = document.createElement('div');
    novaLinha.innerHTML = `
        <div id="root">
            <div class="barraNavegacao">
                <ul>
                    <a href="PaginaListar.html">
                        <li>LISTAR</li>
                    </a>
                    <a href="páginaInicial.html">
                        <li>CADASTRAR</li>
                    </a>
                    <a href="index.html">
                        <li onclick="excluirTudo()">REMOVER TUDO</li>
                    </a>
                </ul>
                <div id="logoMercado">
                    <img src="${logoMercado}" id="editLogoMercado">
                </div>
                <div>
                    <h3 id="editNomeMercado">${nomeMercado}</h3>
                </div>
                <div class="precoTotal">Total do estoque: R$ ${armazenarQuantidade}</div>
            </div>
        </div>
    `
    let validacao = document.getElementById('testeNavBar');
    if (validacao) {
        validacao.appendChild(novaLinha);
    }

    atualizarTabela();
}

const excluirTudo = () => {
    const resposta = confirm("Tem certeza que gostaria de remover tudo?")
    if (resposta) {
        localStorage.clear();
    }
}

const limparTabela = () => {
    const linhas = document.querySelectorAll('#tblDados>tbody tr')
    linhas.forEach(row => row.parentNode.removeChild(row))
}

const atualizarTabela = () => {
    const lerProdutos = readProduct();
    limparTabela()
    lerProdutos.forEach(criarLinha)
}

const nomeMercado = localStorage.getItem('nomeMercado');
const logoMercado = localStorage.getItem('logoMercado');
nomeLogo(nomeMercado, logoMercado);
atualizarTabela()

window.onload = function () {
    let salvar = document.getElementById('salvar');
    if (salvar) {
        salvar.addEventListener('click', saveProduto)
    }
}