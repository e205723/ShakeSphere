import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

export default async function fetchUserName() {
  const appContext = useContext(AppContext);
  const welcomeURL = 'http://localhost/api/authenticate-with-JWT';

  await fetch(welcomeURL)
    .then((response) => {
      if (response.statusText === 'OK') {
        return Promise.resolve(response.json());
      }
      return Promise.reject();
    })
    .then((json) => json!.name)
    .then((name) => {
      appContext!.setIsSignedIn(true);
      appContext!.setUserName(name);
    });
}
