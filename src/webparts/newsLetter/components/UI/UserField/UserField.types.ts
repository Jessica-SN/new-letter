import { IPersonaProps } from "office-ui-fabric-react/lib/Persona";
import { IBasePickerSuggestionsProps } from "office-ui-fabric-react/lib/Pickers";
import { IUserName } from "../../../models/spLists.types";

export interface IUserFieldProps {
  currentUser: IUserName;
  usersList: IPersonaProps[];
  onSelectUser: (userId?: number, userTitle?: string) => void;
}

export const suggestionProps: IBasePickerSuggestionsProps = {
  suggestionsHeaderText: "Suggested Users",
  mostRecentlyUsedHeaderText: "Suggested Contacts",
  noResultsFoundText: "No results found",
  loadingText: "Loading",
  showRemoveButtons: true,
  suggestionsAvailableAlertText: "People Picker Suggestions available",
  suggestionsContainerAriaLabel: "Suggested users",
};
