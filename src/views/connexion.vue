<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import bcrypt from 'bcryptjs'

const router = useRouter()

// ✅ récupérer les utilisateurs inscrits
const users = JSON.parse(localStorage.getItem('users')) || []

const email = ref('')
const password = ref('')
const incorrect = ref(false)

const connexion = async () => {
  incorrect.value = false

  // 1. chercher l'utilisateur par email
  const user = users.find((u) => u.email === email.value)

  if (!user) {
    incorrect.value = true
    return
  }

  // 2. comparer le mot de passe
  const isValid = await bcrypt.compare(password.value, user.password)

  if (!isValid) {
    incorrect.value = true
    return
  }

  // 3. sauvegarder la session (simple)
  localStorage.setItem('currentUser', JSON.stringify(user))

  // 4. redirection
  router.push('/homeCalendar')
}

const goInscription = () => {
  router.push('/inscription')
}
</script>
<template>
  <div class="auth-container">
    <div class="auth-card">

      <!-- Branding -->
      <div class="brand">
        <h1>Calendar<span>.todoDev</span></h1>
        <p>Bienvenue à nouveau 👋</p>
      </div>

      <!-- Formulaire -->
      <form @submit.prevent="connexion" class="form">

        <div class="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Votre email"
            v-model="email"
            required
          />
        </div>

        <div class="input-group">
          <label>Mot de passe</label>
          <input
            type="password"
            placeholder="Votre mot de passe"
            v-model="password"
            required
          />
        </div>

        <button class="submit-btn">Connexion</button>

        <p v-if="incorrect" class="error">
          Email ou mot de passe incorrect.
        </p>

      </form>

      <!-- Divider -->
      <div class="divider">
        <span></span>
        <p>ou</p>
        <span></span>
      </div>

      <!-- Redirect -->
      <button class="secondary-btn" @click="goInscription">
        Créer un compte
      </button>

    </div>
  </div>
</template>
<style scoped>

.auth-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #111827, #1f2937);
  font-family: 'Inter', sans-serif;
}

.auth-card {
  width: 400px;
  background: rgba(255, 255, 255, 0.05);
  padding: 40px;
  border-radius: 16px;
  backdrop-filter: blur(15px);
  box-shadow: 0 10px 40px rgba(0,0,0,0.4);
  animation: fadeIn 0.6s ease;
}

.brand {
  text-align: center;
  margin-bottom: 30px;
}

.brand h1 {
  font-size: 26px;
  font-weight: 700;
  color: white;
}

.brand h1 span {
  color: #3b82f6;
}

.brand p {
  font-size: 14px;
  color: #9ca3af;
  margin-top: 6px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.input-group {
  display: flex;
  flex-direction: column;
}

.input-group label {
  font-size: 13px;
  margin-bottom: 6px;
  color: #d1d5db;
}

.input-group input {
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #374151;
  background: #1f2937;
  color: white;
  transition: 0.3s;
}

.input-group input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59,130,246,0.3);
}

.submit-btn {
  margin-top: 10px;
  padding: 12px;
  border-radius: 8px;
  border: none;
  background: #3b82f6;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
}

.submit-btn:hover {
  background: #2563eb;
  transform: translateY(-2px);
}

.secondary-btn {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #374151;
  background: transparent;
  color: #d1d5db;
  cursor: pointer;
  transition: 0.3s;
}

.secondary-btn:hover {
  background: rgba(255,255,255,0.05);
}

.divider {
  display: flex;
  align-items: center;
  margin: 20px 0;
  gap: 10px;
}

.divider span {
  flex: 1;
  height: 1px;
  background: #374151;
}

.divider p {
  color: #6b7280;
  font-size: 13px;
}

.error {
  margin-top: 8px;
  font-size: 13px;
  color: #f87171;
  text-align: center;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

</style>