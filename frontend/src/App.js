
import './App.css';
import Header from './components/Header';
import NotesListPage from './pages/NotesListPage';
import NotePage from './pages/NotePage';
import {
  HashRouter as Router,
  Route,
  Routes
} from "react-router-dom";

function App() {
  return (
    <Router>
    <div className='container dark'>
      <div className="App  ">
      <Header/>
      <Routes>
      <Route path="/" exact element={<NotesListPage/>}/>
      <Route path="/note/:id" element={<NotePage/>}></Route>
      </Routes>
      </div>
    </div>
    </Router>
  );
}

export default App;
