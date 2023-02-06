import { auth } from "./firebase";
import Navbar from "./components/Navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import "./App.css";
import GameFinder from "./pages/Dashboard/GameFinder";
import Spectator from "./pages/Dashboard/Spectator";
import Gamer from "./pages/Dashboard/Gamer";
import SpectatorFinder from "./pages/Dashboard/SpectatorFinder";

function App() {
  const [user] = useAuthState(auth);

  return (
    <>
      <Navbar />

      <main className="container">
        <div className="row" style={{ margin: "1em 0" }}>
          <Routes>
            <Route
              exact
              path="/"
              element={<Navigate replace to={user ? "/game" : "/spectator"} />}
            />

            <Route exact path="/game" element={<GameFinder />} />
            <Route path="/game/:gameid" element={<Gamer />} />

            <Route exact path="/spectator" element={<SpectatorFinder />} />
            <Route path="/spectator/:gameid" element={<Spectator />} />

            <Route
              exact
              path="/user"
              element={
                <Navigate replace to={user ? `/user/${user?.uid}` : "/game"} />
              }
            />
            <Route path="/user/:userid" element={<Profile />} />
          </Routes>
        </div>
      </main>
    </>
  );
}

export default App;
