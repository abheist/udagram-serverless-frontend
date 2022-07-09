// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'semantic-ui-css/semantic.min.css'
import MakeAuthRouting from './routing'
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(<BrowserRouter><MakeAuthRouting/></BrowserRouter>,
    document.getElementById('root'))
