import React, { FC, useState, useEffect } from "react";
import { connect } from 'react-redux';
import * as actionTypes from '../Home/store/actionCreators'
import { withRouter } from 'react-router-dom'
import { requestCommentBySlug } from '../../api/article'


const Home = ({
  articleList,
  tagList,
  getArticleListDispatch,
  getTagListDispatch,
  setDetailDispatch,
  history,
  detail
}) => {

  useEffect (() => {
    if (!articleList.length) { // 可在页面切换过程中保留articleList防止不必要的再次请求
      getArticleListDispatch();
    }
    if (!tagList.length) {
      getTagListDispatch()
    }
  }, []);
  
  const articleListJs = articleList instanceof Array ? articleList :  articleList.toJS()
  const tagListJs = tagList instanceof Array ? tagList :  tagList.toJS()
  console.log(detail, 'detail');
  
  const detailJs = detail instanceof Object ? detail : detail.toJS()
  console.log(detailJs, 'detailJs')


  /**
   * 跳转到文章详情
   */
  const pushArticleDetail = async (item) => {

    // 1、根据item.slug请求得到评论列表comments
    // 2、将评论列表组合进detail形成新的对象添加到全局store中
    // 3、路由跳转到文章详情页

    // 4、优化，记录上次点击值，如果和当前点击值一致则不发起action
    // 5、第四步如果使用state存储会造成无法页面刷新数据丢失，所以从store中得到数据进行对比
    // if(detailJs.slug !== item.slug) {
    //   console.log('准备发送请求')
    //   const data = await requestCommentBySlug(item.slug)
    //   setDetailDispatch({...item, comments: data.comments})
    // }

    history.push({
      pathname: `/article/${item.slug}`,
      detail: item
    })
  }

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <a className="nav-link disabled" href="">
                    Your Feed
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" href="">
                    Global Feed
                  </a>
                </li>
              </ul>
            </div>

            { articleListJs.map((item, index) => (
              <div className="article-preview" onClick={() => pushArticleDetail(item)}>
              <div className="article-meta">
                <a>
                  <img src={item.author.image} />
                </a>
                <div className="info">
                  <a href="" className="author">
                    {item.author.username}
                  </a>
                <span className="date">{item.createdAt}</span>
                </div>
                <button className="btn btn-outline-primary btn-sm pull-xs-right">
                  <i className="ion-heart"></i>{item.favoritesCount}
                </button>
              </div>
              <a href="" className="preview-link">
            <h1>{item.title}</h1>
            <p>{item.body}</p>
                <span>Read more...</span>
              </a>
            </div>

            )) }
            </div>

          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>
              <div className="tag-list">
              {tagListJs.map(tag => (
                <a href="" className="tag-pill tag-default">
                  {tag}
                </a>
              ))}
      
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 映射Redux全局的state到组件的props上
const mapStateToProps = (state) => ({
  articleList: state.getIn(['article', 'articleList']),
  tagList: state.getIn(['article', 'tagList']),
  detail: state.getIn(['article', 'detail'])
});
// 映射dispatch到props上
const mapDispatchToProps = (dispatch) => {
  return {
    getArticleListDispatch() {
      dispatch(actionTypes.getArticleList());
    },
    getTagListDispatch() {
      dispatch(actionTypes.getTagList());
    },
    setDetailDispatch(data) {
      dispatch(actionTypes.setArticleDetail(data));
    },
  };
};

// 将ui组件包装成容器组件
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(withRouter(Home)));

