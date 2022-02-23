/* eslint-disable linebreak-style */
/* eslint-disable import/prefer-default-export */
const baseURL = 'https://dev.flyked.com/api/v1/users';

export const API = {
  CREATE_PAGE_API: `${baseURL}/createPage`,

  SEARCH: `${baseURL}/search`,

  PAGE_DETAILS: `${baseURL}/page`,

  GET_CATEGORY: `${baseURL}/category`,

  GET_SUBCATEGORY: `${baseURL}/subCategory`,

  VIEW_PROFILE: `${baseURL}/viewProfile`,

  SOCIAL_LOGIN: `${baseURL}/socialLogin`,

  USER_SIGNUP: `${baseURL}/socialLogin`,

  USER_PROFILE_UPDATE: `${baseURL}/updateProfile`,

  FILE_UPLOAD: `${baseURL}/uploadImage`,

  UPDATE_INTERESTS: `${baseURL}/updateInterests`,

  // GET_PAGES_ON_SEARCH: `${baseURL}/searchPage`,
  GET_PAGES_ON_SEARCH: `${baseURL}/search`,

  CREATE_POST_API: `${baseURL}/post`,

  PENDING_POSTS: `${baseURL}/post/pending`,

  PUBLISHED_POSTS: `${baseURL}/post/published`,

  SAVED_POSTS: `${baseURL}/post/saved`,

  POST_DETAILS: `${baseURL}/post`,

  SAVE_POST_API: `${baseURL}/post`,

  COMMENT_POST_API: `${baseURL}/post`,

  LIKE_POST_API: `${baseURL}/post`,

  USER_PUBLIC_VIEW: `${baseURL}/`,

  BIRTHDAY_FEED: `${baseURL}/onBirthday`,

  THIS_DAY_FEED: `${baseURL}/onThisDay`,

  IN_NEWS_FEED: `${baseURL}/inNews`,

  FEEDS: `${baseURL}/feed`,

  SUGGESTED_PAGES: `${baseURL}/suggestedPages`,

  FEED_POST_PREVIEW: `${baseURL}/post`,

  PAGE_FOLLOW_UNFOLLOW: `${baseURL}/page`,
};
