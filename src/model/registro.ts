export class Registro {
    identificacion!: string;
    telefono! : string;
    terminos! : boolean;
    publicidad! : boolean;
    public constructor(init?: Partial<Registro>) {
      Object.assign(this, init);
    }
  
  }