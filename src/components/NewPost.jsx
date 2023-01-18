import React from "react";
import { Form } from "react-router-dom";

const NewPost = () => {
  return (
    <Form action="" method="post" className="createPost">
      <label className="mb-4">
        Title:
        <input type="text" name="title" className="ml-2" />
      </label>

      <label className="mb-4">
        Body:
        <input type="text" name="body" className="ml-2" />
      </label>

      <input type="hidden" name="userId" value="1" className="mb-4" />

      <div className="buttonContainer">
        <input type="submit" value={"Add post"} />
      </div>
    </Form>
  );
};

export default NewPost;
