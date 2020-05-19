import React from "react";
import { Redirect } from "react-router-dom";
import { RouteConfig } from "react-router-config";

import BasicLayout from "../layouts/BasicLayout";
import Register from "../pages/User/Register";
import Login from "../pages/User/Login";
import Home from "../pages/Home";

import Profile from '../pages/Profile'
import Settings from '../pages/Settings'

import Editor from '../pages/Editor'
import Article from '../pages/Article'

const routes: RouteConfig[] = [
  {
    component: BasicLayout,
    routes: [
      {
        path: "/home",
        component: Home,
        routes: [],
      },
      {
        path: "/",
        exact: true,
        render: () => <Redirect to={"/home"} />,
      },
      {
        path: "/login",
        component: Login,
      },
      {
        path: "/register",
        component: Register,
      },
      {
        path: "/profile",
        component: Profile,
      },
      {
        path: "/settings",
        component: Settings,
      },
      {
        path: "/editor",
        component: Editor,
      },
      {
        path: '/article/:slug',
        exact: true,
        component: Article,
    }
    ],
  },
];

export default routes;
