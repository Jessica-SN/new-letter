import { mergeStyleSets } from "office-ui-fabric-react";

export const styles = mergeStyleSets({
  container: {
    height: 300,
    display: "flex",
    cursor: "pointer",
    padding: "0.625rem",
    borderRadius: "4px",
    flexDirection: "column",
    boxShadow: "0 0 10px 0 #c6cacc",
    ":hover": {
      opacity: "75%",
    },
  },

  clickableContent: {
    flex: 1,
  },

  checkboxPosition: {
    padding: "0 0 8px",
    justifyContent: "flex-end",
  },

  checkboxInput: {
    borderRadius: "50%",
  },

  cardImage: {
    // Container
    height: 150,
    // Element
    "> img": {
      width: "97%",
      margin: "0 auto",
    },
  },

  textContainer: {
    display: "flex",
    textAlign: "center",
    alignItems: "center",
    flexDirection: "column",
    "& span": {
      marginTop: "0.25rem",
    },
  },
});
