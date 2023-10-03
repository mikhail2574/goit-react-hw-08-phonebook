import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '../../redux/auth/operations';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { Navigate } from 'react-router-dom';
const Login = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    dispatch(
      logIn({
        email: form.elements.email.value,
        password: form.elements.password.value,
      })
    );
    form.reset();
  }
  if (isLoggedIn) {
    return <Navigate to="/contacts" />;
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input type="email" name="email" required />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" required />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
