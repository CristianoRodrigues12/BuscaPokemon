export class PokemonAPI {
    static async search(name) {
        try {
            const endpoint = `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`;
            const response = await fetch(endpoint);
            
            // Verifica se a resposta é válida
            if (!response.ok) {
                throw new Error('Pokémon não encontrado!');
            }

            const pokemon = await response.json();
            return {
                id: pokemon.id,
                name: pokemon.name,
                types: pokemon.types.map(type => type.type.name),
                image: pokemon.sprites.front_default
            };
        } catch (error) {
            console.error(error);
            return null; // Retorna null se houver um erro
        }
    }
}
