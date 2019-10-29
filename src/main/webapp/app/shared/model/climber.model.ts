import { Moment } from 'moment';
import { ICountry } from 'app/shared/model/country.model';
import { IClimber } from 'app/shared/model/climber.model';
import { Language } from 'app/shared/model/enumerations/language.model';

export interface IClimber {
  id?: number;
  firstName?: string;
  lastName?: string;
  birth?: Moment;
  createdAt?: Moment;
  modifiedAt?: Moment;
  deletedAt?: Moment;
  language?: Language;
  countries?: ICountry[];
  cardsId?: number;
  openById?: number;
  friends?: IClimber[];
  fromFriends?: IClimber[];
}

export class Climber implements IClimber {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public birth?: Moment,
    public createdAt?: Moment,
    public modifiedAt?: Moment,
    public deletedAt?: Moment,
    public language?: Language,
    public countries?: ICountry[],
    public cardsId?: number,
    public openById?: number,
    public friends?: IClimber[],
    public fromFriends?: IClimber[]
  ) {}
}
