import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { app } from "../components/firebase";
import { getDatabase,get, ref, set } from "firebase/database";
import SlideBar from "../components/slidebar";

const auth = getAuth(app);
const db = getDatabase(app);

const Profile = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [editing, setEditing] = useState(false);
  const [lastLogin, setLastLogin] = useState("");
  const [lastLoginIST, setLastLoginIST] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setName(currentUser.displayName || "");
        setLastLogin(currentUser.metadata.lastSignInTime || "N/A");
      }
       const snapshot = await get(ref(db, `users/${currentUser.uid}/lastLoginIST`));
      if (snapshot.exists()) {
        setLastLoginIST(snapshot.val());
      }
    });
    return () => unsubscribe();
  }, []);

  const saveName = async () => {
    if (!user) {
      alert("User not authenticated.");
      return;
    }

    try {
      await updateProfile(user, { displayName: name });
      await set(ref(db, `users/${user.uid}/displayName`), name);
      setEditing(false);
      alert("Name updated successfully.");
    } catch (error) {
      alert("Failed to update name: " + error.message);
    }
  };

  const getBgColor = (letter) => {
    const colors = {
      A: "bg-red-500",
      B: "bg-blue-500",
      C: "bg-green-500",
      D: "bg-yellow-500",
      E: "bg-purple-500",
      F: "bg-pink-500",
    };
    return colors[letter.toUpperCase()] || "bg-gray-500";
  };

  const initial = name?.charAt(0)?.toUpperCase() || "?";

  return (
    <div className="flex flex-row min-h-screen">
      <SlideBar />
      <div className="flex-1 p-8 text-white bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-xl mx-auto bg-gray-800 rounded-xl p-6 shadow-md">
          <div className="flex items-center gap-4">
            <div
              className={`w-16 h-16 text-2xl font-bold rounded-full flex items-center justify-center text-white ${getBgColor(initial)}`}
            >
              {initial}
            </div>
            {editing ? (
              <>
                <input
                  className="bg-gray-700 p-2 rounded text-white"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <button
                  onClick={saveName}
                  className="bg-green-600 px-4 py-2 rounded text-white font-semibold ml-2"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-semibold">{name}</h2>
                <button
                  onClick={() => setEditing(true)}
                  className="text-sm text-blue-400 underline ml-2"
                >
                  Edit
                </button>
              </>
            )}
          </div>
          <p className="text-gray-400 mt-2">Email: {user?.email}</p>
          <p className="text-gray-400 mt-1">Last Login: {lastLogin}</p>
          <p className="text-gray-400 mt-1">Last Login (IST): {lastLoginIST}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
