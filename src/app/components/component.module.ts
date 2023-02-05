import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditFavoritePokemonComponent } from './edit-favorite-pokemon/edit-favorite-pokemon.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    EditFavoritePokemonComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ComponentModule { }
