import * as React from "react";

import { Separator, Text } from "office-ui-fabric-react";

import * as strings from "NewsLetterWebPartStrings";

function Header() {
  return (
    <div>
      <Text variant="large">{strings.NewsLetterTitle}</Text>
      <Separator />
    </div>
  );
}

export { Header };
