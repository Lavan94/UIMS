export class FinancialData {
  constructor(
    public id: string = '',
    public hotWaterCost: number = 0,
    public coldWaterCost: number = 0,
    public electricityCost: number = 0,
    public income: number = 0,
    public employee: number = 0,
    public currency: string = 'Ron',
    public date: Date = new Date(),
    public unitOfTime: string = ''
  ) {}
}
