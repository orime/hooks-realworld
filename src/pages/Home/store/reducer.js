/* eslint-disable default-case */
import * as actionTypes from "./constants";
import { fromJS } from "immutable"; // 这里用到 fromJS 把 JS 数据结构转化成 immutable 数据结构
// import produce from 'immer';

// const defaultState = fromJS ({
//   bannerList: [],
//   recommendList: [],
// });
const defaultState = fromJS({
  articleList: [], // 文章列表
  tagList: [], // 标签列表
  detail: {}, // 文章详情
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_ARTICLE_LIST:
      return state.set("articleList", action.data);
    case actionTypes.CHANGE_TAGS:
      return state.set("tagList", action.data);
    case actionTypes.CHANGE_ARTICLE_DETAIL:
      return state.set("detail", action.data);
    default:
      return state;
  }
};
