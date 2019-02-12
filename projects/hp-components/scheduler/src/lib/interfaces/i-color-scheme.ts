export interface IColorScheme {
  schemeName: string;
  backColor: string;
  fontColor: string;
  borderColor: string;
  rulerColors: IColorSet;
  headingColors: IColorSet;
  cellContainerColors: IColorSet;
  eventColors: IColorSet;
  allDayAreaColors: IColorSet;
  workHoursColors: IColorSet;
  weekEndColors: IColorSet;
  selectedCellColors: IColorSet;
  eventCellColors: IColorSet;

  calcColors(): void;
}

export interface IColorSet {
  backColor: string;
  fontColor: string;
  borderColor: string;
}
