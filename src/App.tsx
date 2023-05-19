import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Provider} from "react-redux"
import store from './store'


function App() {
  return (
    <Provider store={store}>

    <div>
      <h1>Hello Diary App</h1>
    </div>

    </Provider>
  );
}

export default App;
