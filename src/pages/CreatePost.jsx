import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";

const CreatePost = () => {
  const { signout } = useAuth();
  const navigate = useNavigate();

  return (
    <div>
      <h1>Create a post</h1>
      {/* Вот тебе navigate на главную страницу без возможности вернуться назад */}
      <button onClick={() => signout(() => navigate("/", { replace: true }))}>Log out</button>
    </div>
  );
};

export default CreatePost;
