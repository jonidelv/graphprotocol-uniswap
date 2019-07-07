import React from 'react'
import ReactDOM from 'react-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ApolloProvider } from 'react-apollo'
import 'react-toastify/dist/ReactToastify.min.css'
import './styles/globalStyles.css'
import App from './modules/App'
import client from './services/client'
import * as serviceWorker from './utils/serviceWorker'

ReactDOM.render(
  <CssBaseline>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </CssBaseline>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
