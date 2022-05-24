export type CardIdKeys = 0 | 1 | 2;

export interface IUserName {
  Id: number;
  Title: string;
}

export interface INewsLetterEvidence {
  Id?: number;
  CardId: CardIdKeys;
  CardState: boolean;
  UserName: IUserName;
}
