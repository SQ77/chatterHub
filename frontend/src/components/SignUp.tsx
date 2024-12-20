import React, { useEffect, useState } from 'react';
import { TextField, Button, Typography, Container, Box, CircularProgress, Snackbar, Alert } from '@mui/material';
import { createUser, getUsers, User } from '../api.ts';
import { Link, useNavigate } from 'react-router-dom';

const SignUp: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [existingUsers, setExistingUsers] = useState<User[]>([]);
    const [usernameExists, setUsernameExists] = useState<boolean>(false);

    const [successAlertOpen, setSuccessAlertOpen] = useState<boolean>(false);
    const [failureAlertOpen, setFailureAlertOpen] = useState<boolean>(false);
    const [failureMessage, setFailureMessage] = useState<string>('Error!');

    const navigate = useNavigate();
    const MAX_USERNAME_LENGTH = 50;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersData = await getUsers();
                setExistingUsers(usersData);
            } catch (err) {
                setFailureMessage("Error fetching users!");
                setFailureAlertOpen(true);
            } finally {
                setLoading(false);
            }
        };
    
        fetchUsers();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        if (usernameExists) {
            setFailureMessage("Username already exists!");
            setFailureAlertOpen(true);
            setLoading(false);
            return;
        }

        try {
            await createUser({username});
            setUsername('');
            setSuccessAlertOpen(true);
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (error) {
            setFailureMessage("Error creating user account!");
            setFailureAlertOpen(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{ maxWidth: 400, margin: 'auto', padding: 4, textAlign: 'center' }}>
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
                                setUsernameExists(existingUsers.some(user => user.username === e.target.value));
                            }
                        }}
                        helperText={
                            usernameExists
                                ? "This username is already taken."
                                : `${username.length} / ${MAX_USERNAME_LENGTH} characters`
                        }
                        error={usernameExists}
                        slotProps={{
                            htmlInput: { spellCheck: 'false' }
                        }}
                    />

                    <Typography 
                        variant="subtitle2" 
                        gutterBottom 
                        sx={{
                            mb : 2,
                            '&:hover': {
                                textDecoration: 'underline',
                            },
                        }}  
                    >
                        <Link to="/login" >
                            Already have an account? Sign In here.
                        </Link>
                    </Typography>
                    
                    <Box display="flex" justifyContent="center" mt={2}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={loading || usernameExists}
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
                    {failureMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};


export default SignUp;
