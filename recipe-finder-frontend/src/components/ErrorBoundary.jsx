import React, { Component } from "react";
import PropTypes from "prop-types"; // Import PropTypes

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false }; // Removed error and info
  }

  static getDerivedStateFromError() {
    return { hasError: true }; // No need to pass the error object here
  }

  componentDidCatch(error, info) {
    console.error("Error caught by ErrorBoundary:", error, info); // Still log the error for debugging
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "20px", textAlign: "center", color: "red" }}>
          <h2>Something went wrong.</h2>
          <p>We're sorry for the inconvenience. Please try again later.</p>
        </div>
      );
    }

    return this.props.children; // Render children if no error
  }
}

// Prop validation for `children` prop
ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired, // Ensures that `children` is passed and is a valid React node
};

export default ErrorBoundary;
