import React from 'react'
import ReactDom from 'react-dom'
import App from './child_repo/index'

const TheApp = (
  <App />
)

ReactDom.render(TheApp, document.getElementById('the-app'))
