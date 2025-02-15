import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Typography,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Paper,
  LinearProgress,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { enrollCourse, updateModuleCompletion } from '../store/userSlice';
import { updateEnrollmentStatus } from '../store/coursesSlice';
import { motion } from 'framer-motion';

const MotionContainer = motion(Container);
const MotionPaper = motion(Paper);

// Add these animations at the top
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  },
  exit: { 
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4
    }
  }
};

function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const course = useSelector((state) =>
    state.courses.courses.find((c) => c.id === parseInt(id))
  );
  const enrolledCourses = useSelector((state) => state.user.enrolledCourses);
  const enrolledCourse = enrolledCourses.find((c) => c.id === parseInt(id));
  const isEnrolled = !!enrolledCourse;

  if (!course) {
    return <Typography>Course not found</Typography>;
  }

  const handleEnroll = () => {
    dispatch(enrollCourse(course));
    dispatch(updateEnrollmentStatus(course.id));
  };

  const handleModuleComplete = (weekNumber) => {
    dispatch(updateModuleCompletion({ courseId: parseInt(id), weekNumber }));
  };

  const calculateProgress = () => {
    if (!enrolledCourse) return 0;
    const completedModules = enrolledCourse.completedModules?.length || 0;
    return (completedModules / course.syllabus.length) * 100;
  };

  return (
    <MotionContainer
      maxWidth="md"
      sx={{ mt: 4, mb: 4 }}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <MotionPaper
        elevation={3}
        sx={{ 
          p: 4, 
          borderRadius: 2,
          background: 'linear-gradient(145deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 100%)',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s ease'
        }}
        whileHover={{ 
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          transform: 'translateY(-5px)'
        }}
      >
        <motion.div
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h3" gutterBottom component="h1">
            {course.name}
          </Typography>
        </motion.div>

        <Typography variant="h5" color="text.secondary" gutterBottom>
          Instructor: {course.instructor}
        </Typography>

        {isEnrolled && (
          <Box sx={{ mt: 2, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Course Progress: {Math.round(calculateProgress())}%
            </Typography>
            <LinearProgress
              variant="determinate"
              value={calculateProgress()}
              sx={{ height: 10, borderRadius: 5 }}
            />
          </Box>
        )}

        <Box sx={{ my: 3 }}>
          <Typography variant="body1">{course.description}</Typography>
        </Box>

        <Box sx={{ my: 3, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Chip
            label={`Status: ${course.enrollmentStatus}`}
            color={course.enrollmentStatus === 'Open' ? 'success' : 'warning'}
            sx={{ mr: 1 }}
          />
          <Chip label={`Duration: ${course.duration}`} />
          <Chip label={`Location: ${course.location}`} />
        </Box>

        <Typography variant="h6" gutterBottom>
          Schedule
        </Typography>
        <Typography variant="body1" paragraph>
          {course.schedule}
        </Typography>

        <Typography variant="h6" gutterBottom>
          Prerequisites
        </Typography>
        <List>
          {course.prerequisites.map((prereq, index) => (
            <ListItem key={index}>
              <ListItemText primary={prereq} />
            </ListItem>
          ))}
        </List>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Syllabus
        </Typography>
        {course.syllabus.map((week) => (
          <Accordion
            key={week.week}
            sx={{
              mb: 2,
              '&:before': { display: 'none' },
              background: enrolledCourse?.completedModules?.includes(week.week)
                ? 'rgba(76, 175, 80, 0.1)'
                : 'inherit',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateX(5px)',
                background: enrolledCourse?.completedModules?.includes(week.week)
                  ? 'rgba(76, 175, 80, 0.15)'
                  : 'rgba(0, 0, 0, 0.02)'
              }
            }}
          >
            <AccordionSummary 
              expandIcon={<ExpandMoreIcon />}
              sx={{ 
                borderRadius: 1,
                '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
                <Typography>Week {week.week}: {week.topic}</Typography>
                {enrolledCourse?.completedModules?.includes(week.week) && (
                  <CheckCircleIcon color="success" sx={{ ml: 'auto', mr: 2 }} />
                )}
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography paragraph>{week.content}</Typography>
              {isEnrolled && !enrolledCourse?.completedModules?.includes(week.week) && (
                <Button
                  variant="contained"
                  color="success"
                  size="small"
                  onClick={() => handleModuleComplete(week.week)}
                  sx={{ mt: 1 }}
                >
                  Mark as Complete
                </Button>
              )}
            </AccordionDetails>
          </Accordion>
        ))}

        <Box sx={{ mt: 4, mb: 4, display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleEnroll}
            disabled={isEnrolled}
            component={motion.button}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
            }}
            whileTap={{ scale: 0.95 }}
            sx={{
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              transition: 'all 0.3s ease'
            }}
          >
            {isEnrolled ? 'Enrolled' : 'Enroll in Course'}
          </Button>
          {isEnrolled && (
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={() => navigate('/dashboard')}
              component={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Go to Dashboard
            </Button>
          )}
        </Box>
      </MotionPaper>
    </MotionContainer>
  );
}

export default CourseDetails;