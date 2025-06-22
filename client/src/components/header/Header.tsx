import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

export default function Header() {
    return (
        <header className={styles['header']}>
            <nav className={styles['nav']}>
                <NavLink
                    to="/"
                    className={({ isActive }) => 
                        `${styles['nav-link']} ${isActive ? styles['nav-link-active'] : ''}`
                    }
                >
                    Dashboard
                </NavLink>

                <NavLink
                    to="/submit-feedback"
                    className={({ isActive }) => 
                        `${styles['nav-link']} ${isActive ? styles['nav-link-active'] : ''}`
                    }
                >
                    Create
                </NavLink>
            </nav>
        </header>
    );
}