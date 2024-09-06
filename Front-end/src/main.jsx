import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store/store';
import App from './App';
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);

// import ReactDOM from 'react-dom/client';
// import { Provider } from 'react-redux';
// import store from './redux/store/store';
// import App from './App';
// import './index.scss';

// ReactDOM.createRoot(document.getElementById('root')).render(
//     <Provider store={store}>
//         <App />
//     </Provider>
// );

// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
// import './index.scss'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
