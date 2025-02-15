import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  LinearProgress,
  Button,
  Box,
  Chip,
} from '@mui/material';
import { motion } from 'framer-motion';

const MotionContainer = motion(Container);
const MotionCard = motion(Card);

const dashboardVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const cardVariants = {
  initial: { y: 50, opacity: 0 },
  animate: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

function Dashboard() {
  const navigate = useNavigate();
  const enrolledCourses = useSelector((state) => state.user.enrolledCourses);

  const calculateProgress = (course) => {
    const completedModules = course.completedModules?.length || 0;
    const totalModules = course.syllabus.length;
    return (completedModules / totalModules) * 100;
  };

  return (
    <MotionContainer
      maxWidth="lg"
      variants={dashboardVariants}
      initial="initial"
      animate="animate"
      sx={{ 
        mt: 4, 
        mb: 4,
        '& .MuiCard-root': {
          transition: 'all 0.3s ease'
        }
      }}
    >
      <Typography 
        variant="h4" 
        gutterBottom
        component={motion.h4}
        initial={{ x: -20 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
      >
        My Learning Dashboard
      </Typography>

      <Grid container spacing={4}>
        {enrolledCourses.map((course, index) => {
          const progress = calculateProgress(course);
          
          return (
            <Grid item xs={12} md={6} key={course.id}>
              <MotionCard
                variants={cardVariants}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
                    opacity: 0,
                    transition: 'opacity 0.3s ease'
                  },
                  '&:hover::before': {
                    opacity: 1
                  }
                }}
                whileHover={{
                  y: -5,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.12)'
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={course.thumbnail}
                  alt={course.name}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" gutterBottom component="h2">
                    {course.name}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    Instructor: {course.instructor}
                  </Typography>
                  
                  <Box sx={{ mt: 2, mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Course Progress
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {Math.round(progress)}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={progress}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        background: 'rgba(0,0,0,0.1)',
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 4,
                          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                          transition: 'transform 0.8s ease'
                        }
                      }}
                    />
                  </Box>

                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                    <Chip 
                      label={`${course.completedModules?.length || 0}/${course.syllabus.length} modules completed`}
                      color="primary"
                      size="small"
                    />
                    <Chip 
                      label={course.duration}
                      variant="outlined"
                      size="small"
                    />
                  </Box>

                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => navigate(`/course/${course.id}`)}
                    sx={{ mt: 2 }}
                    component={motion.button}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Continue Learning
                  </Button>
                </CardContent>
              </MotionCard>
            </Grid>
          );
        })}
      </Grid>

      {enrolledCourses.length === 0 && (
        <Box 
          sx={{ 
            textAlign: 'center', 
            mt: 8,
            p: 4,
            bgcolor: 'background.paper',
            borderRadius: 2
          }}
        >
          <Typography variant="h6" gutterBottom>
            You haven't enrolled in any courses yet.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/')}
            sx={{ mt: 2 }}
            component={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Browse Courses
          </Button>
        </Box>
      )}
    </MotionContainer>
  );
}

export default Dashboard;