// Это версия страницы App до использования загрузки данных
import { Routes, Route, Navigate } from "react-router-dom";
import About from "./pages/AboutPage";
import { BlogPage } from "./pages/BlogPage";
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

function AppCopy() {
  return (
    <AuthProvider>
      {/* index там, где пути совпадают.
     При лайауте слеш на пути path в дальнейшем убираем */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />

          {/* Случай, если вложенные в about роуты находятся на самой странице About:
          Запись: path="about/*" - говорит, что любой адрес, который 
          начинается у нас с about/, всегда будет иметь компонент {<About />} */}

          {/* Случай, если вложенные в about роуты находятся здесь, в основном роуте, 
          то достаточно записи: path="about" */}
          <Route path="about/*" element={<About />}>
            <Route path="contacts" element={<p> Our contacts</p>} />
            <Route path="team" element={<p> Our team</p>} />
          </Route>

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

export default AppCopy;
