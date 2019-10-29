import { IClimber } from 'app/shared/model/climber.model';

export interface ICard {
  id?: number;
  cardId?: number;
  star?: number;
  level?: string;
  qrcode?: string;
  climberPlace?: number;
  climberTotal?: number;
  place?: string;
  photo?: string;
  climbingRouteName?: string;
  physical?: number;
  technical?: number;
  tactical?: number;
  mental?: number;
  bonus?: string;
  climberFirstName?: string;
  climberLastName?: string;
  climbers?: IClimber[];
}

export class Card implements ICard {
  constructor(
    public id?: number,
    public cardId?: number,
    public star?: number,
    public level?: string,
    public qrcode?: string,
    public climberPlace?: number,
    public climberTotal?: number,
    public place?: string,
    public photo?: string,
    public climbingRouteName?: string,
    public physical?: number,
    public technical?: number,
    public tactical?: number,
    public mental?: number,
    public bonus?: string,
    public climberFirstName?: string,
    public climberLastName?: string,
    public climbers?: IClimber[]
  ) {}
}
