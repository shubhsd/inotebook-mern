import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';

function App() {
  // Here we will wrap our application in context that we made i.e Notestate so that all variables inside notestate should be accesible to each and every component wrapped inside it.
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/"><Home /> </Route>
            <Route exact path="/about"><About /></Route>
          </Switch>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
