import React from 'react';
import { ClipLoader } from 'react-spinners';
import styles from './Spinner.module.css';

interface SpinnerProps {
    size?: number;
    color?: string;
    loading?: boolean;
    text?: string;
}

const Spinner: React.FC<SpinnerProps> = ({
    size = 35,
    color = '#007bff',
    loading = true,
    text = 'Loading...'
}) => {
    if (!loading) return null;

    return (
        <div className={styles['spinner-container']}>
            <ClipLoader
                color={color}
                loading={loading}
                size={size}
                aria-label="Loading Spinner"
            />
            {text && <p className={styles['spinner-text']}>{text}</p>}
        </div>
    );
};

export default Spinner;