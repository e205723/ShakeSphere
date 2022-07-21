import { State } from '../contexts/AppContext';

export default async function markMessagesAsRead(appContext: State | null) {
  const signInURL = 'http://localhost/api/mark-messages-as-read';
  await fetch(signInURL, { method: 'POST' })
    .then(() => appContext!.setHaveMessagesBeenRead(true));
}
