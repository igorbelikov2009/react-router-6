import { useParams, Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

const Singlepage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  //   console.log(navigate);
  const [post, setPost] = useState({});

  const goBack = () => navigate(-1);
  //   const goBack = () => navigate("/posts", { state: 123 });
  //   const goHome = () => navigate("/", { replace: true });

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => response.json())
      .then((data) => setPost(data));
  }, [id]);

  return (
    <div>
      <button onClick={goBack}>Go back</button>
      <Link to={"/"} className="routes ml-2">
        Go home
      </Link>

      <div className="mt-4">
        {post && (
          <>
            <div>{id}</div>
            <h2>Title: {post.title}</h2>
            <p>
              <b>Body: </b> {post.body}
            </p>
            <Link to={`/posts/${id}/edit`}>Edit this post</Link>
          </>
        )}
      </div>
    </div>
  );
};

export { Singlepage };
