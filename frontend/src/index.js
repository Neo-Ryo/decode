import React from 'react'
import ReactDOM from 'react-dom'
import 'bootswatch/dist/sketchy/bootstrap.min.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './index.css'
import App from './App'

ReactDOM.render(
    <React.StrictMode>
        <App />
        <ToastContainer
            position="bottom-center"
            autoClose={3500}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            draggable
        />
    </React.StrictMode>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
