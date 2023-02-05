import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { environment } from '../../environments/environment';
import { PokemonList, Result } from '../interfaces/pokemon-list.interface';
import { Observable } from 'rxjs';
import { Pokemon } from '../interfaces/pokemon.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  public imgPokemon: string =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

  constructor(private baseService: BaseService) {}

  getPokemons(offset: number = 0, limit: number = 10): Observable<PokemonList> {
    return this.baseService.get<PokemonList>(
      `${base_url}/pokemon?offset=${offset}&limit=${limit}`
    );
  }

  getPokemonImage(pokemonResult: Result) {
    return this.imgPokemon + this.getPokemonId(pokemonResult) + '.png';
  }

  getPokemonId(pokemonResult: Result) {
    return pokemonResult.url.split('/')[6];
  }

  searchPokemon(searchTerm:string):Observable<Pokemon> {
    return this.baseService.get<Pokemon>(`${base_url}/pokemon/${searchTerm}`);
  }

  }
