export default function sendSignUpInfo(userName: string, password: string) {
  return new Promise(() => {
    fetch('http://localhost/api/sign-up', {
      method: 'POST',
      body: JSON.stringify({
        name: userName,
        password,
      }),
    });
  });
}
