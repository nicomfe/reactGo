import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { RouterContext } from 'react-router'
import Helmet from 'react-helmet'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import staticAssets from './static-assets'
import getMuiTheme from '../../app/theme/materialUITheme'

const createApp = (store, props) => renderToString(
  <MuiThemeProvider muiTheme={getMuiTheme}>
    <Provider store={store}>
      <RouterContext {...props} />
    </Provider>
  </MuiThemeProvider>
)

const buildPage = ({ componentHTML, initialState, headAssets }) => {
  return `
<!doctype html>
<html>
  <head>
    ${headAssets.title.toString()}
    ${headAssets.meta.toString()}
    ${headAssets.link.toString()}
    ${staticAssets.createStylesheets()}
    ${staticAssets.createTrackingScript()}
  </head>
  <body>
    <div id="app">${componentHTML}</div>
    <script>window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}</script>
    ${staticAssets.createAppScript()}
  </body>
</html>`
}

export default (store, props) => {
  const initialState = store.getState()
  const componentHTML = createApp(store, props)
  const headAssets = Helmet.renderStatic()
  return buildPage({ componentHTML, initialState, headAssets })
}
