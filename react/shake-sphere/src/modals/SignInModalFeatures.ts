import { State } from '../contexts/AppContext';

export default async function sendSignInInfo(
  appContext: State | null,
  userName: string,
  password: string,
) {
  const signInURL = 'http://localhost/api/sign-in';
  await fetch(signInURL, {
    method: 'POST',
    body: JSON.stringify({
      name: userName,
      password,
    }),
  })
    .then((response) => {
      if (response.statusText === 'OK') {
        appContext!.setIsSignedIn(true);
        appContext!.setUserName(userName);
        return Promise.resolve();
      }
      return Promise.reject();
    });
}
