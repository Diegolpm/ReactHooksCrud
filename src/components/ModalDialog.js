import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Form from './Form';

const ModalDialog = ({ open, handleClose, selectItem }) => {
    
    // console.log(selectItem);

    return (
        // props received from App.js
        <Dialog open={open} onClose={handleClose}>

            <Form handleClose={handleClose} selectItem={selectItem} />
        </Dialog>
    );
};

export default ModalDialog;