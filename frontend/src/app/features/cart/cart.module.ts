import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { CatalogComponent } from './catalog/catalog.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
  { path: '',         component: CatalogComponent },   // /recambios         → catálogo
  { path: 'carrito',  component: CartPageComponent },  // /recambios/carrito → carrito
  { path: 'checkout', component: CheckoutComponent },  // /recambios/checkout → checkout
];

@NgModule({
  declarations: [
    CatalogComponent,
    CartPageComponent,
    CheckoutComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
})
export class CartModule {}
