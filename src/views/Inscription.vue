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
  <div id="Connect">
    <div id="formulaire">
      <form action="" @submit.prevent="connected">
        <div class="label">
          <label for="Nom">Nom</label>
          <input type="text" placeholder="Entrer votre nom (facultatif)" v-model="nom" required />
        </div>
        <div class="label">
          <label for="Prénoms">Prénoms (s)</label>
          <input type="text" placeholder="Entrer votre prénom" v-model="prenom" required />
        </div>
        <div class="label">
          <label for="email">Email</label>
          <input type="email" placeholder="Mettez votre email" v-model="email" required />
        </div>
        <div class="label">
          <label for="">Entrer Mot de passe</label>
          <input type="password" placeholder="Your password" v-model="password" required />
        </div>
        <div class="label">
          <label for="">Confirmer votre mot passe</label>
          <input type="password" placeholder="Your password" v-model="confirmPassword" required />
        </div>
        <button id="inscription">Connectez-vous</button>
      </form>
    </div>
    <!-- <div id="submitter">
      <button @click="$router.back()">Retour</button>
    </div> -->
  </div>
</template>
<style scoped>
#Connect {
  width: 400px;
  margin: auto;
  margin-top: 10%;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
  padding: 25px;
}

#formulaire {
  margin-left: 20px;
}
.label {
  display: flex;
  flex-direction: column;
}
form {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
input {
  width: 80%;
  height: 30px;
}
button {
  width: 80%;
  height: 30px;
}
#submitter {
  margin-block: 10px;
  width: 80%;
  display: flex;
  justify-content: space-between;
}
#inscription {
  color: white;
  height: 30px;
  background-color: rgba(128, 0, 128, 0.616);
  border-color: rgba(128, 0, 128, 0.616);
}
</style>