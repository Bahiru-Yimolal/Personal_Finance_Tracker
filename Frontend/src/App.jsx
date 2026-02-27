import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './features/auth/pages/Login';
import Register from './features/auth/pages/Register';
import { ToastContainer } from "react-toastify";
import Home from './pages/Home';
import ForgotPassword from './features/auth/pages/ForgotPassword';
import PublicRoute from './components/routes/PublicRoute';
import ProtectedRoute from './components/routes/ProtectedRoute';
import RoleRoute from './components/routes/RoleRoute';
import Dashboard from './pages/Dashboard';
import Form from './pages/Form';
import DashboardLayout from './components/Layouts/DashboardLayout';
import HomeLayout from './components/Layouts/HomeLayout';
import Profile from './features/user/pages/Profile';
import ChangePassword from './features/user/pages/changePassword';
import MyTransactions from './pages/transactions/MyTransactions';
import TransactionForm from './features/transactions/components/TransactionForm';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AllTransactions from './pages/admin/AllTransactions';

const App = () => {
  return (
    <>
      <Routes>
        {/* Public auth pages */}
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
          {/* <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> */}
          <Route path="/forgot-password" element={<ForgotPassword />} />

        </Route>

        {/* Protected */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/password" element={<ChangePassword />} />

            {/* Admin only */}
            <Route element={<RoleRoute allowedRoles={["ADMIN"]} />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/all-transactions" element={<AllTransactions />} />
            </Route>

            {/* User & Admin */}
            <Route element={<RoleRoute allowedRoles={["USER", "ADMIN"]} />}>
              <Route path="/transaction" element={<TransactionForm />} />
              <Route path="/mytransactions" element={<MyTransactions />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Route>

        </Route>

        {/* <Route path="/unauthorized" element={<Unauthorized />} /> */}
      </Routes>
      <ToastContainer
        position="top-center"  // top-center
      // autoClose={3000}      // closes after 3s
      />
    </>

  );
};

export default App;