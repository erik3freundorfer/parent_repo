import React from 'react'
import ReactDom from 'react-dom'
import App from './child_repo/main.jsx'

const TheApp = (
  <App />
)

ReactDom.render(TheApp, document.getElementById('the-app'))
