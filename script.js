document.getElementById('search-button').addEventListener('click', function() {
    let input = document.getElementById('search-input').value;
    searchPokemon(input);
});

document.getElementById('prev-pokemon').addEventListener('click', function() {
    changePokemon(-1);
});

document.getElementById('next-pokemon').addEventListener('click', function() {
    changePokemon(1);
});

let currentPokemonId = 0;
let chartInstance = null;

function searchPokemon(query) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('無効な入力です');
            }
            return response.json();
        })
        .then(data => {
            currentPokemonId = data.id;
            displayPokemon(data);
        })
        .catch(error => {
            console.error('Error:', error);
            displayError(error.message);
        });
}

function changePokemon(change) {
    let newId = currentPokemonId + change;
    if (newId < 1) newId = 1;
    searchPokemon(newId.toString());
}

function displayPokemon(data) {
    let infoDiv = document.getElementById('pokemon-info');
    infoDiv.innerHTML = `
        <h2>${data.name}</h2>
        <img src="${data.sprites.front_default}" alt="${data.name}">
        <p>図鑑番号: ${data.id}</p>
        <p>タイプ: ${data.types.map(type => type.type.name).join(', ')}</p>
        <p>HP: ${data.stats[0].base_stat}</p>
        <p>攻撃: ${data.stats[1].base_stat}</p>
        <p>防御: ${data.stats[2].base_stat}</p>
        <p>特攻: ${data.stats[3].base_stat}</p>
        <p>特防: ${data.stats[4].base_stat}</p>
        <p>素早さ: ${data.stats[5].base_stat}</p>
    `;
    updateChart(data);
}

function displayError(message) {
    let infoDiv = document.getElementById('pokemon-info');
    infoDiv.innerHTML = `<p>${message}</p>`;
}

function updateChart(data) {
    if (chartInstance) {
        chartInstance.destroy();
    }
    let stats = data.stats.map(s => s.base_stat);
    let ctx = document.getElementById('pokemonStatsChart').getContext('2d');
    chartInstance = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['HP', '攻撃', '防御', '特攻', '特防', '素早さ'],
            datasets: [{
                label: data.name,
                data: stats,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                r: {
                    angleLines: {
                        display: false
                    },
                    suggestedMin: 0
                }
            }
        }
    });
}
