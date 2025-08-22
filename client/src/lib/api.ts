const API = import.meta.env.VITE_API_URL;

export const registerUser = async (data: { email: string, password: string }) => {
  const res = await fetch(`${API}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
};
