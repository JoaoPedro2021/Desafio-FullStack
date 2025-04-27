export interface Page<T> {
  data: T[];
  meta: Meta;
}

export interface Developer {
  id: number;
  nome: string;
  sexo: string;
  data_nascimento: string;
  idade: number;
  hobby: string;
  nivel: Nivel;
}

export interface Nivel {
  id: number;
  nivel: string;
}

export interface Meta {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
}

export interface ColumnTable {
  header: string;
  accessorKey?: string;
  cell?: (info: T) => void;
}
