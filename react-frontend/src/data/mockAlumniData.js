export const mockAlumniData = [
  {
    id: '1',
    fullName: 'Maria Santos',
    profilePicture: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    batchYear: '2018',
    program: 'BS Computer Science',
    department: 'College of Information Technology',
    section: 'CS-4A',
    email: 'maria.santos@example.com',
    phone: '+63 912 345 6789',
    address: '123 Main St, Calapan City, Oriental Mindoro',
    gender: 'female',
    employmentStatus: 'employed',
    currentCompany: 'Tech Solutions Inc.',
    position: 'Senior Software Developer',
    diplomaVerified: true,
    registrationDate: '2024-01-15T00:00:00Z'
  },
  {
    id: '2',
    fullName: 'Juan Dela Cruz',
    profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    batchYear: '2019',
    program: 'BS Information Technology',
    department: 'College of Information Technology',
    section: 'IT-3B',
    email: 'juan.delacruz@example.com',
    phone: '+63 917 890 1234',
    address: '456 Oak St, Roxas, Oriental Mindoro',
    gender: 'male',
    employmentStatus: 'employed',
    currentCompany: 'Data Systems Corp',
    position: 'IT Project Manager',
    diplomaVerified: true,
    registrationDate: '2024-01-20T00:00:00Z'
  },
  {
    id: '3',
    fullName: 'Ana Reyes',
    profilePicture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    batchYear: '2020',
    program: 'BS Business Administration',
    department: 'College of Business',
    section: 'BA-2C',
    email: 'ana.reyes@example.com',
    phone: '+63 918 567 8901',
    address: '789 Pine St, Puerto Galera, Oriental Mindoro',
    gender: 'female',
    employmentStatus: 'unemployed',
    currentCompany: '',
    position: '',
    diplomaVerified: true,
    registrationDate: '2024-02-01T00:00:00Z'
  },
  {
    id: '4',
    fullName: 'Carlos Lim',
    profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    batchYear: '2018',
    program: 'BS Education',
    department: 'College of Education',
    section: 'ED-4A',
    email: 'carlos.lim@example.com',
    phone: '+63 919 234 5678',
    address: '321 Elm St, Baco, Oriental Mindoro',
    gender: 'male',
    employmentStatus: 'employed',
    currentCompany: 'Mindoro State University',
    position: 'College Instructor',
    diplomaVerified: true,
    registrationDate: '2024-01-25T00:00:00Z'
  },
  {
    id: '5',
    fullName: 'Sofia Garcia',
    profilePicture: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face',
    batchYear: '2021',
    program: 'BS Hospitality Management',
    department: 'College of Tourism',
    section: 'HM-1A',
    email: 'sofia.garcia@example.com',
    phone: '+63 920 345 6789',
    address: '654 Beach Rd, San Teodoro, Oriental Mindoro',
    gender: 'female',
    employmentStatus: 'employed',
    currentCompany: 'Pearl Resort',
    position: 'Hotel Manager',
    diplomaVerified: false,
    registrationDate: '2024-02-05T00:00:00Z'
  }
];

export const mockNotifications = [
  {
    id: '1',
    title: 'New Event Announcement',
    message: 'Annual Alumni Homecoming 2024 is scheduled for December 15, 2024',
    type: 'event',
    icon: 'fa-calendar',
    unread: true,
    timestamp: '2024-03-15T10:30:00Z'
  },
  {
    id: '2',
    title: 'Profile Verification',
    message: 'Your diploma has been verified successfully',
    type: 'verification',
    icon: 'fa-check-circle',
    unread: true,
    timestamp: '2024-03-14T14:20:00Z'
  },
  {
    id: '3',
    title: 'New Message',
    message: 'You have a new message from Juan Dela Cruz',
    type: 'message',
    icon: 'fa-envelope',
    unread: false,
    timestamp: '2024-03-13T09:15:00Z'
  },
  {
    id: '4',
    title: 'Batch Reunion',
    message: 'Class of 2018 is organizing a reunion next month',
    type: 'event',
    icon: 'fa-users',
    unread: false,
    timestamp: '2024-03-12T16:45:00Z'
  }
];

export const mockEvents = [
  {
    id: '1',
    title: 'Annual Alumni Homecoming 2024',
    description: 'Join us for the biggest alumni gathering of the year. Reconnect with old friends and meet new graduates.',
    date: '2024-12-15T09:00:00Z',
    location: 'MinSU Main Campus, Calapan City',
    organizer: 'Alumni Affairs Office',
    category: 'homecoming',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=200&fit=crop',
    attendees: 150,
    maxAttendees: 300,
    registrationRequired: true
  },
  {
    id: '2',
    title: 'Career Development Workshop',
    description: 'Enhance your professional skills with our career development seminar series.',
    date: '2024-04-20T13:00:00Z',
    location: 'Online - Zoom Meeting',
    organizer: 'Career Development Center',
    category: 'workshop',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop',
    attendees: 45,
    maxAttendees: 100,
    registrationRequired: true
  }
];

export const mockNews = [
  {
    id: '1',
    title: 'MinSU Ranked Among Top Universities in Region',
    content: 'Mindoro State University has been recognized as one of the top performing universities in the MIMAROPA region for 2024.',
    author: 'University PR Office',
    publishDate: '2024-03-10T08:00:00Z',
    category: 'university',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=200&fit=crop',
    readTime: '2 min read'
  },
  {
    id: '2',
    title: 'New Scholarship Program for Alumni Children',
    content: 'The university is launching a new scholarship program exclusively for children of MinSU alumni.',
    author: 'Alumni Foundation',
    publishDate: '2024-03-08T10:30:00Z',
    category: 'scholarship',
    image: 'https://images.unsplash.com/photo-1584697964358-3e14ca57658b?w=400&h=200&fit=crop',
    readTime: '3 min read'
  }
];