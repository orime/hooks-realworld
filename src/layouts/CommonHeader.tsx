import React, { FC, useState } from "react";
import { withRouter } from "react-router-dom"; // 使用withRouter包裹组件之后，组件中的props得到history属性进行跳转
import { NavLink } from 'react-router-dom'; // 利用 NavLink 组件进行路由跳转

const CommonHeader: FC = (props: any) => {
  const [showUser, setShowUser] = useState(false);
  const user = {
    image: "",
    username: "",
  };

  const pushRegister = (e:any) => {
    e.preventDefault()
    props.history.replace("/register");
  };

  const pushLogin = (e:any) => {
    e.preventDefault()
    props.history.replace("/login");
  };

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <a className="navbar-brand" href="index.html">
          conduit
        </a>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            {/* <!-- Add "active" class when you're on that page" --> */}
            <NavLink className="nav-link" to='/home' activeClassName='selected'>
                <span>首页</span>
            </NavLink>
          </li>
          {/* <li className="nav-item">
            <a className="nav-link" href="">
              <i className="ion-compose"></i>&nbsp;New Post
            </a>
          </li> */}
          <li className="nav-item">
            <NavLink className="nav-link" to='/editor' activeClassName='selected'>
                <span><i className="ion-compose"></i>&nbsp;New Article</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to='/settings' activeClassName='selected'>
                <span><i className="ion-gear-a"></i>&nbsp;Settings</span>
            </NavLink>
          </li>
          <li className="nav-item">
            {/* <a className="nav-link" onClick={pushLogin}>
              登录
            </a> */}
            <NavLink className="nav-link" to='/login' activeClassName='selected'>
                <span>登录</span>
            </NavLink>
          </li>
          <li className="nav-item">
            {/* <a className="nav-link" onClick={pushRegister}>
              注册
            </a> */}
            <NavLink className="nav-link" to='/register' activeClassName='selected'>
                <span>注册</span>
            </NavLink>
          </li>
          <li className="nav-item">
            {/* <a className="nav-link" onClick={pushRegister}>
              注册
            </a> */}
            <NavLink className="nav-link" to='/profile' activeClassName='selected'>
                <span>个人中心</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default withRouter(CommonHeader);
