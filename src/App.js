import { Routes, Route, Navigate } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import BlogPage from "./pages/BlogPage";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import { Singlepage } from "./pages/Singlepage";
import HomePage from "./pages/HomePage";
import NotfoundPage from "./pages/NotfoundPage";
import { Layout } from "./components/Layout";
import { LoginPage } from "./pages/LoginPage";
import { RequireAuth } from "./hok/RequireAutth";
// импортируем провайдера, и оборачиваем всё в него
import { AuthProvider } from "./hok/AuthProvider";

function App() {
  return (
    <AuthProvider>
      {/* index там, где пути совпадают.
     При лайауте слеш на пути path в дальнейшем убираем */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="about-us" element={<Navigate to="/about" replace />} />
          <Route path="posts" element={<BlogPage />} />
          {/* <Route path="posts/:category/:title" element={<Singlepage />} />
           */}
          <Route path="posts/:id" element={<Singlepage />} />
          <Route path="posts/:id/edit" element={<EditPost />} />
          {/* У меня был параметр :id, но я хочу страницу, отличающуюся.  */}
          {/* Здесь, через проверку на авторизацию в хоке RequireAuth, доступ к приватным роутам */}
          <Route
            path="posts/new"
            element={
              <RequireAuth>
                <CreatePost />
              </RequireAuth>
            }
          />
          <Route path="login" element={<LoginPage />} />
          <Route path="*" element={<NotfoundPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
