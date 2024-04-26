interface Envio {
    direccionDestino: string;
    direccionInicio: string;
    estado: 'PENDIENTE' | 'EN_CARGA' | 'EN_TRANSITO' | 'RETRASADO' | 'ENTREGADO' | 'CANCELADO';
    fechaHoraCarga: string | null;
    fechaHoraEstimadaLlegada: string;
    fechaHoraInicio: string;
    fechaHoraRealLlegada: string | null;
    id: number;
    latDestino: number;
    latInicio: number;
    lngDestino: number;
    lngInicio: number;
  }