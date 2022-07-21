import { useState, useContext, useEffect } from 'react';
import { AppContext } from '../contexts/AppContext';
import { MessagesContext } from '../contexts/MessagesContext';
import fetchMessages from '../async/FetchMessages';

function Messages() {
  const appContext = useContext(AppContext);
  const messagesContext = useContext(MessagesContext);
  const [message, setMessage] = useState('');
  const [isMessageLoaded, setIsMessageLoaded] = useState(false);
  const [messageId, setMessageId] = useState(1);
  const hintMessageButtonAction = () => {
    setMessage(messagesContext!.messages[messageId - 1].messageContent);
    setIsMessageLoaded(true);
  };
  const nextButtonAction = () => {
    if (!messagesContext!.messages[messageId - 1].isLast) {
      setMessageId(() => {
        const nextMessageId = messagesContext!.messages[messageId - 1].nextId;
        setMessage(messagesContext!.messages[nextMessageId - 1].messageContent);
        return nextMessageId;
      });
    }
  };
  const yesButtonAction = () => {
    setMessageId(() => {
      const nextMessageId = messagesContext!.messages[messageId - 1].nextId;
      setMessage(messagesContext!.messages[nextMessageId - 1].messageContent);
      return nextMessageId;
    });
  };
  const noButtonAction = () => {
    setMessageId(() => {
      const nextMessageId = messagesContext!.messages[messageId - 1].nextIdIfNo;
      setMessage(messagesContext!.messages[nextMessageId - 1].messageContent);
      return nextMessageId;
    });
  };
  const endButtonAction = () => {
    setMessageId(() => {
      setIsMessageLoaded(false);
      setMessage('');
      return 1;
    });
  };
  useEffect(() => {
    fetchMessages(messagesContext);
  }, []);
  if (!isMessageLoaded) {
    return (
      <div>
        <div>
          <button type="button" onClick={hintMessageButtonAction}>Ask for a hint of the next destination</button>
        </div>
        <div>
          <button type="button">Talk to Armeria</button>
        </div>
        <div>
          <p>アルメリアに話かけてください</p>
        </div>
      </div>
    );
  }
  if (messagesContext!.messages[messageId - 1].isQuestion) {
    return (
      <div>
        <div>
          <p>{message}</p>
        </div>
        <div>
          <button type="button" onClick={yesButtonAction}>Yes</button>
          <button type="button" onClick={noButtonAction}>No</button>
        </div>
      </div>
    );
  }
  if (messagesContext!.messages[messageId - 1].isLast) {
    return (
      <div>
        <div>
          <p>{message}</p>
        </div>
        <div>
          <button type="button" onClick={endButtonAction}>End</button>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div>
        <p>{message}</p>
      </div>
      <div>
        <button type="button" onClick={nextButtonAction}>Next</button>
      </div>
    </div>
  );
}
export default Messages;
