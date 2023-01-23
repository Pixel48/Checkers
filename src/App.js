import { auth } from "./firebase";
import Navbar from "./components/Navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Redirect from "./components/Redirect";
import Profile from "./pages/Proflie";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "./firebase";

import "./App.css";

function App() {
  const [user] = useAuthState(auth);

  return (
    <>
      <Navbar user={user} />

      <main className="container">
        <Routes>
          <Route path="/" element={<Redirect to="/game" />} />
          <Route path="/game">
            <Route index element={<Dashboard user={user} newGame />} />
            <Route path=":gameID" element={<Dashboard user={user} />} />
          </Route>
          <Route path="/user">
            <Route index element={<Redirect to={`/user/${user?.uid}`} />} />
            <Route path=":userID" element={<Profile user={user} />} />
          </Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
