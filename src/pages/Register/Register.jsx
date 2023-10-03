import React from 'react';
import { register } from '../../redux/auth/operations';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from 'redux/auth/selectors';
import { Navigate } from 'react-router-dom';

const Register = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  if (isLoggedIn) {
    return <Navigate to="/contacts" />;
  }
  function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    dispatch(
      register({
        name: form.elements.name.value,
        email: form.elements.email.value,
        password: form.elements.password.value,
      })
    );
    form.reset();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input type="text" name="name" required />
      <label htmlFor="email">Email</label>
      <input type="email" name="email" required />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" required />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
