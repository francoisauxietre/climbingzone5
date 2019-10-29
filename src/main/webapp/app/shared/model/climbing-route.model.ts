import { Moment } from 'moment';
import { IPlace } from 'app/shared/model/place.model';
import { IClimber } from 'app/shared/model/climber.model';
import { RouteType } from 'app/shared/model/enumerations/route-type.model';
import { ZoneType } from 'app/shared/model/enumerations/zone-type.model';

export interface IClimbingRoute {
  id?: number;
  name?: string;
  bonus?: string;
  latitude?: number;
  longitude?: number;
  difficuty?: string;
  star?: number;
  physical?: number;
  technical?: number;
  tactical?: number;
  mental?: number;
  createdAt?: Moment;
  modifiedAt?: Moment;
  deletedAt?: Moment;
  routeType?: RouteType;
  zouneType?: ZoneType;
  places?: IPlace[];
  openers?: IClimber[];
}

export class ClimbingRoute implements IClimbingRoute {
  constructor(
    public id?: number,
    public name?: string,
    public bonus?: string,
    public latitude?: number,
    public longitude?: number,
    public difficuty?: string,
    public star?: number,
    public physical?: number,
    public technical?: number,
    public tactical?: number,
    public mental?: number,
    public createdAt?: Moment,
    public modifiedAt?: Moment,
    public deletedAt?: Moment,
    public routeType?: RouteType,
    public zouneType?: ZoneType,
    public places?: IPlace[],
    public openers?: IClimber[]
  ) {}
}
