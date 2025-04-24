import React, { createContext, useState, useContext, useEffect } from "react";
import Axios from "axios";
import { toast } from "react-toastify";

// Create Auth context
const AuthContext = createContext(null);

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  let value = localStorage.getItem("refreshCycle")
    ? localStorage.getItem("refreshCycle")
    : false;
  const [isAuthenticated, setIsAuthenticated] = useState(value);
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);

  // Set base URL for API requests
  const API_BASE_URL = "http://localhost:5001";
  const API_VERSION = "/api/v1";
  
  Axios.defaults.baseURL = API_BASE_URL;

  // Load user from localStorage and verify token on initial mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
      verifyToken(storedToken);
      
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setUserType(userData.role);
      }
    } else {
      setIsAuthenticated(false);
      setLoading(false);
    }
  }, []);

  // Used to set token
  const activateToken = (value) => {
    setToken(value);
    return;
  };

  // Used to set authentication
  const activateAuthentication = (value) => {
    setIsAuthenticated(value);
    localStorage.setItem("refreshCycle", value);
    return;
  };

  // Function to verify if token is valid or not
  const verifyToken = async (tokenValue) => {
    try {
      const response = await Axios.get(
        `${API_BASE_URL}${API_VERSION}/auth/verify-token`,
        { headers: { "x-access-token": tokenValue } }
      );
      
      setIsAuthenticated(response.data);
      localStorage.setItem("refreshCycle", response.data);
      setLoading(false);
    } catch (error) {
      console.error("Token verification error:", error);
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  // Login function (for regular email/password login)
  const login = async (email, password, redirectCallback) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}${API_VERSION}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("refreshCycle", true);
        
        setToken(data.token);
        setUser(data.user);
        setIsAuthenticated(true);
        setUserType(data.user.role);
        
        toast.success("Login successful!");
        
        // Use callback for navigation instead of useNavigate
        if (redirectCallback) {
          redirectCallback("/dashboard");
        }
        return true;
      } else {
        toast.error(data.message || "Login failed");
        return false;
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Login error:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Social login handler (Google/Facebook)
  const socialLogin = async (provider, tokenData, redirectCallback) => {
    try {
      setLoading(true);
      const endpoint = provider === 'google' ? 'google-login' : 'facebook-login';
      const payload = provider === 'google' 
        ? { token: tokenData.credential } 
        : { accessToken: tokenData.accessToken };
      
      const response = await fetch(`${API_BASE_URL}${API_VERSION}/auth/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("refreshCycle", true);
        
        setToken(data.token);
        setUser(data.user);
        setIsAuthenticated(true);
        setUserType(data.user.role);
        
        toast.success(`${provider} login successful!`);
        
        // Use callback for navigation instead of useNavigate
        if (redirectCallback) {
          redirectCallback("/dashboard");
        }
        return true;
      } else {
        toast.error(data.message || `${provider} login failed`);
        return false;
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error(`${provider} login error:`, error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = (redirectCallback) => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("refreshCycle");
    localStorage.removeItem("cart");
    
    setToken("");
    setUser(null);
    setIsAuthenticated(false);
    setUserType(null);
    
    toast.success("Logged out successfully");
    
    // Use callback for navigation instead of useNavigate
    if (redirectCallback) {
      redirectCallback("/signin");
    }
  };

  // Check if token is valid (can be called periodically)
  const checkAuthStatus = async () => {
    const currentToken = localStorage.getItem("token");
    
    if (!currentToken) {
      setIsAuthenticated(false);
      setUser(null);
      return false;
    }

    try {
      const response = await Axios.get(
        `${API_BASE_URL}${API_VERSION}/auth/verify-token`,
        { headers: { "x-access-token": currentToken } }
      );

      if (response.data) {
        return true;
      } else {
        // Token is invalid, log out
        logout();
        return false;
      }
    } catch (error) {
      console.error("Auth check error:", error);
      return false;
    }
  };

  // Value object with all auth-related state and functions
  const authContextValue = {
    user,
    token,
    isAuthenticated,
    userType,
    loading,
    setUserType,
    activateToken,
    activateAuthentication,
    login,
    socialLogin,
    logout,
    checkAuthStatus
  };

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};

// Hook to use Auth context
export const Auth = () => useContext(AuthContext);

export default AuthContext;