import { createBrowserRouter, RouterProvider } from "react-router";
import LandingPage from "./pages/landing/LandingPage";
import SignupPage from "./pages/signup/SignupPage";
import SigninPage from "./pages/signin/SigninPage";
import {

  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Toaster } from "react-hot-toast";
import Layout from "./components/Layout";
import HomePage from "./pages/Home/HomePage";
import CoursesPage from "./pages/courses/CoursesPage";
import SubjectDetailsPage from "./pages/courses/SubjectDetailsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import { useEffect } from "react";
import CommunityPage from "./pages/community/CommunityPage";
import UserActivity from "./pages/community/UserActivity";
import AboutPage from "./pages/about/AboutPage";
import ProgressPage from "./pages/progress/ProgressPage";

function App() {
  const queryClient = new QueryClient()

  useEffect(() => {
    window.onpageshow = (event) => {
      if (event.persisted) {
        window.location.reload();
      }
    };
  }, []);
  // useEffect(() => {
  //   // Clear auth cache on mount
  //   queryClient.setQueryData(["auth"], null);
  //   queryClient.removeQueries(["auth"]);
  // }, [queryClient]);

  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          element: <PublicRoute />,
          children: [
            {
              index: true,
              element: (
                <>
                  <LandingPage />
                </>
              ),
            },
          ],
        },
        {
          element: <ProtectedRoute />,
          children: [
            {
              path: "/home",
              element: (
                <>
                  <HomePage />
                </>
              ),
            },
            {
              path: "/courses",
              element: (
                <>
                  <CoursesPage />
                </>
              ),
            },
            {
              path: "/courses/:id",
              element: (
                <>
                  <SubjectDetailsPage />
                </>
              ),
            },
            {
              path: "/community",
              element: (
                <>
                  <CommunityPage />
                </>
              ),
            },
            {
              path: "/community/user/:id",
              element: (
                <>
                  <UserActivity />
                </>
              ),
            },
            {
              path: "/about",
              element: (
                <>
                  <AboutPage />
                </>
              ),
            },
            {
              path: "/progress",
              element: (
                <>
                  <ProgressPage />
                </>
              ),
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
          element: (
            <>
              <SignupPage />
            </>
          ),
        },
        {
          path: "/sign-in",
          element: (
            <>
              <SigninPage />
            </>
          ),
        },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
  );
}

export default App;
