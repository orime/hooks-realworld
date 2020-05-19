import React, { FC, useRef, useEffect, useState } from 'react'
import { connect } from 'react-redux';
// import * as actionTypes from '../Home/store/actionCreators'
import { requestCommentBySlug, requestDetailBySlug } from '../../api/article'
import { setArticleDetail } from '../Home/store/actionCreators';

const Article = (props) => {

  // const { detail } = props
  // const detail = detail instanceof Object ? detail : detail.toJS()
  // console.log(detail, detail, '测试刷新');

  const [detail, setDetail] = useState({author: {}})
  const [comments, setComments] = useState([])


  // 获取评论
  const handleRequestCommentBySlug = async (slug) => {
    const data = await requestCommentBySlug(slug)
    console.log(data, 'data');
    return data
  }
  // 获取文章详情
  const handleRequestDetailBySlug = async (slug) => {
    const data = await requestDetailBySlug(slug)
    return data
  }

  useEffect( () => {

    console.log(props.history.location, 'location');

    const { detail } = props.history.location
    const slug = props.history.location.pathname.split('/')[2]

    requestCommentBySlug(slug).then(res => {
      setComments(res.comments)
    })

    if (detail) {
      // 父组件传过来，只需请求comments
      setDetail(detail)
    } else {
      // 刷新，均需重新请求，此时父组件传过来值为空，slug从url获取
      requestDetailBySlug(slug).then(res => {
        setDetail(res.article)
      })
    }
    console.log(detail, 'detail');
  }, [])  


  return (
    <div className="article-page">

      <div className="banner">
        <div className="container">

          <h1>{detail.title}</h1>

          <div className="article-meta">
            <a href=""><img src={detail.author.image} /></a>
            <div className="info">
              <a href="" className="author">{detail.author.username}</a>
              <span className="date">{detail.createdAt}</span>
            </div>
            <button className="btn btn-sm btn-outline-secondary">
              <i className="ion-plus-round"></i>
          &nbsp;
          Follow {detail.author.username} <span className="counter">(10)</span>
            </button>
        &nbsp;&nbsp;
        <button className="btn btn-sm btn-outline-primary">
              <i className="ion-heart"></i>
          &nbsp;
          Favorite Post <span className="counter">({detail.favoritesCount})</span>
            </button>
          </div>

        </div>
      </div>

      <div className="container page">

        <div className="row article-content">
          <div className="col-md-12">
            <p>
              {detail.description}
            </p>
            <h2 id="introducing-ionic">{detail.title}</h2>
            <p>{detail.body}</p>
          </div>
        </div>

        <hr />

        <div className="article-actions">
          <div className="article-meta">
            <a href="profile.html"><img src={detail.author.image} /></a>
            <div className="info">
              <a href="" className="author">{detail.author.username}</a>
              <span className="date">{detail.createdAt}</span>
            </div>

            <button className="btn btn-sm btn-outline-secondary">
              <i className="ion-plus-round"></i>
          &nbsp;
          Follow Eric Simons <span className="counter">(10)</span>
            </button>
        &nbsp;
        <button className="btn btn-sm btn-outline-primary">
              <i className="ion-heart"></i>
          &nbsp;
          Favorite Post <span className="counter">({detail.favoritesCount})</span>
            </button>
          </div>
        </div>

        <div className="row">

          <div className="col-xs-12 col-md-8 offset-md-2">

            <form className="card comment-form">
              <div className="card-block">
                <textarea className="form-control" placeholder="Write a comment..." rows={3}></textarea>
              </div>
              <div className="card-footer">
                <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                <button className="btn btn-sm btn-primary">
                  Post Comment
            </button>
              </div>
            </form>
            {comments.map((item, index) => (
              <div className="card">
                <div className="card-block">
                  <p className="card-text">{item.body}</p>
                </div>
                <div className="card-footer">
                  <a href="" className="comment-author">
                    <img src={item.author.image} className="comment-author-img" />
                  </a>
            &nbsp;
        <a href="" className="comment-author">{item.author.username}</a>
                  <span className="date-posted">{item.createdAt}</span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>

  )
}


// export default Article

// 映射Redux全局的state到组件的props上
const mapStateToProps = (state) => ({
  detail: state.getIn(['article', 'detail']),
});
// 映射dispatch到props上
const mapDispatchToProps = (dispatch) => {
  return {

  };
};

// 将ui组件包装成容器组件
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Article));
