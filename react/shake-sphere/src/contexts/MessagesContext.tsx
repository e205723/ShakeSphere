import {
  createContext, useState, useMemo, FC, ReactNode,
} from 'react';

interface Props {
  children: ReactNode;
}

export type Message = {
  id: number,
  messageContent: string,
  isQuestion: boolean,
  isLast: boolean,
  nextId: number,
  nextIdIfNo: number,
}

export type State = {
  messages: Message[],
  setMessages: (arg: Message[]) => void,
}

export const MessagesContext = createContext<State | null>(null);
export const MessagesContextProvider: FC<Props> = function contextComponent({ children }) {
  const [messages, setMessages] = useState([] as Message[]);

  const value = useMemo(() => ({
    messages,
    setMessages,
  }), [messages]);

  return (
    <MessagesContext.Provider value={value}>
      {children}
    </MessagesContext.Provider>
  );
};
