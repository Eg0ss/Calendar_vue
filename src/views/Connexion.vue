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
  router.push('/home')
}

const goInscription = () => {
  router.push('/inscription')
}
</script>
<template>
  <div id="Connect">
    <div id="formulaire">
      <h1>Connectez-vous ici</h1>
      <form action="" @submit.prevent>
        <div class="label">
          <label for="email">Email</label>
          <input type="email" placeholder="Mettez votre email" v-model="email" />
        </div>
        <div class="label">
          <label for="">Mot de passe</label>
          <input type="password" placeholder="Your password" v-model="password" />
        </div>
      </form>
    </div>
    <div id="submitter">
      <button @click="connexion" id="redirect">Connexion</button>
      <p>Ou</p>
      <button @click="goInscription" id="inscription">Inscription</button>
    </div>
    <div id="alert">
      <p v-if="incorrect">
        Email ou mot de passe incorrect!!! Incrivez vous si vous n'avez pas de compte
      </p>
    </div>
  </div>
</template>
<style scoped>

#Connect {
  width: 400px;
  margin: auto;
  padding: 30px;
  margin-top: 12%;
  box-shadow:
    rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
}
.label {
  display: flex;
  flex-direction: column;
}
#formulaire {
  margin: auto;
}
form {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
input {
  width: 90%;
  height: 30px;
  border: 1px solid;
  border-radius: 5px;
  border-color: rgba(128, 0, 128, 0.616);
}
#submitter {
  margin-block: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
#submitter button {
  width: 80%;
  height: 30px;
}
#inscription {
  background-color: rgba(128, 0, 128, 0.616);
  border-color: rgba(128, 0, 128, 0.616);
}
#redirect {
  background-color: rgba(0, 128, 0, 0.39);
  border-color: rgba(0, 128, 0, 0.39);
}
#alert {
  width: 80%;
  color: red;
}

</style>