import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import Header from "./components/Header";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Pricing from "./pages/Pricing";
import GenerateQuiz from './pages/GenerateQuiz';
import QuizSession from './pages/QuizSession';

export default function App() {
  const {currentUser} = useSelector((state) => state.user);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={currentUser ? <Navigate to="/dashboard" replace /> : <Home />} />
        <Route path="/sign-in" element={currentUser ? <Navigate to="/dashboard" replace /> : <Login />} />
        <Route path="/sign-up" element={currentUser ? <Navigate to="/dashboard" replace /> : <Signup />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/quiz" element={<GenerateQuiz />} />
          <Route path="/quiz/session" element={<QuizSession />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
