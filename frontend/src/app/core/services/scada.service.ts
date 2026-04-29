import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import {
  ScadaCommand,
  ScadaEvent,
  ScadaDashboardState,
  ScadaEventoMaquina,
} from '../../shared/models/scada.model';

@Injectable({
  providedIn: 'root'
})
export class ScadaService {
  private apiUrl = '/api/scada';

  constructor(private http: HttpClient) {}

  /**
   * GET /api/scada/dashboard
   * Obtiene el estado actual del sistema SCADA desde Node-RED
   */
  getDashboard(): Observable<ScadaDashboardState> {
    return this.http.get<{ data: ScadaDashboardState }>(`${this.apiUrl}/dashboard`)
      .pipe(map(res => res.data));
  }

  /**
   * Polling automático cada 800ms del dashboard SCADA
   */
  getDashboardAutoRefresh(intervalMs: number = 800): Observable<ScadaDashboardState> {
    return interval(intervalMs).pipe(
      switchMap(() => this.getDashboard())
    );
  }

  /**
   * POST /api/scada/enviar-comando
   * Envía un comando a Node-RED
   */
  enviarComando(tag: string, valor: any): Observable<{ data: ScadaCommand; message: string }> {
    return this.http.post<{ data: ScadaCommand; message: string }>(
      `${this.apiUrl}/enviar-comando`,
      { tag, valor }
    );
  }

  /**
   * GET /api/scada/historicos
   * Devuelve histórico de comandos y eventos
   */
  getHistoricos(
    machineId?: number,
    days: number = 30,
    perPage: number = 50,
    page: number = 1
  ): Observable<{ data: ScadaCommand[]; pagination: any }> {
    let params = new HttpParams()
      .set('days', days.toString())
      .set('per_page', perPage.toString())
      .set('page', page.toString());

    if (machineId) {
      params = params.set('machine_id', machineId.toString());
    }

    return this.http.get<{ data: ScadaCommand[]; pagination: any }>(
      `${this.apiUrl}/historicos`,
      { params }
    );
  }

  /**
   * GET /api/scada/eventos-maquina/{machineId}
   * Devuelve eventos históricos de una máquina (para integración con Tickets)
   */
  getEventosMaquina(
    machineId: number,
    days: number = 7,
    perPage: number = 30,
    page: number = 1
  ): Observable<{ data: ScadaEventoMaquina[]; pagination: any }> {
    const params = new HttpParams()
      .set('days', days.toString())
      .set('per_page', perPage.toString())
      .set('page', page.toString());

    return this.http.get<{ data: ScadaEventoMaquina[]; pagination: any }>(
      `${this.apiUrl}/eventos-maquina/${machineId}`,
      { params }
    );
  }

  /**
   * POST /api/scada/evento-manual
   * Registra un evento manual (solo para admins)
   */
  registrarEventoManual(
    machineId: number,
    eventoType: string,
    valorAnterior?: any,
    valorNuevo?: any
  ): Observable<{ data: ScadaEvent; message: string }> {
    return this.http.post<{ data: ScadaEvent; message: string }>(
      `${this.apiUrl}/evento-manual`,
      {
        machine_id: machineId,
        evento_type: eventoType,
        valor_anterior: valorAnterior,
        valor_nuevo: valorNuevo,
      }
    );
  }
}
