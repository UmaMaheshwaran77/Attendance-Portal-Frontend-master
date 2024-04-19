import React, { useEffect, useState } from "react";
import { Route, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

function ProtectedRoute({ component: Component, ...rest }) {
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser) {
      setLoading(false);
    } else {
      navigate("/");
    }
  }, [currentUser, navigate]); 

  return loading ? "Loading..." : <Component {...rest} />;
}

export default ProtectedRoute; 