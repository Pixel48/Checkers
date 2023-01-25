import { auth, db } from "./firebase";
import Navbar from "./components/Navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Redirect from "./components/Redirect";
import Profile from "./pages/Proflie";

import "./App.css";

function App() {
  const [user] = useAuthState(auth);

  return (
    <>
      <Navbar />

      <main className="container">
        <Routes>
          <Route path="/" element={<Redirect to="/game" />} />
          <Route path="/game">
            <Route index element={<Dashboard newGame />} />
            <Route path=":gameID" element={<Dashboard />} />
          </Route>
          <Route path="/user">
            <Route index element={<Redirect to={`/user/${user?.uid}`} />} />
            <Route path=":userID" element={<Profile />} />
          </Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
