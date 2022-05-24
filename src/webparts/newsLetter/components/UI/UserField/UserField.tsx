import * as React from "react";

import {
  CompactPeoplePicker,
  IPersonaProps,
  IStackTokens,
  Label,
  Stack,
} from "office-ui-fabric-react";

import { IUserFieldProps, suggestionProps } from "./UserField.types";

import * as strings from "NewsLetterWebPartStrings";

const stackTokens: IStackTokens = {
  padding: "0 0 10px 10px",
  maxWidth: 100,
};

function UserField({ currentUser, usersList, onSelectUser }: IUserFieldProps) {
  const [selectedUsers, setSelectedUsers] = React.useState<IPersonaProps[]>([]);
  const picker = React.useRef(null);

  React.useEffect(() => {
    if (currentUser.Id) {
      const defaultUser = usersList.filter(
        (user) => user["key"] === currentUser.Id
      );
      setSelectedUsers(defaultUser);
    }
  }, [currentUser]);

  const filterPromise = (
    personasToReturn: IPersonaProps[]
  ): IPersonaProps[] | Promise<IPersonaProps[]> => {
    return personasToReturn;
  };

  const filterPersonasByText = (filterText: string): IPersonaProps[] => {
    return usersList.filter((item) => doesTextStartWith(item.text, filterText));
  };

  const onFilterChanged = (
    filterText: string,
    currentPersonas: IPersonaProps[],
    limitResults?: number
  ): IPersonaProps[] | Promise<IPersonaProps[]> => {
    if (filterText) {
      let filteredPersonas: IPersonaProps[] = filterPersonasByText(filterText);

      filteredPersonas = removeDuplicates(filteredPersonas, currentPersonas);
      filteredPersonas = limitResults
        ? filteredPersonas.slice(0, limitResults)
        : filteredPersonas;
      return filterPromise(filteredPersonas);
    } else {
      return [];
    }
  };

  function doesTextStartWith(text: string, filterText: string): boolean {
    const arrFullName = text.split(" ");
    // Check if the first name start with filterText
    const firstNameStartsWith =
      arrFullName[0].toLowerCase().indexOf(filterText.toLowerCase()) === 0;
    if (arrFullName.length > 1) {
      // Check if the last name starts with filterText
      const lastNameStartsWith =
        arrFullName[1].toLowerCase().indexOf(filterText.toLowerCase()) === 0;
      return firstNameStartsWith || lastNameStartsWith;
    }
    return firstNameStartsWith;
  }

  function removeDuplicates(
    personas: IPersonaProps[],
    possibleDupes: IPersonaProps[]
  ) {
    return personas.filter(
      (persona) => !listContainsPersona(persona, possibleDupes)
    );
  }

  function listContainsPersona(
    persona: IPersonaProps,
    personas: IPersonaProps[]
  ) {
    if (!personas || !personas.length || personas.length === 0) {
      return false;
    }
    return personas.filter((item) => item.text === persona.text).length > 0;
  }

  function getTextFromItem(persona: IPersonaProps): string {
    return persona.text as string;
  }

  function onChangeSelected(items?: IPersonaProps[]) {
    const selectedItem = items[0];
    setSelectedUsers(items);
    if (selectedItem) {
      onSelectUser(selectedItem["key"], selectedItem.text);
    } else {
      onSelectUser(null, null);
    }
  }

  return (
    <Stack tokens={stackTokens}>
      <Label>{strings.UserNameField}</Label>
      <CompactPeoplePicker
        componentRef={picker}
        selectedItems={selectedUsers}
        pickerSuggestionsProps={suggestionProps}
        itemLimit={1}
        resolveDelay={300}
        onResolveSuggestions={onFilterChanged}
        getTextFromItem={getTextFromItem}
        onChange={onChangeSelected}
      />
    </Stack>
  );
}

export { UserField };
