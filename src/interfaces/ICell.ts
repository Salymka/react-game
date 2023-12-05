import IPlayer from "./IPlayer";

export default interface ICell {
  usedBy: IPlayer | null;
  used: boolean;
}
