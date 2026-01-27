import { createBrowserRouter, RouterProvider } from "react-router";
import { lazy, Suspense, useEffect } from "react";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Toaster } from "react-hot-toast";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import LoadingPage from "./components/LoadingPage";

// Lazy load all pages
const LandingPage = lazy(() => import("./pages/landing/LandingPage"));
const SignupPage = lazy(() => import("./pages/signup/SignupPage"));
const SigninPage = lazy(() => import("./pages/signin/SigninPage"));
const HomePage = lazy(() => import("./pages/Home/HomePage"));
const CoursesPage = lazy(() => import("./pages/courses/CoursesPage"));
const SubjectDetailsPage = lazy(() => import("./pages/courses/SubjectDetailsPage"));
const CommunityPage = lazy(() => import("./pages/community/CommunityPage"));
const UserActivity = lazy(() => import("./pages/community/UserActivity"));
const AboutPage = lazy(() => import("./pages/about/AboutPage"));
const ProgressPage = lazy(() => import("./pages/progress/ProgressPage"));

function App() {
  const queryClient = new QueryClient()

  useEffect(() => {
    window.onpageshow = (event) => {
      if (event.persisted) {
        window.location.reload();
      }
    };
  }, []);

  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          element: <PublicRoute />,
          children: [
            {
              index: true,
              element: <LandingPage />,
            },
          ],
        },
        {
          element: <ProtectedRoute />,
          children: [
            {
              path: "/home",
              element: <HomePage />,
            },
            {
              path: "/courses",
              element: <CoursesPage />,
            },
            {
              path: "/courses/:id",
              element: <SubjectDetailsPage />,
            },
            {
              path: "/community",
              element: <CommunityPage />,
            },
            {
              path: "/community/user/:id",
              element: <UserActivity />,
            },
            {
              path: "/about",
              element: <AboutPage />,
            },
            {
              path: "/progress",
              element: <ProgressPage />,
            },
          ],
        },
      ],
    },
    {
      element: <PublicRoute />,
      children: [
        {
          path: "/sign-up",
          element: <SignupPage />,
        },
        {
          path: "/sign-in",
          element: <SigninPage />,
        },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Suspense fallback={<LoadingPage />}>
        <RouterProvider router={router} />
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
