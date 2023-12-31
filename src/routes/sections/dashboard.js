import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// auth
import { AuthGuard } from 'src/auth/guard';
// layouts
import DashboardLayout from 'src/layouts/dashboard';
// components
import { LoadingScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import('src/pages/dashboard/home'));
const PageTwo = lazy(() => import('src/pages/dashboard/event'));
const PageEventManager = lazy(() => import('src/pages/dashboard/manager'));
const PageManagerDetail = lazy(() => import('src/pages/dashboard/details'));

// ----------------------------------------------------------------------

export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [
      { element: <IndexPage />, index: true },
      { path: 'event', element: <PageTwo /> },
      { path: 'manager', element: <PageEventManager /> },
      { path: 'details/:eventId', element: <PageManagerDetail /> },
    ],
  },
];
