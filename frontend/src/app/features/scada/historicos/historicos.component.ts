import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScadaService } from '../../../core/services/scada.service';
import { ScadaCommand } from '../../../shared/models/scada.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-scada-historicos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './historicos.component.html',
  styleUrls: ['./historicos.component.scss']
})
export class HistoricosComponent implements OnInit, OnDestroy {
  commands: ScadaCommand[] = [];
  loading = false;
  error: string | null = null;

  // Filtros
  days = 30;
  perPage = 50;
  currentPage = 1;
  total = 0;

  private destroy$ = new Subject<void>();

  constructor(private scadaService: ScadaService) {}

  ngOnInit(): void {
    this.loadHistoricos();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Carga el histórico de comandos
   */
  loadHistoricos(): void {
    this.loading = true;
    this.error = null;

    this.scadaService.getHistoricos(undefined, this.days, this.perPage, this.currentPage)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.commands = res.data;
          this.total = res.pagination.total;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'No se pudo cargar el histórico';
          this.loading = false;
        },
      });
  }

  /**
   * Cambia el filtro de días y recarga
   */
  onDaysChange(): void {
    this.currentPage = 1;
    this.loadHistoricos();
  }

  /**
   * Cambia la página
   */
  goToPage(page: number): void {
    this.currentPage = page;
    this.loadHistoricos();
  }

  /**
   * Obtiene el ícono según el resultado
   */
  getResultIcon(resultado: string): string {
    switch (resultado) {
      case 'success':
        return '✓';
      case 'error':
        return '✗';
      case 'timeout':
        return '⏱';
      default:
        return '?';
    }
  }

  /**
   * Obtiene la clase CSS según el resultado
   */
  getResultClase(resultado: string): string {
    return `resultado-${resultado}`;
  }

  /**
   * Formatea la fecha y hora
   */
  formatDateTime(date: string): string {
    return new Date(date).toLocaleString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }

  /**
   * Calcula total de páginas
   */
  get totalPages(): number {
    return Math.ceil(this.total / this.perPage);
  }

  /**
   * Obtiene array de números de página para paginación
   */
  get pageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisible = 5;
    let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(this.totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }
}
