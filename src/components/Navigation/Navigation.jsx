import { NavLink, Routes, Route, Outlet } from 'react-router-dom';
import Main from '../../pages/Main/Main';
import Login from '../../pages/Login/Login';
import Contacts from '../../pages/Contacts/Contacts';
import Register from '../../pages/Register/Register';
import useAuth from '../../hooks/useAuth';
import { UserMenu } from '../UserMenu/UserMenu';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { refreshUser } from '../../redux/auth/operations';

const Navigation = () => {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();
  const { isLoggedIn } = useAuth();
  console.log(isLoggedIn);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);
  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
    <div className="header">
      <nav>
        <NavLink to="/contacts">My contacts</NavLink>
        {isLoggedIn ? (
          <UserMenu />
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Registration</NavLink>
          </>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="contacts" element={<Contacts />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
      <Outlet />
    </div>
  );
};

export default Navigation;
