import { escapeHtml } from "./escapeHtml.js";

// Функция получения лайка и имени пользователей, которые поставили лайк
export function getLikes(likes) {
  if (likes.length === 0) {
    return 0;
  }

  const lastLike = likes[likes.length - 1];
  const otherLikesCount = likes.length - 1;

  if (otherLikesCount > 0) {
    return `${escapeHtml(lastLike.name)} и ещё ${otherLikesCount}`;
  }

  return escapeHtml(lastLike.name);
}
