import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box, CircularProgress, Snackbar, Alert } from '@mui/material';
import { createUser } from '../api.ts';
import { useNavigate } from 'react-router-dom';


const SignUp: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const [successAlertOpen, setSuccessAlertOpen] = useState<boolean>(false);
    const [failureAlertOpen, setFailureAlertOpen] = useState<boolean>(false);

    const navigate = useNavigate();
    const MAX_USERNAME_LENGTH = 50;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            await createUser({username});
            setUsername('');
            setSuccessAlertOpen(true);
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (error) {
            setFailureAlertOpen(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="xs">
            <Box mt={4}>
                <Typography variant="h4" align="center" gutterBottom>
                    Sign Up
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        required
                        margin="normal"
                        value={username}
                        onChange={(e) => {
                            if (e.target.value.length <= MAX_USERNAME_LENGTH) {
                                setUsername(e.target.value);
                            }
                        }}
                        helperText={`${username.length} / ${MAX_USERNAME_LENGTH} characters`}
                        slotProps={{
                            htmlInput: { spellCheck: 'false' }
                        }}
                    />
                    
                    <Box display="flex" justifyContent="center" mt={2}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : 'Sign Up'}
                        </Button>
                    </Box>
                </form>
            </Box>

            <Snackbar 
                open={successAlertOpen} 
                autoHideDuration={5000}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                onClose={() => setSuccessAlertOpen(false)}
            >
                <Alert
                    onClose={() => setSuccessAlertOpen(false)}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    User account created successfully!
                </Alert>
            </Snackbar>

            <Snackbar 
                open={failureAlertOpen} 
                autoHideDuration={5000} 
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                onClose={() => setFailureAlertOpen(false)}
            >
                <Alert
                    onClose={() => setFailureAlertOpen(false)}
                    severity="error"
                    variant="filled"
                    
                    sx={{ width: '100%' }}
                >
                    Error creating user account!
                </Alert>
            </Snackbar>
        </Container>
    );
};


export default SignUp;
