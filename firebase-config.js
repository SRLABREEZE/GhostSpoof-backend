// 🔹 Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

// 🔹 Securely Load Firebase Config (Use Environment Variables If Hosting)
const firebaseConfig = {
    apiKey: "YOUR-API-KEY",
    authDomain: "YOUR-AUTH-DOMAIN",
    projectId: "YOUR-PROJECT-ID",
    storageBucket: "YOUR-STORAGE-BUCKET",
    messagingSenderId: "YOUR-MESSAGING-SENDER-ID",
    appId: "YOUR-APP-ID"
};

// 🔹 Initialize Firebase Services
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 🔹 Function to Check If User is an Admin
const checkAdmin = async (user) => {
    if (!user) {
        window.location.href = "login.html"; // 🔴 Redirect if not logged in
        return;
    }

    try {
        const adminRef = doc(db, "admins", user.uid);
        const adminSnap = await getDoc(adminRef);

        if (adminSnap.exists() && adminSnap.data().role === "admin") {
            console.log("✅ Admin Access Granted");
        } else {
            console.warn("❌ Access Denied - Not an Admin");
            window.location.href = "unauthorized.html"; // 🔴 Redirect if unauthorized
        }
    } catch (error) {
        console.error("🔥 Error Checking Admin Access:", error);
    }
};

// 🔹 Listen for Authentication State Changes
onAuthStateChanged(auth, (user) => {
    checkAdmin(user);
});

// 🔹 Logout Function (For Admin Dashboard)
const logoutAdmin = () => {
    signOut(auth).then(() => {
        window.location.href = "login.html"; // Redirect to login after logout
    }).catch((error) => {
        console.error("🔥 Error Logging Out:", error);
    });
};

// 🔹 Export Firebase Services
export { auth, db, checkAdmin, logoutAdmin };
