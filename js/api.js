const API_URL = "https://projeto-cafeteria-servidor.onrender.com"; 

async function apiGet(endpoint) {
  const res = await fetch(API_URL + endpoint);
  return res.json();
}

async function apiPost(endpoint, data) {
  const res = await fetch(API_URL + endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

async function apiPut(endpoint, data) {
  const res = await fetch(API_URL + endpoint, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

async function apiDelete(endpoint) {
  const res = await fetch(API_URL + endpoint, { method: "DELETE" });
  return res.json();
}

export { apiGet, apiPost, apiPut, apiDelete };
