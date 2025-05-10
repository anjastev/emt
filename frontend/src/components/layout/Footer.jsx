import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
    return (
        <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 2, textAlign: 'center' }}>
            <Typography variant="body2">
                &copy; {new Date().getFullYear()} Bookstore App. All rights reserved.
            </Typography>
        </Box>
    );
};

export default Footer;
