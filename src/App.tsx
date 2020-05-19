import React, {FC} from 'react'
// 引入并配置路由
import { HashRouter as Router } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import routes from './routes'
import { Provider } from 'react-redux'
import composeStore from './store';


const App: FC = (props: {[index: string]: any}) => {
  return (
    <Provider store={composeStore}>
      <Router>
        {renderRoutes(routes)}
      </Router>
    </Provider>
  );
}

export default App;
 