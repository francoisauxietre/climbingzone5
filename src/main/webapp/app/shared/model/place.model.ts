export interface IPlace {
  id?: number;
  name?: string;
  latitude?: number;
  longitude?: number;
  parkingsId?: number;
  locatedId?: number;
}

export class Place implements IPlace {
  constructor(
    public id?: number,
    public name?: string,
    public latitude?: number,
    public longitude?: number,
    public parkingsId?: number,
    public locatedId?: number
  ) {}
}
