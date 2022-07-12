import {
  createContext, useState, useMemo, FC, ReactNode,
} from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  userName: string,
  setUserName: (arg: string) => void,
}

export const AppContext = createContext<State | null>(null);
export const AppContextProvider: FC<Props> = function contextComponent({ children }) {
  const [userName, setUserName] = useState('Shakespeare');

  const value = useMemo(() => ({
    userName,
    setUserName,
  }), [userName]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
