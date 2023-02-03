import { auth } from "./firebase";
import Navbar from "./components/Navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import "./App.css";

function App() {
  const [user] = useAuthState(auth);

  return (
    <>
      <Navbar />

      <main className="container">
        <Routes>
          <Route path="/" element={<Navigate replace to="/game" />} />
          <Route path="/game">
            <Route index element={<Dashboard />} />
            <Route path=":gameid" element={<Dashboard />} />
          </Route>
          <Route path="/user">
            <Route
              index
              element={
                <Navigate replace to={user ? `/user/${user?.uid}` : "/game"} />
              }
            />
            <Route path=":userid" element={<Profile />} />
          </Route>
          <Route path="/spectator">
            <Route path=":gameid" element={<Dashboard spectator />} />
            <Route index element={<Navigate replace to="/game" />} />
          </Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
