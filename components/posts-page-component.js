import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../index.js";

export function renderPostsPageComponent({ appEl }) {
  // @TODO: реализовать рендер постов из api
  console.log("Актуальный список постов:", posts);

  /**
   * @TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */

  const appHtml = posts
    .map((post, index) => {
      return `
              <div class="page-container">
                <div class="header-container"></div>
                <ul class="posts" data-index=${index}>
                  <li class="post">
                    <div class="post-header" data-user-id="${post.user.id}">
                        <img src="${post.user.imageUrl}" class="post-header__user-image">
                        <p class="post-header__user-name">${post.user.name}</p>
                    </div>
                    <div class="post-image-container">
                      <img class="post-image" data-post-id="${post.id}" src="${post.imageUrl}" data-index="${index}">
                    </div>
                    <div class="post-likes">
                      <button data-post-id="${post.id}" class="like-button ${post.isLiked ? "true" : ""}">
                        <img src="${post.isLiked ? "./assets/images/like-active.svg" : "./assets/images/like-not-active.svg"}">
                      </button>
                      <p class="post-likes-text">
                        Нравится: <strong>${getLikes(post.likes)}</strong>
                      </p>
                    </div>
                    <p class="post-text">
                      <span class="user-name">${post.user.name}</span>
                      ${post.description}
                    </p>
                    <p class="post-date">
                      ${post.createdAt}
                    </p>
                  </li>
                </ul>
              </div>`;
    })
    .join("");

  appEl.innerHTML = appHtml;


  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  const likeButtons = document.querySelectorAll(".like-button")

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }
}

// Функция получения лайка и имени пользователей, которые поставили лайк
export function getLikes(likes) {
  if (likes.length === 0) {
    return 0;
  }

  const lastLike = likes[likes.length - 1];
  const otherLikesCount = likes.length - 1;

  if (otherLikesCount > 0) {
    return `${lastLike.name} и ещё ${otherLikesCount}`;
  }

  return lastLike.name;
}
