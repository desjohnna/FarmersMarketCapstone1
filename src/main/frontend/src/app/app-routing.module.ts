import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { ProduceItemComponent } from './produce-item/produce-item.component';
import { AdminComponent } from './admin/admin.component';


const routes: Routes = [

  {path: 'produce', component: ProduceItemComponent},
  {path: '', redirectTo: 'produce', pathMatch: 'full'},
  {path: 'cart', component: CartComponent},
  {path: 'admin', component: AdminComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
