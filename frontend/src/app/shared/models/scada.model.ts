export interface ScadaCommand {
  id: number;
  user_id: number;
  tag: string;
  valor: any;
  estado_nodored: any;
  resultado: 'success' | 'error' | 'timeout';
  error_mensaje?: string;
  created_at: string;
  updated_at: string;
  user?: {
    id: number;
    name: string;
    email: string;
  };
}

export interface ScadaEvent {
  id: number;
  machine_id: number;
  evento_type: string;
  valor_anterior: any;
  valor_nuevo: any;
  created_at: string;
  updated_at: string;
}

export interface ScadaDashboardState {
  O_VAL?: number;
  O_B1?: boolean;
  O_B2?: boolean;
  O_LAMP?: boolean;
  TIEMPO?: string;
  [key: string]: any;
}

export interface ScadaEventoMaquina {
  id: number;
  machine_id: number;
  evento_type: string;
  valor_anterior: any;
  valor_nuevo: any;
  created_at: string;
  updated_at?: string;
}
