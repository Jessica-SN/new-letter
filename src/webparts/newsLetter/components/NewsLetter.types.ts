import { INewsLetterEvidence, IUserName } from "../models/spLists.types";

export interface INewsLetterProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
}

export type UserCards = INewsLetterEvidence[];

export const defaultUserName: IUserName = {
  Id: null,
  Title: "",
};

// Three empty cards
export const defaultUserCards: UserCards = [
  {
    Id: null,
    CardId: 0,
    CardState: false,
    UserName: defaultUserName,
  },
  {
    Id: null,
    CardId: 1,
    CardState: false,
    UserName: defaultUserName,
  },
  {
    Id: null,
    CardId: 2,
    CardState: false,
    UserName: defaultUserName,
  },
];
