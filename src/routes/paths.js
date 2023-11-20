// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  minimalUI: 'https://mui.com/store/items/minimal-dashboard/',
  // AUTH
  auth: {
    happyman: {
      login: `${ROOTS.AUTH}/happyman/login`,
      register: `${ROOTS.AUTH}/happyman/join`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    home: `${ROOTS.DASHBOARD}/home`,
    event: `${ROOTS.DASHBOARD}/event`,
    three: `${ROOTS.DASHBOARD}/three`,
    manager: `${ROOTS.DASHBOARD}/manager`,
    details: `${ROOTS.DASHBOARD}/details`,
  },
};
