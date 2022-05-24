import * as React from "react";

import { Checkbox, Image, ImageFit, Text } from "office-ui-fabric-react";

import { styles } from "./Card.styles";
import { ICardProps } from "./Card.types";

function Card({
  id,
  description,
  imageUrl,
  checked,
  title,
  onChecked,
}: ICardProps) {
  const onCheckedChange = (isChecked: boolean): void => {
    onChecked(id, !!isChecked);
  };

  return (
    <div className={styles.container}>
      <Checkbox
        className={styles.checkboxPosition}
        checked={checked}
        onChange={(ev, isChecked) => onCheckedChange(isChecked)}
        styles={{ checkbox: styles.checkboxInput }}
      />
      <div
        className={styles.clickableContent}
        onClick={() => onCheckedChange(!checked)}
      >
        <Image
          src={imageUrl}
          imageFit={ImageFit.cover}
          className={styles.cardImage}
        />
        <div className={styles.textContainer}>
          <Text variant="mediumPlus">{title}</Text>
          <Text variant="smallPlus">{description}</Text>
        </div>
      </div>
    </div>
  );
}

export { Card };
