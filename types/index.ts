export interface Proyecto {
  id: string;
  titulo: string;
  categoria: 'piscicultura' | 'agricultura' | 'formacion' | 'turismo';
  descripcion: string;
  valor: number;
  fecha: string;
  contrato: string;
  municipio: string;
  imagen?: string;
  imagenes?: string[];
  logros?: string[];
}

export type CategoriaProyecto = Proyecto['categoria'];
