import { State } from '../contexts/AppContext';

export default async function SignIn(
  appContext: State | null,
  name: string,
  password: string,
) {
  const signInURL = 'http://localhost/api/sign-in';
  await fetch(signInURL, {
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
    });
}
