import React, { useCallback, useState } from "react";
import "./app.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Employee from "./pages/Employee";

function App() {
  const [counter, setCounter] = useState(0);

  const handleAdd = useCallback(() => {
    setCounter(counter + 1);
  }, [counter]);

  const handleReset = useCallback(() => {
    setCounter(0);
  }, []);

  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/employee">
          <Employee />
        </Route>
        <Route path="/">
          <div className="App">
            <div>
              <h2>Counter: {counter}</h2>
              <button onClick={handleAdd} className="btnAdd">
                +
              </button>
              <button onClick={handleReset} className="btnReset">
                Reset
              </button>
            </div>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
