import { auth } from "./firebase";
import Navbar from "./components/Navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";

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
        </Routes>
      </main>
    </>
  );
}

export default App;
