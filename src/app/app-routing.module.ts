import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form/form.component';
import { HomeComponent } from './home/home/home.component';
import { ViewComponent } from './view/view/view.component';

const routes: Routes = [
  
  {path: 'home', component: HomeComponent},
  {path: 'form', component: FormComponent},
  {path: 'view', component: ViewComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'}

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
