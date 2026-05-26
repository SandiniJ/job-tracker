import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.brand} onClick={() => navigate('/dashboard')}>
        <span className={styles.logo}>◈</span>
        <span className={styles.name}>JobTracker</span>
      </div>
      {user && (
        <div className={styles.right}>
          <span className={styles.greeting}>Hey, {user.name?.split(' ')[0]}</span>
          <button className="btn btn-ghost" onClick={handleLogout}>Logout</button>
        </div>
      )}
    </nav>
  );
}
