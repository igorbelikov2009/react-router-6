import React, { useState } from "react";

const BlogFilter = ({ postQuery, latest, setSearchParams }) => {
  const [search, setSearch] = useState(postQuery);
  const [checked, setChecked] = useState(latest);

  const handleSubmit = (event) => {
    event.preventDefault();

    // event.target вернёт нам форму
    const form = event.target;

    // Используя форму, сможем доставать оттуда значение по её name="search".
    // Мы хотим получить пост-квери, то, что пользователь набрал руками.
    // Обращаемся к form, у него есть поле search, нам нужно получить его value.
    const query = form.search.value;

    // Проверим, что пришло из формы, из чекбокса с name="latest".
    // Здесь мы получим true или false. В зависимости от полученного значения
    // мы добавим соответствующий параметр, или уберём его.
    const isLatest = form.latest.checked;

    // Для удобства работы с параметрами, создаём пустой объект params и,
    // в зависимости от того, что получаем из формы, будем его наполнять
    const params = {};

    // Устанавливаем параметры: 1. проверяем, что у нас есть поисковое слово
    if (query.length) params.post = query;
    // 2. проверяем, что чекбокс у нас установлен
    if (isLatest) params.latest = true;
    // Если в поиск ввели dolor, а в чекбоксе поставили галочку, то
    // получаем гет-запрос ?post=dolor&latest=true

    setSearchParams(params);
    // Используя значение query, мы можем обновить наш searchParams.
    // Тем самым мы обновляем адресную строку, у нас появиться соответствующий гет-параметр,
    // но пока это никак не повлияет на приложение.
    // Чтобы повлияло на приложение, исправим  {posts.map((post)....
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <input type="search" name="search" value={search} onChange={(e) => setSearch(e.target.value)} />

      <label style={{ padding: "0 1rem" }}>
        <input type="checkbox" name="latest" checked={checked} onChange={(e) => setChecked(e.target.checked)} /> В
        последних 20 post.id
      </label>

      <input type="submit" value="Search" />
    </form>
  );
};

export default BlogFilter;
