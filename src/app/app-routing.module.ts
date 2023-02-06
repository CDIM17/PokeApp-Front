import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesRoutingModule } from './pages/pages-routing.module';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { LoginComponent } from './auth/login/login.component';


const routes:Routes = [

  {path:'',pathMatch:'full',redirectTo:'/login'},
  {path:'**',component:LoginComponent}
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes,{useHash:true}),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
