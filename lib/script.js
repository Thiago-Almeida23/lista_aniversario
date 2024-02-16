function adicionarAniversariante(nome, dataNascimento) {
    aniversariantes.push({ nome, dataNascimento });
    document.getElementById('aniversariantesCardContainer').style.display = 'none';
}

function exibirAniversariantesDoMes(mes) {
    const aniversariantesDoMes = aniversariantes.filter(aniversariante => {
        const data = new Date(aniversariante.dataNascimento + 'T00:00:00');
        return data.getMonth() + 1 === mes;
    });

    aniversariantesDoMes.sort((a, b) => {
        const dataA = new Date(a.dataNascimento + 'T00:00:00');
        const dataB = new Date(b.dataNascimento + 'T00:00:00');
        return dataA.getDate() - dataB.getDate();
    });

    const listaAniversariantes = document.getElementById('aniversariantesLista');
    listaAniversariantes.innerHTML = '';

    const nomeMes = document.getElementById('selectMeses').options[mes].text;
    document.getElementById('mesAniversariantesHeader').innerText = nomeMes;

    if (aniversariantesDoMes.length === 0) {
        listaAniversariantes.innerHTML = '<li class="list-group-item">Nenhum aniversariante neste mês.</li>';
    } else {
        aniversariantesDoMes.forEach(aniversariante => {
            const data = new Date(aniversariante.dataNascimento + 'T00:00:00');
            const dia = data.getDate();
            listaAniversariantes.innerHTML += `<li class="list-group-item">${aniversariante.nome} (dia ${dia})</li>`;
        });
    }

    const containerAniversariantes = document.getElementById('aniversariantesCardContainer');
    containerAniversariantes.style.display = 'block';
}

const aniversariantes = [];

document.getElementById('novoAniversarianteForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const dataNascimento = document.getElementById('dataNascimento').value;
    adicionarAniversariante(nome, dataNascimento);
    this.reset();
});

document.getElementById('cadastroLink').addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('cadastroContainer').style.display = 'block';
    document.getElementById('mesesContainer').style.display = 'none';
    document.getElementById('aniversariantesCardContainer').style.display = 'none';
    document.getElementById('gridMesesContainer').style.display = 'none';
});

document.getElementById('verPorMesLink').addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('cadastroContainer').style.display = 'none';
    document.getElementById('mesesContainer').style.display = 'block';
    document.getElementById('aniversariantesCardContainer').style.display = 'none';
    document.getElementById('gridMesesContainer').style.display = 'none';

    document.getElementById('selectMeses').selectedIndex = 0;
});

document.getElementById('selectMeses').addEventListener('change', function () {
    const mesSelecionado = parseInt(this.value);
    if (!isNaN(mesSelecionado)) {
        exibirAniversariantesDoMes(mesSelecionado);
    } else {
        document.getElementById('aniversariantesCardContainer').style.display = 'none';
    }
});

document.getElementById('verTodosMesesLink').addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('cadastroContainer').style.display = 'none';
    document.getElementById('mesesContainer').style.display = 'none';
    document.getElementById('aniversariantesCardContainer').style.display = 'none';
    document.getElementById('gridMesesContainer').style.display = 'block';

    exibirTodosMeses();
});

function exibirTodosMeses() {
    const meses = [
        { nome: 'Janeiro', numero: 1 },
        { nome: 'Fevereiro', numero: 2 },
        { nome: 'Março', numero: 3 },
        { nome: 'Abril', numero: 4 },
        { nome: 'Maio', numero: 5 },
        { nome: 'Junho', numero: 6 },
        { nome: 'Julho', numero: 7 },
        { nome: 'Agosto', numero: 8 },
        { nome: 'Setembro', numero: 9 },
        { nome: 'Outubro', numero: 10 },
        { nome: 'Novembro', numero: 11 },
        { nome: 'Dezembro', numero: 12 }
    ];

    const listaMeses = document.getElementById('gridMesesContainer');
    listaMeses.innerHTML = '';

    listaMeses.classList.add('grid-meses');

    meses.forEach(mes => {
        const aniversariantesDoMes = aniversariantes.filter(aniversariante => {
            const data = new Date(aniversariante.dataNascimento + 'T00:00:00');
            return data.getMonth() + 1 === mes.numero;
        });

        let listaAniversariantes = '';
        if (aniversariantesDoMes.length === 0) {
            listaAniversariantes = '<li class="list-group-item">Nenhum aniversariante neste mês.</li>';
        } else {
            aniversariantesDoMes.forEach(aniversariante => {
                const data = new Date(aniversariante.dataNascimento + 'T00:00:00');
                const dia = data.getDate();
                listaAniversariantes += `<li class="list-group-item">${aniversariante.nome} (dia ${dia})</li>`;
            });
        }

        listaMeses.innerHTML += `
            <div class="card">
                <div class="card-header">${mes.nome}</div>
                <ul class="list-group list-group-flush">
                    ${listaAniversariantes}
                </ul>
            </div>
        `;
    });
}
