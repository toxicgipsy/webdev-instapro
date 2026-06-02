import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../index.js";
import { USER_POSTS_PAGE } from "../routes.js";
import { getLikes } from "./likes-helper.js";
import { likeEventListeners } from "./like-event-component.js";
import { getTimeAgo } from "./date-helper.js";

export function renderUserPostsPageComponent({ appEl }) {
  const headerHtml = `
                    <div class="page-container">
                        <div class="header-container"></div>
                        <ul class="posts"></ul>
                    </div>`;

  appEl.innerHTML = headerHtml;

  const userPostsList = document.querySelector(".posts");

  const appHtml = posts
    .map((post, index) => {
      return `
            <ul class="posts" data-index="${index}">
                <li class="post">
                    <div class="post-header" data-user-id="${post.user.id}">
                        <img class="post-header__user-image" src="${post.user.imageUrl}">
                        <p class="post-header__user-name">${post.user.name}</p>
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
                        <span class="user-name">${post.user.name}</span>
                          ${post.description}
                      </p>
                      <p class="post-date">
                        ${getTimeAgo(post.createdAt)}
                      </p>
                </li>
            </ul>
      `;
    })
    .join("");

  userPostsList.innerHTML = appHtml;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  likeEventListeners({
    appEl,
    renderPage: () => renderUserPostsPageComponent({ appEl }),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }
}
