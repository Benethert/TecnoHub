import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface KpiCard {
  label: string;
  value: string | number;
  sub: string;
  icon: string;
  color: string;
  route: string;
}

interface QuickAction {
  label: string;
  description: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  today = new Date();
  currentHour = this.today.getHours();

  get todayLabel(): string {
    return this.today.toLocaleDateString('es-ES', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    });
  }

  get greeting(): string {
    if (this.currentHour < 12) return 'Buenos días';
    if (this.currentHour < 19) return 'Buenas tardes';
    return 'Buenas noches';
  }

  kpis: KpiCard[] = [
    {
      label: 'Tickets Abiertos',
      value: '—',
      sub: 'Incidencias activas',
      icon: 'ticket',
      color: '#F59E0B',
      route: '/incidencias',
    },
    {
      label: 'Pedidos Pendientes',
      value: '—',
      sub: 'Recambios en proceso',
      icon: 'cart',
      color: '#4F46E5',
      route: '/recambios',
    },
    {
      label: 'Máquinas Activas',
      value: '—',
      sub: 'En producción',
      icon: 'machine',
      color: '#10B981',
      route: '/scada',
    },
    {
      label: 'Estado SCADA',
      value: 'Online',
      sub: 'Node-RED conectado',
      icon: 'scada',
      color: '#6366F1',
      route: '/scada',
    },
  ];

  quickActions: QuickAction[] = [
    {
      label: 'Nueva Incidencia',
      description: 'Reportar un problema o avería en planta',
      route: '/incidencias/nueva',
      icon: 'plus-ticket',
    },
    {
      label: 'Ver Carrito',
      description: 'Gestionar pedido de recambios',
      route: '/recambios',
      icon: 'cart',
    },
    {
      label: 'Control SCADA',
      description: 'Acceder al panel HMI de automatización',
      route: '/scada/dashboard',
      icon: 'scada',
    },
    {
      label: 'Histórico SCADA',
      description: 'Consultar registros y auditoría de comandos',
      route: '/scada/historicos',
      icon: 'log',
    },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigate(route: string): void {
    this.router.navigate([route]);
  }
}
