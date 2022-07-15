import {
  createContext, useState, useMemo, FC, ReactNode,
} from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  isSignedIn: boolean,
  setIsSignedIn: (arg: boolean) => void,
  userName: string,
  setUserName: (arg: string) => void,
  currentMessageId: number,
  setCurrentMessageId: (arg: number) => void,
  nextDestinationId: number,
  setNextDestinationId: (arg: number) => void,
}

export const AppContext = createContext<State | null>(null);
export const AppContextProvider: FC<Props> = function contextComponent({ children }) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [currentMessageId, setCurrentMessageId] = useState(0);
  const [nextDestinationId, setNextDestinationId] = useState(0);

  const value = useMemo(() => ({
    isSignedIn,
    setIsSignedIn,
    userName,
    setUserName,
    currentMessageId,
    setCurrentMessageId,
    nextDestinationId,
    setNextDestinationId,
  }), [userName, currentMessageId, nextDestinationId]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
