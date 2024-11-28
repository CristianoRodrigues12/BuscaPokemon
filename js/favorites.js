import { PokemonAPI } from "./PokemonAPI.js";

export class Favorites {
    constructor(root) {
        this.root = document.querySelector(root);
        this.load();
    }

    load() {
        this.entries = JSON.parse(localStorage.getItem('@pokemon-favorites:')) || [];
    }

    save() {
        localStorage.setItem('@pokemon-favorites:', JSON.stringify(this.entries));
    }

    async add(pokemonName) {
        try {
            const pokemon = await PokemonAPI.search(pokemonName);
           
            if (!pokemon || !pokemon.id || !pokemon.name) {
                throw new Error('Pokémon não encontrado ou com dados inválidos!');
            }
            
            const pokemonExists = this.entries.find(entry => entry.id === pokemon.id);

            if (pokemonExists) {
                throw new Error('Pokémon já está na sua lista!');
            }
           
            this.entries = [pokemon, ...this.entries];
            this.update();
            this.save();
        } catch (error) {
            alert(error.message || 'Erro ao adicionar Pokémon!');
        }
    }

    delete(pokemon) {
        this.entries = this.entries.filter(entry => entry.id !== pokemon.id);
        this.update();
        this.save();
    }
    
}
