import * as React from "react";

import {
  DefaultButton,
  PrimaryButton,
} from "office-ui-fabric-react/lib/Button";
import { IStackTokens, Stack } from "office-ui-fabric-react/lib/Stack";

import { IFooterProps } from "./Footer.types";

import * as strings from "NewsLetterWebPartStrings";

const stackTokens: IStackTokens = {
  padding: 10,
  childrenGap: 20,
};

function Footer({ onClearCards, onUpdateCards }: IFooterProps) {
  return (
    <Stack wrap horizontal horizontalAlign="end" tokens={stackTokens}>
      <PrimaryButton text={strings.ButtonSave} onClick={onUpdateCards} />
      <DefaultButton text={strings.ButtonCancel} onClick={onClearCards} />
    </Stack>
  );
}

export { Footer };
