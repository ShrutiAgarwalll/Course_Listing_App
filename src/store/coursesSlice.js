import { createSlice } from '@reduxjs/toolkit';
import { coursesData } from '../data/mockData';

const initialCourses = [
  {
    id: 1,
    name: "Advanced Web Development",
    instructor: "Sarah Johnson",
    description: "Master modern web development techniques including React, Node.js, and cloud deployment.",
    enrollmentStatus: "Open",
    thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
    duration: "12 weeks",
    schedule: "Tuesdays and Thursdays, 6:00 PM - 8:00 PM",
    location: "Online",
    prerequisites: ["Basic JavaScript knowledge", "HTML & CSS fundamentals"],
    syllabus: [
      { week: 1, topic: "React Fundamentals", content: "Introduction to React, Components, and Props" },
      { week: 2, topic: "State Management", content: "Redux, Context API, and State Management Patterns" }
    ],
    likes: 245
  },
  {
    id: 2,
    name: "Data Science Fundamentals",
    instructor: "Michael Chen",
    description: "Learn the basics of data analysis, visualization, and machine learning with Python.",
    enrollmentStatus: "Open",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    duration: "10 weeks",
    schedule: "Mondays and Wednesdays, 7:00 PM - 9:00 PM",
    location: "Online",
    prerequisites: ["Basic Python knowledge", "Statistics fundamentals"],
    syllabus: [
      { week: 1, topic: "Python for Data Science", content: "NumPy, Pandas, and data manipulation" },
      { week: 2, topic: "Data Visualization", content: "Matplotlib, Seaborn, and visualization techniques" }
    ],
    likes: 189
  },
  {
    id: 3,
    name: "UX/UI Design Masterclass",
    instructor: "Emily Rodriguez",
    description: "Master the principles of user experience and interface design.",
    enrollmentStatus: "Open",
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5",
    duration: "8 weeks",
    schedule: "Fridays, 5:00 PM - 8:00 PM",
    location: "Online",
    prerequisites: ["Basic design knowledge", "Familiarity with design tools"],
    syllabus: [
      { week: 1, topic: "Design Thinking", content: "Understanding user-centered design principles" },
      { week: 2, topic: "Wireframing", content: "Creating effective wireframes and prototypes" }
    ],
    likes: 156
  },
  {
    id: 4,
    name: "Mobile App Development with Flutter",
    instructor: "Alex Kumar",
    description: "Build cross-platform mobile applications using Flutter and Dart.",
    enrollmentStatus: "Open",
    thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c",
    duration: "10 weeks",
    schedule: "Saturdays, 10:00 AM - 1:00 PM",
    location: "Online",
    prerequisites: ["Programming basics", "Object-oriented concepts"],
    syllabus: [
      { week: 1, topic: "Dart Basics", content: "Introduction to Dart programming language" },
      { week: 2, topic: "Flutter Widgets", content: "Understanding Flutter widget system" }
    ],
    likes: 134
  },
  {
    id: 5,
    name: "Cloud Architecture on AWS",
    instructor: "David Wilson",
    description: "Learn to design and implement scalable solutions on Amazon Web Services.",
    enrollmentStatus: "Closed",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
    duration: "14 weeks",
    schedule: "Tuesdays and Thursdays, 7:00 PM - 9:00 PM",
    location: "Online",
    prerequisites: ["Basic cloud computing knowledge", "Linux fundamentals"],
    syllabus: [
      { week: 1, topic: "AWS Basics", content: "Introduction to AWS services and console" },
      { week: 2, topic: "EC2 and VPC", content: "Virtual servers and networking in AWS" }
    ],
    likes: 278
  },
  {
    id: 6,
    name: "Blockchain Development",
    instructor: "James Lee",
    description: "Develop decentralized applications using Ethereum and Solidity.",
    enrollmentStatus: "Open",
    thumbnail: "https://images.unsplash.com/photo-1639322537228-f710d846310a",
    duration: "12 weeks",
    schedule: "Wednesdays and Fridays, 6:00 PM - 8:00 PM",
    location: "Online",
    prerequisites: ["JavaScript knowledge", "Basic cryptography understanding"],
    syllabus: [
      { week: 1, topic: "Blockchain Fundamentals", content: "Understanding blockchain technology" },
      { week: 2, topic: "Smart Contracts", content: "Writing and deploying smart contracts" }
    ],
    likes: 167
  },
  {
    id: 7,
    name: "Digital Marketing Strategy",
    instructor: "Lisa Thompson",
    description: "Master modern digital marketing techniques and strategy development.",
    enrollmentStatus: "Open",
    thumbnail: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07",
    duration: "8 weeks",
    schedule: "Mondays, 6:00 PM - 9:00 PM",
    location: "Online",
    prerequisites: ["Basic marketing knowledge", "Social media familiarity"],
    syllabus: [
      { week: 1, topic: "Digital Marketing Overview", content: "Introduction to digital marketing channels" },
      { week: 2, topic: "Content Strategy", content: "Creating effective content marketing plans" }
    ],
    likes: 198
  },
  {
    id: 8,
    name: "Cybersecurity Essentials",
    instructor: "Robert Martinez",
    description: "Learn fundamental cybersecurity concepts and practical defense techniques.",
    enrollmentStatus: "Open",
    thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
    duration: "10 weeks",
    schedule: "Thursdays, 6:00 PM - 9:00 PM",
    location: "Online",
    prerequisites: ["Networking basics", "Command line familiarity"],
    syllabus: [
      { week: 1, topic: "Security Fundamentals", content: "Basic security concepts and principles" },
      { week: 2, topic: "Threat Analysis", content: "Identifying and analyzing security threats" }
    ],
    likes: 223
  }
];

const initialState = {
  courses: initialCourses,
  searchTerm: '',
};

export const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    updateLikes: (state, action) => {
      const course = state.courses.find(c => c.id === action.payload.courseId);
      if (course) {
        course.likes += 1;
      }
    },
    updateEnrollmentStatus: (state, action) => {
      const course = state.courses.find(c => c.id === action.payload);
      if (course) {
        course.enrollmentStatus = 'In Progress';
      }
    },
  },
});

export const { setSearchTerm, updateLikes, updateEnrollmentStatus } = coursesSlice.actions;
export default coursesSlice.reducer;