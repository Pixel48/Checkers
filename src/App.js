import { auth } from "./firebase";
import Navbar from "./components/Navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { Routes, Route } from "react-router-dom";

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
            element={user ? <h1>Dashboard</h1> : <h1>Spectator</h1>}
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
