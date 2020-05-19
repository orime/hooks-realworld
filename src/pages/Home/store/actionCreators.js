//actionCreators.js
import * as actionTypes from './constants';
import { getArticleListRequest, getTagListRequest } from '../../../api/article';

// 更改文章列表
export const changeArticleList = (data) => ({
  type: actionTypes.CHANGE_ARTICLE_LIST,
  data,
});
// 更改标签
export const changeTagList = (data) => ({
  type: actionTypes.CHANGE_TAGS,
  data
})
// 存储文章详情
export const setArticleDetail = (data) => ({
  type: actionTypes.CHANGE_ARTICLE_DETAIL,
  data
})

// 获取文章列表异步action
export const getArticleList = () => {
  return (dispatch) => {
    getArticleListRequest().then((data) => {
        const action = changeArticleList(data.articles);
        dispatch(action);
      })
      .catch(() => {
        console.log('文章列表请求出错');
      });
  };
};

// 获取标签列表异步action
export const getTagList = () => {
  return (dispatch) => {
    getTagListRequest().then((data) => {
      const action = changeTagList(data.tags)
      dispatch(action)
    })
    .catch((err) => {
      console.log('获取标签列表出错')
      throw new Error(err)
    })
  }
}
