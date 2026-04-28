import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: 'recambios',
    loadChildren: () =>
      import('./features/cart/cart.module').then(m => m.CartModule),
  },
  {
    path: 'incidencias',
    loadChildren: () =>
      import('./features/tickets/tickets.module').then(m => m.TicketsModule),
  },
  {
    path: 'scada',
    loadChildren: () =>
      import('./features/scada/scada.module').then(m => m.ScadaModule),
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
