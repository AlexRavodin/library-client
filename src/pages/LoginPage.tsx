import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/ui/card"
import {useAuth} from "@/utils/AuthProvider.tsx";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login} = useAuth();

  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt with:', { email, password });

    const loginError = await login(email, password);

    if (loginError !== null){
      setError("Error occurred: " + loginError.errorMessage + "." + " " + loginError.errors?.reduce((result, e) => result + e));
    }

  };


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
          <CardDescription className="text-center">Please sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
            {error && <div>Error: {error}</div>}
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Link to="/forgot-password" className="text-sm text-teal-600 hover:underline">
            Forgot your password?
          </Link>
          <div className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-teal-600 hover:underline">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;

