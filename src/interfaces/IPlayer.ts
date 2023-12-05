export enum Figurs {
  figureZero = "figureZero",
  figureX = "figureX",
}

export default interface IPlayer {
  name: string;
  timer: number;
  figure: Figurs;
  winningsAmount: number;
  haveToMove: boolean;
}
