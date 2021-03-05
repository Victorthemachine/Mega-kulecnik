import React from 'react';
const apiTool = require('./../utilities/apiTool');
const API = new apiTool();

/**
 * DON'T TOUCH THIS. It's here so the whole project doesn't crash and burn.
 * You don't need to touch this it's basically a try catch for react.
 */
class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      // You can also log the error to an error reporting service
      API.log(error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return <h1>Something went wrong.</h1>;
      }
  
      return this.props.children; 
    }
}

export default ErrorBoundary;