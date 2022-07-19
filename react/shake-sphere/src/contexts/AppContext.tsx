import {
  createContext, useState, useMemo, FC, ReactNode,
} from 'react';

interface Props {
  children: ReactNode;
}

export type State = {
  isSignedIn: boolean,
  setIsSignedIn: (arg: boolean) => void,
  userName: string,
  setUserName: (arg: string) => void,
  haveMessagesBeenRead: boolean,
  setHaveMessagesBeenRead: (arg: boolean) => void,
}

export const AppContext = createContext<State | null>(null);
export const AppContextProvider: FC<Props> = function contextComponent({ children }) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [haveMessagesBeenRead, setHaveMessagesBeenRead] = useState(false);

  const value = useMemo(() => ({
    isSignedIn,
    setIsSignedIn,
    userName,
    setUserName,
    haveMessagesBeenRead,
    setHaveMessagesBeenRead,
  }), [isSignedIn, userName, haveMessagesBeenRead]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
