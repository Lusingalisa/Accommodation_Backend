module.exports = {
    ROLES: {
      ADMIN: 'admin',
      LANDLORD: 'landlord', 
      STUDENT: 'student'
    },
    PERMISSIONS: {
      CREATE_USER: ['admin'],
      VIEW_ALL_USERS: ['admin'],
      VIEW_ALL_HOSTELS: ['student','admin'],
      UPDATE_HOSTEL: ['landlord','admin'],
      DELETE_HOSTEL: ['admin'],
      DELETE_USER:['admin'],
      UPDATE_USER: ['admin', 'landlord'],
      CREATE_BOOKING: ['student','admin'],
      VIEW_OWN_BOOKINGS: ['student','admin'],
      VIEW_ALL_BOOKINGS: ['admin'],
      CANCEL_BOOKING: ['student', 'admin'],
      SEND_MESSAGE: ['student', 'landlord', 'admin'],
      VIEW_OWN_MESSAGES : ['student', 'landlord', 'admin'],
      VIEW_ALL_MESSAGES : ['admin'],
    },
    ROLE_HIERARCHY: {
     admin: ['landlord', 'student'],
     landlord: ['student'],
     student: [],
    },
  };