import { auth } from "./firebase";
import Navbar from "./components/Navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

import "./App.css";

function App() {
  const [user] = useAuthState(auth);

  return (
    <>
      <Navbar user={user} />

      <main className="container">
        <Routes>
          <Route
            exact
            path="/"
            element={user ? <Dashboard /> : <h1>Spectator</h1>}
          />
          {/* route to user stats under /user/:id. If !user, then redirect to / */}
          <Route
            path="/user/:id"
            element={user ? <h1>User stats</h1> : <h1>Spectator</h1>}
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
