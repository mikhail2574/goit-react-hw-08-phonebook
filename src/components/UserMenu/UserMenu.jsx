import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/auth/operations';
import useAuth from '../../hooks/useAuth';
import { NavLink, useNavigate } from 'react-router-dom';

export const UserMenu = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logOut());
    navigate('/'); // Перенаправление на главную страницу
  };

  return (
    <div>
      <p>Welcome, {user.name}</p>
      <NavLink to="/contacts">My contacts</NavLink>
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};
