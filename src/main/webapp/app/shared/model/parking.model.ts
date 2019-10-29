import { IPlace } from 'app/shared/model/place.model';

export interface IParking {
  id?: number;
  name?: string;
  description?: string;
  places?: IPlace[];
}

export class Parking implements IParking {
  constructor(public id?: number, public name?: string, public description?: string, public places?: IPlace[]) {}
}
