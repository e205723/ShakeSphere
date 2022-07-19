import { State } from '../contexts/AppContext';

export default async function FetchUserState(appContext: State | null) {
  const fetchUserStateURL = 'http://localhost/api/fetch-user-state';
  await fetch(fetchUserStateURL, {
    method: 'GET',
  })
    .then((response) => {
      if (response.statusText === 'OK') {
        return Promise.resolve(response.json());
      }
      return Promise.reject();
    })
    .then((json) => {
      appContext!.setIsSignedIn(true);
      appContext!.setUserName(json!.userName);
      appContext!.setHaveMessagesBeenRead(json!.haveMessagesBeenRead === '1');
      return Promise.resolve();
    });
}
