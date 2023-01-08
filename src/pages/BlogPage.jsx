// import React, { useEffect, useState } from "react";
import { Suspense } from "react";
import { Await, defer, Link, useLoaderData, useSearchParams } from "react-router-dom";
import BlogFilter from "../components/BlogFilter";

const BlogPage = () => {
  // // Это версия до использования загрузки данных
  // const [posts, setPosts] = useState([]);
  // const posts = useLoaderData(); // from blogLoader, без использования defer
  const { posts } = useLoaderData(); // from blogLoader, с использованием defer
  const [searchParams, setSearchParams] = useSearchParams();

  // адресная строка, у searchParams есть метод get, который принимает строковые значения.
  // Будем ожидать, что гет-параметром будет пост.
  // Подразумеваем, что в какой-то момент в ссылке будет вопросительный знак,
  // URL.ru/post?post=abc&data=12
  // дальше, после ? пойдут гет-параметры, в нашем случае: post=abc&data=12
  const postQuery = searchParams.get("post") || "";

  // Последние 20 id. По булеву ключю latest
  const latest = searchParams.has("latest");
  // Если нужны последние ? то получим последние 20.
  // Если чекбокс не установлен, то будем работать со всеми статьями
  const startForm = latest ? 80 : 1;

  // // Это версия до использования загрузки данных
  // useEffect(() => {
  //   fetch("https://jsonplaceholder.typicode.com/posts")
  //     .then((res) => res.json())
  //     .then((data) => setPosts(data));
  // }, []);

  return (
    <div>
      <h1> Our news </h1>

      <BlogFilter setSearchParams={setSearchParams} postQuery={postQuery} latest={latest} />

      <div className="mb-2">
        <Link to="/posts/new" className="routes">
          Add new post
        </Link>
      </div>

      {/* Мне нужно дождаться загрузки posts. То есть, покажи всё вокруг Suspense, всё, что там будет помимо него,
       а то, что внутри Suspense, не показывай, пока не загрузяться посты. Показывай вместо них fallback. 
       А вот когда они загрузятся, показывай нечто другое.  */}

      <Suspense fallback={<h2>Loading....</h2>}>
        <Await resolve={posts}>
          {(resolvedPosts) => (
            <>
              {resolvedPosts
                .filter((post) => post.title.includes(postQuery) && post.id >= startForm)
                .map((post) => (
                  <Link key={post.id} to={`/posts/${post.id}`} className={"routes"}>
                    <li>{post.title} </li>
                  </Link>
                ))}
            </>
          )}
        </Await>
      </Suspense>
    </div>
  );
};

async function getPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/postsccc");

  if (!res.ok) {
    // Сроу, выкинь мне ответ, в котором у меня будет текстовое сообщение.
    throw new Response("", { status: res.status, statusText: "Not found!!!" });
  }

  return res.json();
}

const blogLoader = async ({ request, params }) => {
  // За счёт использования фунции defer(), у нас есть возможность ожидать, когда
  // какая-та часть данных будет получена. С той поправкой, что из useLoaderData
  // у нас возвращается объект
  return defer({
    posts: getPosts(),
  });
  // const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  // return res.json();
};

export { BlogPage, blogLoader };
// ловим blogLoader в роуте на страничке App
// Мы создаём функцию лоадера, возвращаем из неё что-то
