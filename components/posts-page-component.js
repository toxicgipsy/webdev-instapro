import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../index.js";
import { likeEventListeners } from "./like-event-component.js";
import { getLikes } from "./likes-helper.js";
import { getTimeAgo } from "./date-helper.js";
import { escapeHtml } from "./escapeHtml.js";

export function renderPostsPageComponent({ appEl }) {

  const appHtml = posts
    .map((post, index) => {
      return `
              <div class="page-container">
                <div class="header-container"></div>
                <ul class="posts" data-index=${index}>
                  <li class="post">
                    <div class="post-header" data-user-id="${post.user.id}">
                        <img src="${post.user.imageUrl}" class="post-header__user-image">
                        <p class="post-header__user-name">${escapeHtml(post.user.name)}</p>
                    </div>
                    <div class="post-image-container">
                      <img class="post-image" data-post-id="${post.id}" src="${post.imageUrl}" data-index="${index}">
                    </div>
                    <div class="post-likes">
                      <button data-post-id="${post.id}" data-index="${index}" class="like-button ${post.isLiked ? "true" : ""}">
                        <img src="${post.isLiked ? "./assets/images/like-active.svg" : "./assets/images/like-not-active.svg"}">
                      </button>
                      <p class="post-likes-text">
                        Нравится: <strong>${getLikes(post.likes)}</strong>
                      </p>
                    </div>
                    <p class="post-text">
                      <span class="user-name">${escapeHtml(post.user.name)}</span>
                      ${escapeHtml(post.description)}
                    </p>
                    <p class="post-date">
                     ${getTimeAgo(post.createdAt)}
                    </p>
                  </li>
                </ul>
              </div>`;
    })
    .join("");

  appEl.innerHTML = appHtml;

  likeEventListeners({
    appEl,
    renderPage: () => renderPostsPageComponent({ appEl }),
  });

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }
}
