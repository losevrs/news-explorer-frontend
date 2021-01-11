import React, { useContext } from 'react'

const DataContext = React.createContext();

export const useDataContext = () => {
  return useContext(DataContext);
}

export const DataContextProvider = (props) => {
  return (
    <DataContext.Provider value={props.value}>
      {props.children}
    </DataContext.Provider>
  );
}