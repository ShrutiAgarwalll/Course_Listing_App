import { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Box, 
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Link } from 'react-router-dom';
import { 
  Brightness4, 
  Brightness7,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const MotionButton = motion(Button);

function Navbar({ mode, setMode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'Dashboard', path: '/dashboard' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path) => {
    setMobileOpen(false);
    if (path === '/courses') {
      const coursesSection = document.getElementById('courses-section');
      if (coursesSection) {
        coursesSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const drawer = (
    <Box sx={{ width: 240 }}>
      <List>
        {menuItems.map((item) => (
          <ListItem 
            key={item.text}
            component={Link}
            to={item.path}
            onClick={() => handleNavigation(item.path)}
            sx={{
              py: 2,
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
          >
            <ListItemText 
              primary={item.text}
              sx={{
                '& .MuiTypography-root': {
                  fontSize: '1.1rem',
                  fontWeight: 500,
                }
              }}
            />
          </ListItem>
        ))}
        <ListItem>
          <IconButton 
            color="inherit" 
            onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
          >
            {mode === 'light' ? <Brightness4 /> : <Brightness7 />}
          </IconButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography
          variant="h6"
          component={motion.div}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          sx={{ flexGrow: 1 }}
        >
          Course Listing App
        </Typography>

        {isMobile ? (
          <>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better mobile performance
              }}
            >
              {drawer}
            </Drawer>
          </>
        ) : (
          <Box sx={{ display: 'flex', gap: 2 }}>
            {menuItems.map((item) => (
              <MotionButton
                key={item.text}
                color="inherit"
                component={Link}
                to={item.path}
                onClick={() => handleNavigation(item.path)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.text}
              </MotionButton>
            ))}
            <IconButton 
              color="inherit" 
              onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
            >
              {mode === 'light' ? <Brightness4 /> : <Brightness7 />}
            </IconButton>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;