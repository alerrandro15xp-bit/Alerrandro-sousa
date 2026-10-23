const sections = {
    login: document.getElementById("loginSection"),
    register: document.getElementById("criarContaSection"),
    topics: document.getElementById("topicosSection"),
    lesson: document.getElementById("aulaSection")
};

const appMessage = document.getElementById("appMessage");
const logoutButton = document.getElementById("logout-button");
const topicTitles = {
    fracoes: "Frações e equivalência",
    ciencias: "Ciências",
    historia: "História do Brasil"
};

function showMessage(message, isError = true) {
    appMessage.textContent = message;
    appMessage.hidden = !message;
    appMessage.classList.toggle("success-message", !isError);
}

function showSection(sectionName) {
    Object.entries(sections).forEach(([name, section]) => {
        section.classList.toggle("hidden", name !== sectionName);
    });
    showMessage("");
}

function mostrarLogin() {
    showSection("login");
}

function mostrarCriarConta() {
    showSection("register");
}

function mostrarTopicos() {
    showSection("topics");
}

function mostrarAula() {
    showSection("lesson");
}

function getFirebaseSetupError() {
    if (typeof firebase === "undefined") {
        return "Não foi possível carregar o Firebase. Verifique sua conexão e recarregue a página.";
    }
    if (!firebaseConfigured || !auth || !db) {
        return "Configure os dados do seu projeto Firebase em firebase-config.js antes de entrar.";
    }
    return "";
}

async function withButtonLoading(button, action) {
    button.disabled = true;
    try {
        await action();
    } catch (error) {
        console.error("Falha na operação:", error);
        showMessage(getReadableError(error));
    } finally {
        button.disabled = false;
    }
}

function getReadableError(error) {
    const messages = {
        "auth/email-already-in-use": "Este e-mail já está cadastrado.",
        "auth/invalid-email": "Informe um endereço de e-mail válido.",
        "auth/invalid-credential": "E-mail ou senha incorretos.",
        "auth/user-not-found": "Não encontramos uma conta com este e-mail.",
        "auth/wrong-password": "E-mail ou senha incorretos.",
        "auth/weak-password": "A senha precisa conter no mínimo 6 caracteres.",
        "auth/network-request-failed": "Falha de conexão. Verifique sua internet e tente novamente.",
        "permission-denied": "O Firebase negou o acesso. Confira as regras do Firestore.",
        "failed-precondition": "O Firestore precisa de um índice. Confira o erro no console do Firebase."
    };
    return messages[error.code] || error.message || "Ocorreu um erro inesperado. Tente novamente.";
}

document.getElementById("showRegisterButton").addEventListener("click", mostrarCriarConta);
document.getElementById("showLoginButton").addEventListener("click", mostrarLogin);
document.getElementById("backToTopicsButton").addEventListener("click", mostrarTopicos);
logoutButton.addEventListener("click", async () => {
    const setupError = getFirebaseSetupError();
    if (setupError) {
        showMessage(setupError);
        return;
    }
    await withButtonLoading(logoutButton, () => auth.signOut());
});

document.getElementById("loginForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const setupError = getFirebaseSetupError();
    if (setupError) {
        showMessage(setupError);
        return;
    }

    const form = event.currentTarget;
    const button = form.querySelector('[type="submit"]');
    const email = document.getElementById("emailLogin").value.trim();
    const password = document.getElementById("senhaLogin").value;
    await withButtonLoading(button, () => auth.signInWithEmailAndPassword(email, password));
});

document.getElementById("registerForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const setupError = getFirebaseSetupError();
    if (setupError) {
        showMessage(setupError);
        return;
    }

    const form = event.currentTarget;
    const button = form.querySelector('[type="submit"]');
    const name = document.getElementById("nomeCriar").value.trim();
    const email = document.getElementById("emailCriar").value.trim();
    const password = document.getElementById("senhaCriar").value;
    if (!name) {
        showMessage("Informe seu nome.");
        return;
    }

    await withButtonLoading(button, async () => {
        const credential = await auth.createUserWithEmailAndPassword(email, password);
        await credential.user.updateProfile({ displayName: name });
    });
});

document.querySelectorAll("[data-topic]").forEach((button) => {
    button.addEventListener("click", () => abrirTopico(button.dataset.topic));
});

