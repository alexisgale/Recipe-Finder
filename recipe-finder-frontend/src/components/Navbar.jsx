import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, login } from "../redux/authSlice";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !isAuthenticated) {
      dispatch(login({ user: { name: "User" }, token }));
    }
  }, [dispatch, isAuthenticated]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav style={styles.navbar}>
      <Link to="/" style={styles.logoContainer}>
        <img
          src="https://png.pngtree.com/png-vector/20220708/ourmid/pngtree-fast-food-logo-png-image_5763171.png"
          alt="Recipe Finder Logo"
          style={styles.logo}
        />
        <span style={styles.title}>Recipe Finder</span>
      </Link>
      <div style={styles.navLinks}>
        <Link to="/" style={styles.link}>
          Home
        </Link>
        <Link to="/favorites" style={styles.link}>
          Favorites
        </Link>
      </div>
      {isAuthenticated ? (
        <div style={styles.authContainer}>
          <span style={styles.welcomeText}>Welcome, {user?.name}</span>
          <button onClick={handleLogout} style={styles.button}>
            Logout
          </button>
        </div>
      ) : (
        <div style={styles.authContainer}>
          <Link to="/login" style={styles.link}>
            Login
          </Link>
          <Link to="/signup" style={styles.link}>
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "5px 20px", // Reduced padding for smaller navbar
    backgroundColor: "blue", // Changed background to blue
    color: "#fff",
    height: "50px", // Reduced height for smaller navbar
    fontFamily: "Arial, sans-serif", // Set Arial font
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none", // Removes default link styling
  },
  logo: {
    height: "40px",
    marginRight: "10px", // Reduced margin between logo and title
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#fff",
  },
  navLinks: {
    display: "flex",
    gap: "20px",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "18px", // Increased font size
    fontWeight: "bold",
    padding: "8px 15px",
    borderRadius: "20px",
    transition: "background 0.3s ease",
  },
  button: {
    backgroundColor: "#388E3C",
    color: "#fff",
    border: "none",
    padding: "8px 15px",
    borderRadius: "20px",
    cursor: "pointer",
    transition: "background 0.3s ease",
  },
  authContainer: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: "16px",
    fontWeight: "bold",
  },
};

export default NavBar;
