import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "../components/ui/button"

const LogoutPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));

      navigate('/');
    };
    logout();
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Logging Out...</h1>
      <p className="mb-4">Please wait while we securely log you out.</p>
      <Button onClick={() => navigate('/')}>Return to Home</Button>
    </div>
  );
};

export default LogoutPage;

