export class UtilityCost {
  constructor(
    public id: string,
    public hotWaterCost: number,
    public coldWaterCost: number,
    public sewageCost: number,
    public trashCost: number,
    public currency: string,
    public date: Date,
    public unitOfTime: string
  ) {}
}
