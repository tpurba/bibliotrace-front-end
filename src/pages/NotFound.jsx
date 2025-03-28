import React from "react";

const NotFound = () => {
  return (
    <div style={styles.body}>
      <h1 style={styles.h1}>404</h1>
      <p style={styles.p}>Oops! The page or asset you are looking for cannot be found.</p>
      <a href="/" style={styles.a}>
        Go back to the homepage
      </a>
    </div>
  );
};

// this is the same styles that are listed in vite404.html
const styles = {
  body: {
    fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
    textAlign: "center",
    backgroundColor: "#f4f4f4",
    color: "#333",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  h1: {
    fontSize: "4rem",
    marginBottom: "1rem",
  },
  p: {
    fontSize: "1.2rem",
    marginBottom: "2rem",
  },
  a: {
    textDecoration: "none",
    color: "#007bff",
    fontWeight: "bold",
  },
  aHover: {
    textDecoration: "underline",
  },
};

export default NotFound;
