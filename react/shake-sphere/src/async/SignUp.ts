import { State } from '../contexts/AppContext';

export default async function signUp(
  appContext: State | null,
  name: string,
  password: string,
) {
  const signUpURL = 'http://localhost/api/sign-up';
  await fetch(signUpURL, {
    method: 'POST',
    body: JSON.stringify({
      name,
      password,
    }),
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
      appContext!.setHaveMessagesBeenRead(json!.haveMessagesBeenRead);
      return Promise.resolve();
    });
}
