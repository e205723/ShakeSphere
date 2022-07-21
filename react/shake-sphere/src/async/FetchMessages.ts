import { State, Message } from '../contexts/MessagesContext';

type MessageJSON = {
  messages: Message[],
}

export default async function FetchMessages(appContext: State | null) {
  const fetchMessagesURL = 'http://localhost/api/fetch-messages';
  await fetch(fetchMessagesURL, {
    method: 'GET',
  })
    .then((response) => {
      if (response.statusText === 'OK') {
        return Promise.resolve(response.json());
      }
      return Promise.reject();
    })
    .then((json: MessageJSON) => {
      appContext!.setMessages(json.messages);
      return Promise.resolve();
    });
}
