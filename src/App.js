// Это версия страницы App для использования загрузки данных
import { Route, Navigate, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import About from "./pages/AboutPage";
import { blogLoader, BlogPage } from "./pages/BlogPage";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import { postLoader, Singlepage } from "./pages/Singlepage";
import HomePage from "./pages/HomePage";
import NotfoundPage from "./pages/NotfoundPage";
import { Layout } from "./components/Layout";
import { LoginPage } from "./pages/LoginPage";
import { RequireAuth } from "./hok/RequireAutth";
// импортируем провайдера, и оборачиваем всё в него
import { AuthProvider } from "./hok/AuthProvider";
import Errorpage from "./pages/Errorpage";

// Это версия страницы App для использования загрузки данных. Проп errorElement используется
// только тогда, когда используется загрузка данных через роуты. errorElement={<Errorpage />}
// может находится в конкретном роуте, родительском роуте, корневом роуте. Случается ошибка,
// она всплывает, находит первый errorElement, и отрисовывает компонент, который мы сюда
// передаём, вместо того, на котором он лежит. То есть, в случае ошибки, у нас не отрисовывается
// тот компонент, на котором лежит проп errorElement.
// Создаём хэлпер (для использования загрузки данных)
const routerHelper = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="about/*" element={<About />}>
        <Route path="contacts" element={<p> Our contacts</p>} />
        <Route path="team" element={<p> Our team</p>} />
      </Route>
      <Route path="about-us" element={<Navigate to="/about" replace />} />
      <Route path="posts" element={<BlogPage />} loader={blogLoader} errorElement={<Errorpage />} />
      <Route path="posts/:id" element={<Singlepage />} loader={postLoader} />
      <Route path="posts/:id/edit" element={<EditPost />} />
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
  )
);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={routerHelper} />
    </AuthProvider>
  );
}

export default App;
