import React from 'react';
import { Box, TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', ml: 2, mr: 2 }}>
        <TextField
            variant="outlined"
            size="small"
            placeholder="Search ChatterHub"
            sx={{
                backgroundColor: 'white',
                borderRadius: '20px',
                minWidth: 300,
                maxWidth: 500,
                width: '100%',
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        border: 'none', 
                    },
                    '&:hover fieldset': {
                        border: 'none', 
                    },
                    '&.Mui-focused fieldset': {
                        border: 'none',
                    },
                },
            }}
            slotProps={{
                input: {
                    startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
                },
            }}
        />
    </Box>
  )
}

export default SearchBar;
