import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

export default function Header() {
    return (
        <header className={styles['header']}>
            <nav className={styles['nav']}>
                <NavLink
                    to="/"
                    className={styles['nav-link']}
                    style={({ isActive }) => isActive ? { color: '#007bff' } : {}}
                >
                    Dashboard
                </NavLink>

                <NavLink
                    to="/submit-feedback"
                    className={styles['nav-link']}
                    style={({ isActive }) => isActive ? { color: '#007bff' } : {}}
                >
                    Create
                </NavLink>
            </nav>
        </header>
    );
}


