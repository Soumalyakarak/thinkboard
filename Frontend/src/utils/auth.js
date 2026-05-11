export const registerUser = async (data) => {
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      throw new Error("Registration failed");
    }
  
    return res.json();
};
  

export const loginUser = async (credentials) => {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // 🔥 cookie-based auth
      body: JSON.stringify(credentials)
    });
  
    if (!res.ok) {
      throw new Error("Login failed");
    }
  
    return res.json();
};

export const logout = async () => {
  const res = await fetch("http://localhost:5000/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Logout failed");
  }

  return true;
};

  
export const getMe = async () => {
  const res = await fetch("http://localhost:5000/api/auth/me", {
    credentials: "include",
  });

  if (res.status === 401) {
    return null;
  }

  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  const data = await res.json();
  return data.user;
};
