import "@pnp/sp/site-users/web";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { sp } from "@pnp/sp/presets/all";
import { listName } from "../models/constants";
import { INewsLetterEvidence } from "../models/spLists.types";

// Gets list users in the organization
export async function getSiteUsers() {
  try {
    return await sp.web.siteUsers();
  } catch (e) {
    console.error(e);
    return [];
  }
}

// Get list selected user items
export function getUserNewsLetter(userId: number) {
  return sp.web.lists
    .getByTitle(listName)
    .items.expand("UserName")
    .select("UserName/Title, UserName/Id, CardId, CardState, Id")
    .filter(`UserNameId eq ${userId}`)
    .get()
    .then((r) => {
      return { value: r };
    })
    .catch((e) => {
      console.error(e);
      return null;
    });
}

// Updates user news leyyer
export async function updateUserNewsLetterCard(
  cardId: number,
  data: INewsLetterEvidence
) {
  try {
    return await sp.web.lists
      .getByTitle(listName)
      .items.getById(cardId)
      .update({
        UserNameId: data.UserName.Id,
        CardId: data.CardId,
        CardState: data.CardState,
      });
  } catch (e) {
    console.error(e);
  }
}

export async function createUserNewsLetter(data: INewsLetterEvidence) {
  try {
    return await sp.web.lists.getByTitle(listName).items.add({
      UserNameId: data.UserName.Id,
      CardId: data.CardId,
      CardState: data.CardState,
    });
  } catch (e) {
    console.error(e);
  }
}

export async function fetchUpdateUserCards(finalCards: INewsLetterEvidence[]) {
  const promises = finalCards.map(({ Id, ...card }) => {
    if (Id) {
      return updateUserNewsLetterCard(Id, card);
    }
    return createUserNewsLetter(card);
  });

  try {
    await Promise.all(promises);
  } catch (e) {
    console.error(e);
  }
}
