import React from "react";
import { redirect, useNavigate } from "react-router-dom";
import NewPost from "../components/NewPost";
import { useAuth } from "../hook/useAuth";

const CreatePost = () => {
  const { signout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="createPost">
      <h1 className="mb-4">Create a post</h1>

      <div className="mb-5">
        <NewPost />
      </div>
      {/* Вот тебе navigate на главную страницу без возможности вернуться назад */}

      <div className="buttonContainer">
        <button onClick={() => signout(() => navigate("/", { replace: true }))}>Log out</button>
      </div>
    </div>
  );
};

const createPost = async ({ title, body, userId }) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, body, userId }),
  });

  const newPost = await res.json();
  return newPost;
};

// При переходе на данный роут (на странице Арр), будем получать в экшен определённый
// параметры {request}. request знает всё о форме, которая была отправлена.
// const createPostAction = async ({ request }) => {
//   // Получаем объект через обращение к request и встроенный метод formData().
//   const formData = await request.formData();
//   // Получив данные, мы можем создать объект через конструктор. Напрямую, без конструктора,
//   // мы не имеем доступа к данным.
//   const newPost = {
//     // имена {title, body, userId} берём из формы, из названия полей (name="title"), со страницы NewPost.
//     // Те же самые названия. Если у нас будут другие названия в форме, у нас ничего не получится.
//     // Названия тут и там должны быть одинаковы.
//     title: formData.get("title"),
//     body: formData.get("body"),
//     userId: formData.get("userId"),
//   };
//   // сюда передаём сформированный нами объект newPost
//   const post = await createPost(newPost);

//   // Мы хотим попасть на страницу всех постов, причём на конкретно новый пост, который мы сейчас получили.
//   return redirect("/posts" + post.id);
// };

const createPostAction = async ({ request }) => {
  const formData = await request.formData();

  const newPost = {
    title: formData.get("title"),
    body: formData.get("body"),
    userId: formData.get("userId"),
  };

  const post = await createPost(newPost);

  return redirect("/posts" + post.id);
};

export { CreatePost, createPostAction };
