import { Injectable } from '@angular/core';
import { PokemonFavorite } from '../interfaces/pokemon-favorite.interface';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  public pokemonFavorites: PokemonFavorite[] = [];

  constructor() {}

  getItems() {
    this.pokemonFavorites = JSON.parse(
      sessionStorage.getItem('favorite') || ''
    );
  }

  createItem(pokemonFavorite: PokemonFavorite) {
    this.pokemonFavorites.push(pokemonFavorite);
    this.updateSessionStorage();
  }

  updateItem(pokemonFavorite: PokemonFavorite,newPokemonFavorite:PokemonFavorite) {

    const index = this.pokemonFavorites.indexOf(pokemonFavorite);
    this.pokemonFavorites[index] = newPokemonFavorite;
    this.updateSessionStorage();
  }

  deleteItem(PokemonFavorite: PokemonFavorite) {
    const index = this.pokemonFavorites.indexOf(PokemonFavorite);
    this.pokemonFavorites.splice(index, 1);
    this.updateSessionStorage();
    this.getItems();
  }

  updateSessionStorage() {
    sessionStorage.setItem('favorite', JSON.stringify(this.pokemonFavorites));
    this.getItems();
  }
}
