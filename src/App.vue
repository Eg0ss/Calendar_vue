<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <nav v-if="!route.meta.hideNavbar" class="navbar">
    <div class="logo">Calendar.todoDev</div>

    <div class="nav-links">
      <router-link to="/homeCalendar">Calendar</router-link>
      <router-link to="/home">Todo</router-link>
      <router-link class="logout" to="/">LogOut</router-link>
    </div>
  </nav>

  <router-view />
</template>

<style>
.navbar {
  position: fixed;
  top: 0;
  width: 90%;
  padding: 20px 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;

  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
.logout {
  background: linear-gradient(45deg, #3b82f6, #9333ea);
  padding: 10px 20px;
  border-radius: 12px;
  text-decoration: none;
  color: white;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(59, 130, 246, 0.4);
}
/* LOGO */
.logo {
  font-family: 'Fredoka', sans-serif;
  font-size: 24px;
  font-weight: 600;
  background: linear-gradient(45deg, #3b82f6, #9333ea);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* LINKS */
.nav-links {
  display: flex;
  gap: 35px;
  align-items: center;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-family: 'Fredoka', sans-serif;
  font-weight: 500;
  position: relative;
  transition: all 0.3s ease;
}

/* Hover */
.nav-links a:hover {
  color: #3b82f6;
}

/* Underline animation */
.nav-links a::after {
  content: '';
  position: absolute;
  width: 0%;
  height: 3px;
  bottom: -6px;
  left: 0;
  background: linear-gradient(45deg, #3b82f6, #9333ea);
  transition: width 0.3s ease;
  border-radius: 5px;
}

.nav-links a:hover::after {
  width: 100%;
}

/* Active link */
.router-link-active {
  color: #3b82f6;
  font-weight: 600;
}
</style>
