export const createCanvas = async (name) => {
  const res = await fetch("http://localhost:5000/api/canvas", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

  // 🔥 read text FIRST
  const text = await res.text();

  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    throw new Error("Invalid server response");
  }

  if (!res.ok) {
    const error = new Error(data.message || "Failed to create canvas");
    error.status = res.status;
    throw error;
  }

  return data;
};



export const getAllCanvases = async () => {
  const res = await fetch("http://localhost:5000/api/canvas", {
    method: "GET",
    credentials: "include", // 🔥 required for auth cookie
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json(); // read once

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch canvases");
  }

  return data.canvases; // array of canvases
};

export const updateCanvas = async (canvasId, elements) => {
  const res = await fetch(
    `http://localhost:5000/api/canvas/${canvasId}`,
    {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ elements }),
    }
  );

  const text = await res.text();
  let data;

  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    throw new Error("Invalid server response");
  }

  if (!res.ok) {
    const error = new Error(data.message || "Failed to update canvas");
    error.status = res.status;
    throw error;
  }

  return data.canvas; // 🔥 updated canvas
};

export const shareCanvas = async (canvasId, email) => {
  const res = await fetch(
    `http://localhost:5000/api/canvas/${canvasId}/share`,
    {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to share canvas");
  }

  return data;
};

export const deleteCanvas = async (canvasId) => {
  const res = await fetch(`http://localhost:5000/api/canvas/${canvasId}`, {
    method: "DELETE",
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok) {
    const err = new Error(data.message || "Failed to delete canvas");
    err.status = res.status;
    throw err;
  }
  return data;
};




