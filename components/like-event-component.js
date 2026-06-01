import { getPosts, toggleLike } from "../api.js";
import { POSTS_PAGE } from "../routes.js";
import { renderPostsPageComponent } from "./posts-page-component.js";
import { renderUserPostsPageComponent } from "./user-page-component.js";
import { posts } from "../index.js";

export const likeEventListeners = ({appEl, pageComponent}) => {
    const likeButtons = document.querySelectorAll(".like-button");

    for (const likeButton of likeButtons) {
        
    likeButton.addEventListener("click", (event) => {
        event.stopPropagation()
        const id = post.id
        const index = post.index
        let like;

        posts[index].isLiked ? (like = "dislike") : (like = "like");

        toggleLike({token: getToken(), id, like}).then((updatePost) => {
            posts[index] = updatePost.post;
            getPosts(posts);
            if (POSTS_PAGE) {
                renderPostsPageComponent({appEl, pageComponent})
            } else {
                renderUserPostsPageComponent({appEl, pageComponent})
            }
        })
    })
    }
}