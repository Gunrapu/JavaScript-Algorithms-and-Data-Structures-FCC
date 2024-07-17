# Pokémon Search App

This is a web application that allows users to search for Pokémon using their name or ID. It fetches data from the **PokéAPI** and displays various details about the Pokémon, including its ID, name, weight, height, types, and stats.

## Features

- **Search Pokémon:** Users can enter either the name or ID of a Pokémon to retrieve its information.
- **Display Pokémon Details:** The application displays the Pokémon's ID, name, weight, height, types, and stats such as HP, Attack, Defense, Special Attack, Special Defense, and Speed.
- **Reset:** If a Pokémon is not found, the display resets to clear previous data and shows an alert.

## Usage

    1. Enter the name or ID of a Pokémon in the search input field.
    2. Press the "Search" button or hit Enter.
    3. The application will fetch data from the PokéAPI and display information about the Pokémon in two sections:
        - Top Container: Displays basic information such as ID, name, weight, height, sprite, and types.
        - Bottom Container: Displays detailed stats including HP, Attack, Defense, Special Attack, Special Defense, and Speed.
    4. If the Pokémon is not found, the display will reset to clear previous data and an alert will be shown.

## Tech Stack

- **HTML:** Structure and basic layout.
- **CSS:** Styling for visual appeal.
- **JavaScript:** Logic for fetching data from the API and updating the UI.
- **Fetch API:** To make requests to the PokéAPI.
- **Async/Await:** For handling asynchronous operations.
- **DOM Manipulation:** Updating the UI dynamically based on fetched data.

## User stories

    1. You should have an input element with an id of "search-input"
    2. You should have a button element with an id of "search-button"
    3. You should have an element with an id of "pokemon-name"
    4. You should have an element with an id of "pokemon-id"
    5. You should have an element with an id of "weight"
    6. You should have an element with an id of "height"
    7. You should have an element with an id of "types"
    8. You should have an element with an id of "hp"
    9. You should have an element with an id of "attack"
    10. You should have an element with an id of "defense"
    11. You should have an element with an id of "special-attack"
    12. You should have an element with an id of "special-defense"
    13. You should have an element with an id of "speed"
    14. When the #search-input element contains the value Red and the #search-button element is clicked, an alert should appear with the text "Pokémon not found"
    15. When the #search-input element contains the value Pikachu and the #search-button element is clicked, the values in the #pokemon-name, #pokemon-id, #weight, #height, #hp, #attack, #defense, #special-attack, #special-defense, and #speed elements should be PIKACHU, #25 or 25, Weight: 60 or 60, Height: 4 or 4, 35, 55, 40, 50, 50, and 90, respectively
    16. When the #search-input element contains the value Pikachu and the #search-button element is clicked, you should add an img element with the id of "sprite" and the src set to the Pokémon's front_default sprite to the page
    17. When the #search-input element contains the value Pikachu and the #search-button element is clicked, the #types element should contain a single inner element with the value ELECTRIC. The #types element content should be cleared between searches
    18. When the #search-input element contains the value 94 and the #search-button element is clicked, the values in the #pokemon-name, #pokemon-id, #weight, #height, #hp, #attack, #defense, #special-attack, #special-defense, and #speedelements should be GENGAR, #94 or 94, Weight: 405 or 405, Height: 15 or 15, 60, 65, 60, 130, 75, and 110, respectively
    19. When the #search-input element contains the value 94 and the #search-button element is clicked, you should add an img element with the id of sprite and the src set to the Pokémon's front_default sprite to the page
    20. When the #search-input element contains the value 94 and the #search-button element is clicked, the #types element should contain two inner elements with the text values GHOST and POISON, respectively. The #types element content should be cleared between searches

## Credits

- Pokémon data is fetched from the PokéAPI.
- Built with reference to the FreeCodeCamp Pokémon API project.
- This project was developed as part of the FreeCodeCamp JavaScript certificate project. For more information, visit FreeCodeCamp.