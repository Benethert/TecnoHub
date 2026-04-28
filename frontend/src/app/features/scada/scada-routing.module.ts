import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScadaDashboardComponent } from './dashboard/dashboard.component';
import { HistoricosComponent } from './historicos/historicos.component';

const routes: Routes = [
  {
    path: '',
    component: ScadaDashboardComponent,
  },
  {
    path: 'dashboard',
    component: ScadaDashboardComponent,
  },
  {
    path: 'historicos',
    component: HistoricosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScadaRoutingModule {}
