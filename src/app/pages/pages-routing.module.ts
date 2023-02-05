import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonFavoriteListComponent } from './pokemon-favorite-list/pokemon-favorite-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from '../guards/auth.guard';

const routes:Routes = [
  {
    path:'pages',
    component:PagesComponent,
    canActivate:[AuthGuard],
    children:[
      {path:'pokemons',component:PokemonListComponent},
      {path:'favorites',component:PokemonFavoriteListComponent},
      {path:'profile',component:UserProfileComponent}
    ],
  },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class PagesRoutingModule { }
