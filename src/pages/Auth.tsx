import React, { useState } from "react";
import Login from "@/components/auth/Login";
import SignUp from "@/components/auth/SignUp";

interface AuthProps {
  onSuccess: () => void;
}

const Auth: React.FC<AuthProps> = ({ onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            Daily Burst Coach
          </h1>
          <p className="text-muted-foreground">
            Empowering minds, one micro-lesson at a time
          </p>
        </div>
        
        {isLogin ? (
          <Login onToggleForm={toggleForm} onSuccess={onSuccess} />
        ) : (
          <SignUp onToggleForm={toggleForm} onSuccess={onSuccess} />
        )}
      </div>
    </div>
  );
};

export default Auth;
