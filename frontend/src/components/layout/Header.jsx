import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Bookstore App
                </Typography>
                <Button color="inherit" component={Link} to="/books">Books</Button>
                <Button color="inherit" component={Link} to="/authors">Authors</Button>
                <Button color="inherit" component={Link} to="/countries">Countries</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
