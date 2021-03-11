import React, { useState, useEffect } from "react";

function Root() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const token = localStorage.token;
    const configObj = {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    };
    fetch(`http://localhost:3000/users/${localStorage.id}`, configObj)
      .then((resp) => resp.json())
      .then((data) => {
        setUser(data);
      });
  }, []);

  return (
    <div className="root">
      <h1 className="home-title">
        <span>Welcome to Play it by Ear,</span>
        <span>{user.username}!</span>
      </h1>
    </div>
  );
}

export default Root;
