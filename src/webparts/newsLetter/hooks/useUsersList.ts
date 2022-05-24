import { useEffect, useState } from "react";

import { ISiteUserInfo } from "@pnp/sp/site-users/types";
import { IPersonaProps } from "office-ui-fabric-react/lib/Persona";
import { getSiteUsers } from "../services/sp";

function useUsersList() {
  const [usersList, setUsersList] = useState(null);
  useEffect(() => {
    const fetchSiteUsers = async () => {
      const siteUsers: ISiteUserInfo[] = await getSiteUsers();
      if (siteUsers.length > 0) {
        const validUsers = siteUsers.filter((user) => user.Email);
        const personaList: IPersonaProps[] = validUsers.map((user) => {
          return {
            key: user.Id,
            text: user.Title,
          };
        });
        setUsersList(personaList);
      }
    };
    fetchSiteUsers();
  }, []);
  return usersList;
}

export { useUsersList };
