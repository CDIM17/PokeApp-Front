import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonList, Result } from '../../interfaces/pokemon-list.interface';
import { environment } from '../../../environments/environment';
import { SessionStorageService } from '../../services/session-storage.service';
import { PokemonFavorite } from '../../interfaces/pokemon-favorite.interface';

const base_url = environment.base_url;

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent implements OnInit {

  public totalPokemons: number = 0;
  public pokemons: Result[] = [];

  public offset: number = 0;
  public limit: number = 5;

  constructor(public pokemonService: PokemonService,
              private SessionStorageService:SessionStorageService) {}

  ngOnInit(): void {
    this.getPokemons();
    this.SessionStorageService.getItems();

  }

  getPokemons() {
    this.pokemonService
      .getPokemons(this.offset, this.limit)
      .subscribe((data:PokemonList) => {
        this.pokemons = data.results;
        this.totalPokemons = data.count;
      });
  }

  changePage(valor: number) {
    this.offset += valor;

    if (this.offset < 0) {
      this.offset = 0;
    } else if (this.offset >= this.totalPokemons) {
      this.offset -= valor;
    }

    this.getPokemons();
  }

  changeLimit(event: any) {
    this.limit = parseInt(event.target.value);
    this.getPokemons();
  }

  searchPokemon(termino: string) {

    if(termino != '')
    {
      this.pokemonService.searchPokemon(termino).subscribe(data => {

        const pokemon = [
          {
            name: data.name,
            url: base_url + '/pokemon/' + data.id,
          },
        ];

        this.pokemons = pokemon
      })
    }
    else
    {
      this.getPokemons();
    }

  }

  saveFavoritePokemon(pokemon:Result)
  {
    const pokemonFavorite: PokemonFavorite = {
      name: pokemon.name,
      alias: pokemon.name + ' Alias',
      imageUrl: this.pokemonService.getPokemonImage(pokemon),
      createdAt: new Date(),
    };

    this.SessionStorageService.createItem(pokemonFavorite);
  }

  isFavorite(pokemon:Result)
  {
    return this.SessionStorageService.pokemonFavorites.filter(x => x.name === pokemon.name);
  }

  deleteFavorite(pokemon:Result)
  {
    const pokemonFavorite: PokemonFavorite = {
      name: pokemon.name,
      alias: pokemon.name + ' Alias',
      imageUrl: this.pokemonService.getPokemonImage(pokemon),
      createdAt: new Date(),
    };

    this.SessionStorageService.deleteItem(pokemonFavorite);
  }
}
