// Define the PokeAPI URL
const PokeAPI = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/";

// Get Input Elements
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const searchForm = document.getElementById("search-form");

// Get UI Elements - Top Container
const pokemonId = document.getElementById("pokemon-id");
const pokemonName = document.getElementById("pokemon-name");
const pokemonWeight = document.getElementById("weight");
const pokemonHeight = document.getElementById("height");
const pokemonTypes = document.getElementById("types");
const spriteContainer = document.getElementById("sprite-container");

// Get UI Elements - Bottom Container
const pokemonHp = document.getElementById("hp");
const pokemonAttack = document.getElementById("attack");
const pokemonDefense = document.getElementById("defense");
const pokemonSpAtk = document.getElementById("special-attack");
const pokemonSpDef = document.getElementById("special-defense");
const pokemonSpeed = document.getElementById("speed");

// Fetch Function to get Pokémon data
const getPokemons = async () => {
  try {
    // Get the name or id of the Pokémon from input
    const searchPokemonNameOrId = searchInput.value.toLowerCase();

    // Fetch Pokémon data from the PokeAPI
    const res = await fetch(`${PokeAPI}${searchPokemonNameOrId}`);
    const data = await res.json();

    // Update UI with Pokémon information in the Top Container
    pokemonId.textContent = `#${data.id}`;
    pokemonName.textContent = `${data.name.toUpperCase()}`;
    pokemonWeight.textContent = `Weight: ${data.weight}`;
    pokemonHeight.textContent = `Height: ${data.height}`;
    spriteContainer.innerHTML = `
      <img id="sprite" src="${data.sprites.front_default}" alt="${data.name}">
    `;

    // Display Pokémon types
    pokemonTypes.innerHTML = data.types
      .map((obj) => `
        <span class="type ${obj.type.name}">
          ${obj.type.name}
        </span>
      `)
      .join("");

    // Update UI with Pokémon information in the Bottom Container
    pokemonHp.textContent = data.stats[0].base_stat;
    pokemonAttack.textContent = data.stats[1].base_stat;
    pokemonDefense.textContent = data.stats[2].base_stat;
    pokemonSpAtk.textContent = data.stats[3].base_stat;
    pokemonSpDef.textContent = data.stats[4].base_stat;
    pokemonSpeed.textContent = data.stats[5].base_stat;

  } catch (err) {
    // Reset UI if Pokémon is not found and show alert
    resetDisplay();
    alert("Pokémon not found");
  }
};

// Reset Display Function to clear UI
const resetDisplay = () => {
  const sprite = document.getElementById("sprite");
  if (sprite) sprite.remove(); // Remove the Pokémon sprite if it exists
  pokemonName.textContent = "";
  pokemonId.textContent = "";
  pokemonTypes.innerHTML = "";
  pokemonHeight.textContent = "";
  pokemonWeight.textContent = "";
  pokemonHp.textContent = "";
  pokemonAttack.textContent = "";
  pokemonDefense.textContent = "";
  pokemonSpAtk.textContent = "";
  pokemonSpDef.textContent = "";
  pokemonSpeed.textContent = "";
};

// Event listener for the form submission to search for Pokémon
searchForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent the default form submission
  getPokemons(); // Call the function to fetch and display Pokémon data
});
