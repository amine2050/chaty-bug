import { ThirdPageComponent } from './components/third-page/third-page.component';
import { FirstPageComponent } from './components/first-page/first-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecondPageComponent } from './components/second-page/second-page.component';

const routes: Routes = [
  { path: '', component: FirstPageComponent },
  { path: 'two', component: SecondPageComponent },
  { path: 'three', component: ThirdPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
