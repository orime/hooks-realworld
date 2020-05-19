import { axiosInstance } from "../utils/request";

// 获取文章列表
export const getArticleListRequest = () => {
  return axiosInstance.get(
    `/api/articles`
  );
}

// 获取标签列表
export const getTagListRequest = () => {
  return axiosInstance.get(`/api/tags`)
}

// 根据slug获取文章评论
export const requestCommentBySlug = (slug: any) => {
  return axiosInstance.get(
    `/api/articles/${slug}/comments`
  );
}
// 根据slug获取文章详情
export const requestDetailBySlug = (slug: any) => {
  return axiosInstance.get(
    `/api/articles/${slug}`
  );
}