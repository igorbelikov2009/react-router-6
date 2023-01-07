import { Suspense } from "react";
import { Link, useNavigate, useLoaderData, Await, useAsyncValue } from "react-router-dom";

const Post = () => {
  const post = useAsyncValue();
  return (
    <>
      <h2>Title: {post.title}</h2>
      <p>
        <b>Body: </b> {post.body}
      </p>
    </>
  );
};

const Comments = () => {
  const comments = useAsyncValue();

  return (
    <div>
      <h2>Comments</h2>
      {comments.map((comment) => (
        <div key={comment.id}>
          <h3>{comment.email}</h3>
          <h4>{comment.name}</h4>
          <p>{comment.body}</p>
        </div>
      ))}
    </div>
  );
};

const Singlepage = () => {
  const navigate = useNavigate();

  // Теперь id получаем по другому, в postLoader, а здесь его достаем
  const { post, id, comments } = useLoaderData(); // from postLoader
  // console.log(post, id);

  const goBack = () => navigate(-1);
  const goHome = () => navigate("/", { replace: true });

  return (
    <div>
      <button onClick={goBack}>Go back</button>
      <button onClick={goHome}>Go home</button>

      <div className="mt-4">
        <div>{id}</div>

        <Suspense fallback={<h2>Post is loading....</h2>}>
          {/* Мы хотим дождаться resolve, поста. Когда post будет 
          получен, мы отрисуем компонент <Post/>  */}
          <Await resolve={post}>
            <Post />
          </Await>
        </Suspense>

        <Suspense fallback={<h2>Comments is loading....</h2>}>
          {/* Мы хотим дождаться resolve, comments. Когда comments будет 
          получен, мы отрисуем компонент <Comments />  */}
          <Await resolve={comments}>
            <Comments />
          </Await>
        </Suspense>

        <Link to={`/posts/${id}/edit`}>Edit this post</Link>
      </div>
    </div>
  );
};

async function getPostById(id) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  return response.json();
}
async function getCommentsById(id) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
  return response.json();
}

const postLoader = async ({ params }) => {
  const id = params.id;

  // id я передам сразу, а post мне нужно получить через getPostById(id)
  return { post: await getPostById(id), id, comments: getCommentsById(id) };
};

export { Singlepage, postLoader };
// ловим postLoader в роуте на страничке App
