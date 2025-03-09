interface PredefinedUser {
  email: string;
  role: 'admin' | 'manager' | 'client';
  name: string;
}

const PREDEFINED_USERS: Record<string, PredefinedUser> = {
  'tharun.pilli10@gmail.com': {
    email: 'tharun.pilli10@gmail.com',
    role: 'admin',
    name: 'Tharun Pilli'
  },
  'tharunpilli01@gmail.com': {
    email: 'tharunpilli01@gmail.com',
    role: 'admin',
    name: 'Tharun Admin'
  },
  'navya.pilli2403@gmail.com': {
    email: 'navya.pilli2403@gmail.com',
    role: 'manager',
    name: 'Navya Pilli'
  },
  'delta@deltaelmech.com': {
    email: 'delta@deltaelmech.com',
    role: 'manager',
    name: 'Delta Manager'
  },
  'delta1@deltaelmech.com': {
    email: 'delta1@deltaelmech.com',
    role: 'client',
    name: 'Delta Client'
  }
};

export const getPredefinedUserRole = (email: string): string | null => {
  return PREDEFINED_USERS[email]?.role || null;
};

export const getPredefinedUserData = (email: string): PredefinedUser | null => {
  return PREDEFINED_USERS[email] || null;
};

export const PREDEFINED_PASSWORD = 'Delta@2014'; 