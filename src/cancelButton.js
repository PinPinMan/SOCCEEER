import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const CancelButton = () => {
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleCancelTransaction = () => {
        handleCloseModal(); // Close modal after confirming cancellation
        // Clear session storage except admin
        Object.keys(sessionStorage).forEach((key) => {
            if (key !== 'admin') {
                sessionStorage.removeItem(key);
            }}); 
        window.location.href = '/';
    };

    return (
        <>
            <Box sx={{position: 'absolute', top: 150, right: 20}}>
                <Button sx={{backgroundColor: '#f44336', color: 'white', '&:hover': {backgroundColor: '#d32f2f'}}}
                    variant="outlined"
                    color="secondary"
                    onClick={handleOpenModal}
                >
                    X
                </Button>
            </Box>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="cancel-transaction-modal-title"
                aria-describedby="cancel-transaction-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        maxWidth: 400,
                        minWidth: 300,
                        borderRadius: '5px',
                        textAlign: 'center',
                    }}
                >
                    <h2 id="cancel-transaction-modal-title">Cancel Transaction</h2>
                    <p id="cancel-transaction-modal-description">Are you sure you want to cancel the transaction?</p>
                    <Button variant="contained" onClick={handleCancelTransaction} sx={{ mr: 2 }}>Yes</Button>
                    <Button variant="outlined" onClick={handleCloseModal}>No</Button>
                </Box>
            </Modal>
        </>
    );
};

export default CancelButton;
