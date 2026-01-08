function login() {
  google.accounts.id.initialize({
    client_id: "YOUR_GOOGLE_CLIENT_ID",
    callback: handleResponse
  });

  google.accounts.id.prompt();
}

function handleResponse(response) {
  fetch("http://127.0.0.1:8000/auth/google/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: response.credential })
  })
  .then(res => res.json())
  .then(data => console.log(data));
}
