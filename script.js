document.getElementById('search-button').addEventListener('click', function() {
    let input = document.getElementById('search-input').value;
    searchPokemon(input);
});

function searchPokemon(query) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('無効な入力です');
            }
            return response.json();
        })
        .then(data => displayPokemon(data))
        .catch(error => {
            console.error('Error:', error);
            displayError(error.message); // エラーメッセージを表示
        });
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
}

function displayError(message) {
    let infoDiv = document.getElementById('pokemon-info');
    infoDiv.innerHTML = `<p>${message}</p>`;
}