if (!getFirebaseSetupError()) {
    auth.onAuthStateChanged(
        (user) => {
            logoutButton.hidden = !user;
            if (user) {
                mostrarTopicos();
            } else {
                mostrarLogin();
            }
        },
        (error) => {
            console.error("Falha ao verificar a sessão:", error);
            showMessage(getReadableError(error));
        }
    );
} else {
    mostrarLogin();
    showMessage(getFirebaseSetupError());
}

async function abrirTopico(topicId) {
    const setupError = getFirebaseSetupError();
    if (setupError) {
        showMessage(setupError);
        return;
    }

    const content = document.getElementById("conteudoAula");
    const exercises = document.getElementById("listaExercicios");
    document.getElementById("lessonTitle").textContent = topicTitles[topicId] || "Conteúdo da aula";
    content.textContent = "Buscando conteúdo didático...";
    exercises.replaceChildren();
    mostrarAula();

    try {
        const snapshot = await db.collection("exercises")
            .where("topicId", "==", topicId)
            .where("active", "==", true)
            .orderBy("order")
            .get();

        content.textContent = topicTitles[topicId]
            ? `Pratique o conteúdo de ${topicTitles[topicId].toLowerCase()} com os exercícios abaixo.`
            : "Pratique o conteúdo com os exercícios abaixo.";

        if (snapshot.empty) {
            exercises.textContent = "Nenhum exercício ativo foi encontrado para este tópico.";
            return;
        }

        snapshot.docs.forEach((document, index) => {
            const exercise = document.data();
            if (!isValidExercise(exercise)) {
                console.error(`Exercício inválido no documento ${document.id}.`);
                return;
            }
            exercises.appendChild(createExercise(exercise, index));
        });

        if (!exercises.childElementCount) {
            exercises.textContent = "Os exercícios deste tópico estão com dados incompletos.";
        }
    } catch (error) {
        console.error("Erro ao buscar exercícios no Firestore:", error);
        content.textContent = "";
        showMessage(getReadableError(error));
    }
}

function isValidExercise(exercise) {
    return typeof exercise.prompt === "string"
        && exercise.prompt.trim().length > 0
        && Array.isArray(exercise.options)
        && exercise.options.length > 0
        && exercise.options.every((option) =>
            option && typeof option.id === "string" && typeof option.text === "string"
        )
        && typeof exercise.correctOptionId === "string"
        && exercise.options.some((option) => option.id === exercise.correctOptionId);
}

function createExercise(exercise, index) {
    const item = document.createElement("form");
    item.className = "exercise-item";
    item.addEventListener("submit", (event) => {
        event.preventDefault();
        checkExercise(item, exercise);
    });

    const question = document.createElement("p");
    question.textContent = `Questão ${index + 1}: ${exercise.prompt}`;
    item.appendChild(question);

    const options = document.createElement("fieldset");
    options.className = "exercise-options";
    const legend = document.createElement("legend");
    legend.textContent = "Escolha uma resposta:";
    options.appendChild(legend);

    exercise.options.forEach((option, optionIndex) => {
        const label = document.createElement("label");
        label.className = "exercise-option";
        const input = document.createElement("input");
        input.type = "radio";
        input.name = `exercise-${index}`;
        input.value = option.id;
        input.required = true;
        input.id = `exercise-${index}-option-${optionIndex}`;
        const text = document.createElement("span");
        text.textContent = option.text;
        label.append(input, text);
        options.appendChild(label);
    });
    item.appendChild(options);

    const submit = document.createElement("button");
    submit.className = "primary-btn compact";
    submit.type = "submit";
    submit.textContent = "Verificar resposta";
    item.appendChild(submit);

    const feedback = document.createElement("p");
    feedback.className = "exercise-feedback";
    feedback.setAttribute("aria-live", "polite");
    item.appendChild(feedback);
    return item;
}

function checkExercise(form, exercise) {
    const selected = form.querySelector('input[type="radio"]:checked');
    if (!selected) {
        return;
    }

    const feedback = form.querySelector(".exercise-feedback");
    const isCorrect = selected.value === exercise.correctOptionId;
    feedback.textContent = isCorrect ? "Correto!" : "Ainda não. Tente novamente.";
    feedback.classList.toggle("correct-feedback", isCorrect);
    feedback.classList.toggle("incorrect-feedback", !isCorrect);

    if (isCorrect && exercise.explanation) {
        feedback.textContent += ` ${exercise.explanation}`;
    }
}
