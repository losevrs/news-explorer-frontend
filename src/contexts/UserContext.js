import React, { useContext } from 'react'

const UserContext = React.createContext();

export const useUserContext = () => {
  return useContext(UserContext);
}

export const UserContextProvider = (props) => {
  return (
    <UserContext.Provider value={props.value}>
      {props.children}
    </UserContext.Provider>
  );
}
