import React from 'react';
import { Box } from '@mui/material';
import TransactionForm from '../features/transactions/components/TransactionForm';

function Form() {
    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
            <TransactionForm />
        </Box>
    );
}

export default Form;