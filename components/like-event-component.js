import { toggleLike } from "../api.js";
import { getToken, posts } from "../index.js";

export const likeEventListeners = ({ appEl, renderPage }) => {
  const likeButtons = document.querySelectorAll(".like-button");

  likeButtons.forEach((likeButton) => {
    likeButton.addEventListener("click", () => {
      const postId = likeButton.dataset.postId;
      const post = posts.find((p) => p.id === postId);
      const index = likeButton.dataset.index;

      const token = getToken();

      if (!token) {
        alert("Пожалуйста, авторизуйтесь, чтобы увидеть лайки");
        return;
      }

      toggleLike({
        token: token,
        id: postId,
        like: post.isLiked ? "dislike" : "like",
      }).then((updatePost) => {
        posts[index] = updatePost.post;
        renderPage();
      });
    });
  });
};
