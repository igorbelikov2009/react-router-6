import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import BlogFilter from "../components/BlogFilter";

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
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

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <div>
      <h1> Our news </h1>

      <BlogFilter setSearchParams={setSearchParams} postQuery={postQuery} latest={latest} />

      <div className="mb-2">
        <Link to="/posts/new" className="routes">
          Add new post
        </Link>
      </div>

      {posts
        .filter((post) => post.title.includes(postQuery) && post.id >= startForm)
        .map((post) => (
          <Link key={post.id} to={`/posts/${post.id}`} className={"routes"}>
            <li>{post.title} </li>
          </Link>
        ))}
    </div>
  );
};

export default BlogPage;
