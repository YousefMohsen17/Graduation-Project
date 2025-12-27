import { createBrowserRouter, RouterProvider } from "react-router";
import LandingPage from "./pages/landing/LandingPage";
import SignupPage from "./pages/signup/SignupPage";
import SigninPage from "./pages/signin/SigninPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <LandingPage />
        </>
      ),
    },
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
  ]);
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
