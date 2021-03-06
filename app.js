const getPokemonUrl = id => `https://pokeapi.glitch.me/v1/pokemon/${id}`
const fetchPokemon = () =>{

    const pokemonPromises = []
    for(let i = 1; i <= 150; i++)
    {
        if( i != 67)
            pokemonPromises.push(fetch(getPokemonUrl(i)).then(response => response.json()))  
    }

    Promise.all(pokemonPromises)
        .then(pokemons => {

            const lisPokemons = pokemons.reduce((accumulator, pokemon) => {
                const types = pokemon.types.map(typeInfo => typeInfo.type.name)
                accumulator += `
                <li class= "card ${types[0]}">
                <img class="card-image" alt="${pokemon.name}" src="https://cdn.traction.one/pokedex/pokemon/${pokemon.id}"/>
                   <h2 class= "card-title">${pokemon.id}.${pokemon.name}</h2> 
                   <p class = "card-subtitle">${types.join(' | ')}</p>
                </li> `
                return accumulator
            }, '')
            
            const ul = document.querySelector('[data-js="pokedex"]')
            ul.innerHTML = lisPokemons
        })
}

fetchPokemon()
