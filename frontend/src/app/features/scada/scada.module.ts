import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScadaRoutingModule } from './scada-routing.module';
import { ScadaDashboardComponent } from './dashboard/dashboard.component';
import { HistoricosComponent } from './historicos/historicos.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ScadaRoutingModule,
    ScadaDashboardComponent,
    HistoricosComponent,
  ],
})
export class ScadaModule {}
