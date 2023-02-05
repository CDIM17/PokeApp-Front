import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from '../../services/session-storage.service';
import { PokemonFavorite } from 'src/app/interfaces/pokemon-favorite.interface';
import { MatDialog } from '@angular/material/dialog';
import { EditFavoritePokemonComponent } from '../../components/edit-favorite-pokemon/edit-favorite-pokemon.component';

@Component({
  selector: 'app-pokemon-favorite-list',
  templateUrl: './pokemon-favorite-list.component.html',
  styleUrls: ['./pokemon-favorite-list.component.css'],
})
export class PokemonFavoriteListComponent implements OnInit {
  pokemonsFavorite: PokemonFavorite[] = [];

  constructor(
    private sessionStorageService: SessionStorageService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.sessionStorageService.getItems();
    this.getFavoritePokemons();
  }

  getFavoritePokemons() {
    this.pokemonsFavorite = this.sessionStorageService.pokemonFavorites;
  }

  deleteFavorite(pokemonFavorite: PokemonFavorite) {
    this.sessionStorageService.deleteItem(pokemonFavorite);
    this.sessionStorageService.getItems();
    this.getFavoritePokemons();
  }

  openModal(pokemonFavorite:PokemonFavorite)
  {
    const dialogRef = this.dialog.open(EditFavoritePokemonComponent, {
      disableClose: true,
    });

    dialogRef.componentInstance.pokemonFavorite = pokemonFavorite;

    dialogRef.afterClosed().subscribe((result: any) => {
      this.sessionStorageService.updateItem( pokemonFavorite, result);
      this.getFavoritePokemons();
    });

  }
}
