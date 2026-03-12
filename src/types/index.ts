export interface Documento {
  id: string;
  titulo: string;
  categoria: string;
  nota?: string;
  data?: string;
  nomeArquivo?: string;
  tipoArquivo: string;
  tamanhoArquivo: number;
  status: 'ativo' | 'inativo';
  urlPublica?: string;
  criadoPor?: string;
  criadoEm: string;
  atualizadoEm: string;
}

export interface Imagem {
  id: string;
  titulo: string;
  pagina: string;
  urlPublica: string;
  ordem: number;
  criadoEm: string;
}

export interface Usuario {
  id: string;
  nome: string;
  email: string;
}
