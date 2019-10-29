export interface ICountry {
  id?: number;
  name?: string;
  climbersId?: number;
}

export class Country implements ICountry {
  constructor(public id?: number, public name?: string, public climbersId?: number) {}
}
