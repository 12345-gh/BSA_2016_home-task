import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import App from './components/app.react.js'

render(
    (<App />)
    , document.getElementById('root')
)