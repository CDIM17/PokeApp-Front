import { Component, OnInit } from '@angular/core';
import { PokemonFavorite } from '../../interfaces/pokemon-favorite.interface';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-favorite-pokemon',
  templateUrl: './edit-favorite-pokemon.component.html',
  styleUrls: ['./edit-favorite-pokemon.component.css'],
})
export class EditFavoritePokemonComponent implements OnInit {
  pokemonFavorite!: PokemonFavorite;
  editPokemonForm!: FormGroup;

  constructor(
    public _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditFavoritePokemonComponent>,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.editPokemonForm = this._formBuilder.group({
      name: [this.pokemonFavorite.name, Validators.required],
      alias: [this.pokemonFavorite.alias, Validators.required],
      createdAt: [this.pokemonFavorite.createdAt, Validators.required],
    });

    this.editPokemonForm.controls['name'].disable();
    this.editPokemonForm.controls['createdAt'].disable();
  }

  submitForm() {
    this.pokemonFavorite = {
      name: this.pokemonFavorite.name,
      ...this.editPokemonForm.value,
      imageUrl: this.pokemonFavorite.imageUrl,
      createdAt: this.pokemonFavorite.createdAt,
    };

    if (this.editPokemonForm.valid) {
      this.closeModal();
      this.toastr.success('Ok', 'Pokemon Updated!!');
    }
  }

  closeModal() {
    this.dialogRef.close(this.pokemonFavorite);
  }
}
