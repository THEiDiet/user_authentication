import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter} from 'react-router-dom'
import reportWebVitals from './reportWebVitals'
import App from './App'
import './index.css'

ReactDOM.render(
  <HashRouter><App/></HashRouter>, document.getElementById('root')
)

reportWebVitals()
