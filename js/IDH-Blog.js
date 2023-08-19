import app from "./IDH-Common.js";
import {
  getDatabase,
  ref,
  query,
  orderByChild,
  equalTo,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";

const database = getDatabase(app);
const id = new URLSearchParams(window.location.search).get("id");
const postRef = query(ref(database, "posts/" + id));
onValue(postRef, (snapshot) => {
  const data = snapshot.val();
  document.querySelector("#info").innerHTML = `
    <img src="${data.thumbnail}" alt="" class="w-full rounded object-cover" />
    <h1 class="text-4xl font-bold leadi md:text-5xl">
      ${data.title}
    </h1>
    <p class="text-sm dark:text-gray-400">
      by
      <a
        rel="noopener noreferrer"
        href="#"
        target="_blank"
        class="underline dark:text-violet-400"
      >
        <span itemprop="name">Quanph</span></a
      >on
      <time datetime="2021-02-12 15:34:18-0200">Feb 12th 2021</time>
    </p>
  `;
  console.log(data);

  // Editor ---------------------------------------------------------------------
  const editor = new EditorJS({
    holder: "editor",
    placeholder: "Let`s write an awesome story!",
    readOnly: true,
    tools: {
      header: {
        class: Header,
      },
      image: SimpleImage,
      checklist: {
        class: Checklist,
        inlineToolbar: true,
      },
      list: {
        class: List,
        inlineToolbar: true,
        config: {
          defaultStyle: "unordered",
        },
      },
      embed: Embed,
      quote: Quote,
    },
    data: data.content,
  });
});
