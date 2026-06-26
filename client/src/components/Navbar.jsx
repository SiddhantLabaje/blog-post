import React from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ArticleIcon from '@mui/icons-material/Article';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import styles from './Navbar.module.css';

const Navbar = ({ drawerWidth, onMenuClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        backgroundColor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
        color: 'text.primary',
      }}
    >
      <Toolbar className={styles.toolbar}>
        <IconButton
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 1, display: { sm: 'none' } }}
          aria-label="open menu"
        >
          <MenuIcon />
        </IconButton>

        <Box className={styles.brandBox}>
          <ArticleIcon sx={{ color: 'primary.main', mr: 1, fontSize: 28 }} />
          {!isMobile && (
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{ textDecoration: 'none', color: 'text.primary', fontWeight: 700 }}
            >
              BlogManager
            </Typography>
          )}
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Button
          component={Link}
          to="/add-post"
          variant="contained"
          color="primary"
          startIcon={<AddCircleOutlineIcon />}
          size={isMobile ? 'small' : 'medium'}
          sx={{ borderRadius: 2 }}
        >
          {isMobile ? 'Add' : 'New Post'}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
