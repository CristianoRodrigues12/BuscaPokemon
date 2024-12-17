import { Favorites } from "./favorites.js";

export class FavoritesView extends Favorites {
    constructor(root) {
        super(root);
        this.tbody = this.root.querySelector('table tbody');
        this.update();
        this.onAdd();
    }

    onAdd() {
        const addButton = this.root.querySelector('.search button');
        const inputField = this.root.querySelector('.search input');
    
        const handleAdd = () => {
            const { value } = inputField;
            if (value.trim() !== "") {
                this.add(value);
                inputField.value = "";
            }
        };    
        
        addButton.onclick = handleAdd;    
       
        inputField.onkeypress = (event) => {
            if (event.key === "Enter") {
                handleAdd();
            }
        };
    }

    update() {
        this.removeAllTr();

        this.entries.forEach(pokemon => {
            const row = this.createRow(pokemon);

            row.querySelector('.remove').onclick = () => {
                const isOk = confirm(`Tem certeza que deseja remover ${pokemon.name}?`);
                if (isOk) {
                    this.delete(pokemon);
                }
            };

            this.tbody.append(row);
        });
    }

    createRow(pokemon) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="pokemon">
                <img src="${pokemon.image}" alt="Imagem de ${pokemon.name}">
                <p>${pokemon.name}</p>
            </td>
            <td>${pokemon.id}</td>
            <td>${pokemon.types}</td>
            <td>
                <button class="remove">Remover</button>
            </td>
        `;
        return tr;
    }

    removeAllTr() {
        this.tbody.querySelectorAll('tr').forEach(tr => tr.remove());
    }
}
