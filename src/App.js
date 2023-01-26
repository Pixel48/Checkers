import { auth } from "./firebase";
import Navbar from "./components/Navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Redirect from "./components/Redirect";
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
            <Route index element={<Dashboard newGame />} />
            <Route path=":gameid" element={<Dashboard />} />
          </Route>
          <Route path="/user">
            {/* <Route index element={<Profile />} /> */}
            <Route
              index
              element={
                <Navigate replace to={user ? `/user/${user?.uid}` : "/game"} />
              }
            />
            <Route path=":userid" element={<Profile />} />
          </Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
