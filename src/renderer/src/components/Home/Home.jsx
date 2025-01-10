import { useState } from 'react';
import Credential from '../Form/Credential';
import styles from './Home.module.css';
import { MdOutlineSettings } from 'react-icons/md';

const Home = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleFormSubmit = async (ssid, password) => {
        setIsLoading(true);

        try {
            const result = await window.electronAPI.turnOnHotspot(ssid, password);
            setIsLoading(false);

            if (result.success) {
                console.log('Hotspot turned on successfully!');
            } else {
                console.error('Error turning on hotspot:', result.message);
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            setIsLoading(false);
            console.error('Unexpected error:', error);
            alert('An unexpected error occurred.');
        }
    };

    return (
        <>
            <div className={styles.setting2} onClick={openModal}>
                <MdOutlineSettings style={{ fontSize: '24px' }} />
            </div>
            <span className={styles.home}>
                {isModalOpen && (
                    <Credential
                        closeModal={closeModal}
                        handleSubmit={handleFormSubmit}
                        isLoading={isLoading}
                    />
                )}
            </span>
        </>
    );
};

export default Home;
