const firebaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "SEU_PROJECT_ID.firebaseapp.com",
    projectId: "SEU_PROJECT_ID",
    storageBucket: "SEU_PROJECT_ID.firebasestorage.app",
    messagingSenderId: "SEU_SENDER_ID",
    appId: "SEU_APP_ID"
};

const firebaseConfigured = Object.values(firebaseConfig).every((value) => {
    return typeof value === "string"
        && value.trim().length > 0
        && !value.includes("SUA_")
        && !value.includes("SEU_");
});

let auth = null;
let db = null;

if (firebaseConfigured && typeof firebase !== "undefined") {
    firebase.initializeApp(firebaseConfig);
    auth = firebase.auth();
    db = firebase.firestore();
} else if (firebaseConfigured) {
    console.error("Os SDKs do Firebase não foram carregados.");
}
