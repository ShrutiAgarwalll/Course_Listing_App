import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  Box,
  IconButton,
  Chip,
  CardActions,
} from '@mui/material';
import { Favorite } from '@mui/icons-material';
import { setSearchTerm, updateLikes } from '../store/coursesSlice';
import { motion } from 'framer-motion';
import HomeSection from './HomeSection';
const MotionCard = motion(Card);

// Add these animations at the top of the component
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0,
    y: 50,
    scale: 0.9
  },
  visible: { 
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

function CourseList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courses, searchTerm } = useSelector((state) => state.courses);
  const [filteredCourses, setFilteredCourses] = useState(courses);

  useEffect(() => {
    const filtered = courses.filter(
      (course) =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCourses(filtered);
  }, [courses, searchTerm]);

  const handleSearch = (event) => {
    dispatch(setSearchTerm(event.target.value));
  };

  const handleLike = (courseId, event) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(updateLikes({ courseId }));
  };

  const handleCourseClick = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  return (
    <>
      <HomeSection />
      <Container 
        id="courses-section"
        maxWidth="lg" 
        sx={{ 
          mt: 4,
          pt: 4,
          scrollMarginTop: '64px'
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <TextField
            fullWidth
            label="Search courses or instructors"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearch}
            sx={{ 
              mb: 4,
              '& .MuiOutlinedInput-root': {
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.01)'
                },
                '&.Mui-focused': {
                  transform: 'scale(1.02)'
                }
              }
            }}
          />
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Grid container spacing={4}>
            {filteredCourses.map((course) => (
              <Grid item xs={12} sm={6} md={4} key={course.id}>
                <MotionCard
                  variants={cardVariants}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0))',
                      opacity: 0,
                      transition: 'opacity 0.3s'
                    },
                    '&:hover::after': {
                      opacity: 1
                    }
                  }}
                  onClick={() => handleCourseClick(course.id)}
                  whileHover={{ 
                    scale: 1.03,
                    boxShadow: '0 8px 20px rgba(0,0,0,0.12)'
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={course.thumbnail}
                    alt={course.name}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="h2">
                      {course.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {course.instructor}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Duration: {course.duration}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <IconButton
                        onClick={(e) => handleLike(course.id, e)}
                        sx={{ 
                          p: 1,
                          '&:hover': { 
                            color: 'red',
                            transform: 'scale(1.1)'
                          },
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <Favorite 
                          color="error"
                          sx={{
                            transform: 'scale(1)',
                            transition: 'transform 0.2s ease',
                            '&:active': {
                              transform: 'scale(1.2)'
                            }
                          }}
                        />
                      </IconButton>
                      <Typography 
                        variant="body2"
                        component={motion.p}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.3 }}
                      >
                        {course.likes} likes
                      </Typography>
                    </Box>
                    <Chip 
                      label={course.enrollmentStatus} 
                      color={course.enrollmentStatus === 'Open' ? 'success' : 'error'}
                      size="small"
                    />
                  </CardActions>
                </MotionCard>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </>
  );
}

export default CourseList;