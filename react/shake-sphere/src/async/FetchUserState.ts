import { State } from '../contexts/AppContext';

export default async function FetchUserState(appContext: State | null) {
  const welcomeURL = 'http://localhost/api/authenticate-with-JWT';
  await fetch(welcomeURL)
    .then((response) => {
      if (response.statusText === 'OK') {
        return Promise.resolve(response.json());
      }
      return Promise.reject();
    })
    .then((json) => {
      appContext!.setIsSignedIn(true);
      appContext!.setUserName(json!.userName);
      appContext!.setHaveMessagesBeenRead(json!.haveMessagesBeenRead);
    });
}
