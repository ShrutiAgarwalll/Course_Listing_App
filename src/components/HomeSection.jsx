import { Box, Typography, Container } from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);

function HomeSection() {
  const scrollToCourses = () => {
    const coursesSection = document.getElementById('courses-section');
    coursesSection.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <MotionBox
      sx={{
        minHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'brightness(0.3)',
          zIndex: 0
        }
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Container 
        maxWidth="md" 
        sx={{ 
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <MotionTypography
          variant="h1"
          component="h1"
          sx={{
            fontWeight: 700,
            textAlign: 'center',
            fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
            mb: 3,
            color: 'white',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
          }}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Unlock Your Potential
        </MotionTypography>

        <MotionTypography
          variant="h5"
          component="h2"
          sx={{
            textAlign: 'center',
            color: 'rgba(255, 255, 255, 0.9)',
            mb: 8, // Increased margin bottom to make space for the arrow
            maxWidth: '800px',
            mx: 'auto',
            textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
          }}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Discover a world of knowledge with our curated collection of online courses.
          Learn from industry experts and transform your skills at your own pace.
          <p className='text-blue-500'>Discover the courses below.</p>
        </MotionTypography>

        <MotionBox
          sx={{
            cursor: 'pointer',
            color: 'white',
            mt: 4, // Add margin top
            position: 'absolute',
            bottom: '40px', // Position from bottom
          }}
          onClick={scrollToCourses}
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <KeyboardArrowDown 
            sx={{ 
              fontSize: '3rem',
              filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.5))'
            }} 
          />
        </MotionBox>
      </Container>

      {/* Overlay gradient */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '150px',
          background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)',
          zIndex: 1
        }}
      />
    </MotionBox>
  );
}

export default HomeSection; 