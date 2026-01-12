function login() {
  google.accounts.id.initialize({
    client_id: "421779667146-2iphh2quvfivv7v1iqciqu3lrpv18ghu.apps.googleusercontent.com",
    callback: handleGoogleResponse
  });

  google.accounts.id.prompt();
}

function handleGoogleResponse(response) {
  fetch("http://127.0.0.1:8000/auth/google/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      token: response.credential
    })
  })
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
}
