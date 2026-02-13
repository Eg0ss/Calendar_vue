<script setup>
import bcrypt from 'bcryptjs'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const nom = ref('')
const prenom = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const users = [
  {
    id: 1,
    nom: 'TOSSA',
    prénom: 'Steven Romain',
    email: 'stevenromain28@gmail.com',
    password: 123456,
    status: 'actif',
  },
]

async function connected() {
  if (password.value !== confirmPassword.value) {
    alert('Les mots de passe ne correspondent pas')
    return
  }

  // ✅ PAS DE .value ICI
  const existe = users.find((user) => user.email === email.value)

  if (existe) {
    alert('Cet email existe déjà')
    return
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password.value, salt)

  const newUser = {
    id: Date.now(),
    nom: nom.value,
    prenom: prenom.value,
    email: email.value,
    password: hashedPassword,
    status: 'actif',
  }

  users.push(newUser)
  console.log(users)

  // ✅ stockage correct
  localStorage.setItem('users', JSON.stringify(users))

  alert('Inscription réussie 🎉')
  router.push('/')
}
</script>

<template>
  <div class="auth-container">
    <div class="auth-card">

      <!-- Logo / Titre -->
      <div class="brand">
        <h1>Calendar<span>.todoDev</span></h1>
        <p>Organisez vos journées intelligemment</p>
      </div>

      <!-- Formulaire -->
      <form @submit.prevent="connected" class="form">

        <div class="input-group">
          <label>Nom</label>
          <input type="text" placeholder="Nom (facultatif)" v-model="nom" />
        </div>

        <div class="input-group">
          <label>Prénoms</label>
          <input type="text" placeholder="Votre prénom" v-model="prenom" required />
        </div>

        <div class="input-group">
          <label>Email</label>
          <input type="email" placeholder="Votre email" v-model="email" required />
        </div>

        <div class="input-group">
          <label>Mot de passe</label>
          <input type="password" placeholder="Votre mot de passe" v-model="password" required />
        </div>

        <div class="input-group">
          <label>Confirmer le mot de passe</label>
          <input type="password" placeholder="Confirmer le mot de passe" v-model="confirmPassword" required />
        </div>

        <button class="submit-btn">Créer un compte</button>

      </form>

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
  width: 420px;
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
  font-size: 28px;
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

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

</style>