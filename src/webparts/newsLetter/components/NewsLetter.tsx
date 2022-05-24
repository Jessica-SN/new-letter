import * as React from "react";

import {
  INewsLetterProps,
  defaultUserCards,
  UserCards,
  defaultUserName,
} from "./NewsLetter.types";
import { Header } from "./UI/Header";
import { Footer } from "./UI/Footer";
import { Card } from "./UI/Card";
import { UserField } from "./UI/UserField";
import {
  totalCards,
  randomDescriptions,
  randomImages,
  randomTitles,
} from "../models/constants";
import { useUsersList } from "../hooks/useUsersList";
import { fetchUpdateUserCards, getUserNewsLetter } from "../services/sp";
import { INewsLetterEvidence, IUserName } from "../models/spLists.types";
import styles from "./NewsLetter.module.scss";

export default function NewsLetter(props: INewsLetterProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [userCards, setUserCards] = React.useState<UserCards>(defaultUserCards);
  const [currentUser, setCurrentUser] =
    React.useState<IUserName>(defaultUserName);
  const usersList = useUsersList();

  const updateCardsNewUser = (userId: number, userTitle: string) => {
    const newUserCards = defaultUserCards.map((card) => {
      return {
        ...card,
        UserName: {
          Id: userId,
          Title: userTitle,
        },
      };
    });
    setUserCards(newUserCards);
  };

  const updateMissingCards = (siteUserCards: UserCards) => {
    const userCardsId: number[] = siteUserCards.map((item) => item.CardId);
    const userName = siteUserCards[0].UserName;
    // If the user has less cards in the SharePoint list it's needed to fill the missing ones with default values
    const missingCards = defaultUserCards
      .filter((item) => !userCardsId.includes(item.CardId))
      .map((newItem) => ({ ...newItem, UserName: userName }));
    setUserCards([...siteUserCards, ...missingCards]);
  };

  const handleSelectedUser = async (userId: number, userTitle: string) => {
    setCurrentUser({
      Id: userId,
      Title: userTitle,
    });
    if (!userId) return setUserCards(defaultUserCards);

    const response = await getUserNewsLetter(userId);
    if (response) {
      const userNewsLetter: INewsLetterEvidence[] = response.value;
      // Case: User doesn't have any card item in the SharePoint list
      if (userNewsLetter.length === 0) {
        return updateCardsNewUser(userId, userTitle);
      }
      const siteUserCards: UserCards = userNewsLetter.map((item) => {
        return {
          Id: item.Id,
          CardId: item.CardId,
          CardState: item.CardState,
          UserName: item.UserName,
        };
      });
      // Case: User has less card items in the SharePoint list than the total ones (3)
      if (userNewsLetter.length < totalCards) {
        return updateMissingCards(siteUserCards);
      }
      setUserCards(siteUserCards);
    }
  };

  const handleCheckedCard = (cardId: number, isChecked: boolean) => {
    const updatedCards = userCards.map((userCard) => {
      if (userCard.CardId === cardId) {
        return { ...userCard, CardState: isChecked };
      }
      return userCard;
    });
    setUserCards(updatedCards);
  };

  const handleClearUserCards = () => {
    if (currentUser.Id) {
      return updateCardsNewUser(currentUser.Id, currentUser.Title);
    }
    setUserCards(defaultUserCards);
  };

  const handleUpdateUserCards = async () => {
    // No user selected
    if (!currentUser.Id) return;
    setIsLoading(true);
    // Update/Create cards
    await fetchUpdateUserCards(userCards);

    setIsLoading(false);
  };

  React.useEffect(() => {
    if (usersList) {
      setIsLoading(false);
    }
  }, [usersList]);

  return (
    <div className={styles.newsLetter}>
      <Header />
      {isLoading ? (
        <div />
      ) : (
        <>
          <UserField
            currentUser={currentUser}
            onSelectUser={handleSelectedUser}
            usersList={usersList}
          />
          <div className={styles.grid}>
            {userCards.map((card, i) => (
              <Card
                checked={card.CardState}
                id={card.CardId}
                description={randomDescriptions[i]}
                imageUrl={randomImages[i]}
                title={randomTitles[i]}
                onChecked={handleCheckedCard}
              />
            ))}
          </div>
          <Footer
            onClearCards={handleClearUserCards}
            onUpdateCards={handleUpdateUserCards}
          />
        </>
      )}
    </div>
  );
}
