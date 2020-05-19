import React from 'react';
import CommonHeader from './CommonHeader'
import CommonFooter from './CommonFooter'
import { renderRoutes, RouteConfig } from 'react-router-config';
// import { hashHistory } from 'react-router-dom';

const Layout: React.FC = ({ route }: RouteConfig) => {
  console.log(route, '子路由');
  
  return (
  <>
    <CommonHeader ></CommonHeader>
      {renderRoutes(route.routes)}
    <CommonFooter ></CommonFooter>
  </>
  )
};

export default Layout;
