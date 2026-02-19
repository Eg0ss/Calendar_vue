<script setup>

</script>


<template>
  <section class="home">
    <div class="hero">
      <div class="hero-content">
        <h1>Organise ton temps. <br />Domine ta semaine.</h1>
        <p>
          Une application moderne pour planifier tes tâches,
          suivre tes objectifs et rester productif chaque jour.
        </p>

        <div class="hero-buttons">
          <router-link to="/homeCalendar" class="btn-primary">
            Ouvrir le Calendar
          </router-link>
          <router-link to="/home" class="btn-secondary">
            Voir Todo
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>



<style scoped>
.home {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
   /* padding-top: 100px; */
}

/* ===== HERO BACKGROUND ===== */
.hero {
  width: 100%;
  min-height: 100vh;
  background-image: url("https://images.unsplash.com/photo-1492724441997-5dc865305da7");
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 100px;
}

/* Overlay dark modern */
.hero::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    120deg,
    rgba(15, 23, 42, 0.8),
    rgba(59, 130, 246, 0.6)
  );
}

/* ===== CONTENT ===== */
.hero-content {
  position: relative;
  max-width: 600px;
  color: white;
  animation: fadeUp 1s ease;
}

/* TITLE */
.hero-content h1 {
  font-family: 'Fredoka', sans-serif;
  font-size: 56px;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 20px;
}

/* TEXT */
.hero-content p {
  font-size: 18px;
  margin-bottom: 35px;
  opacity: 0.9;
}

/* BUTTONS */
.hero-buttons {
  display: flex;
  gap: 20px;
}

.btn-primary {
  background: linear-gradient(45deg, #3b82f6, #9333ea);
  padding: 15px 25px;
  border-radius: 12px;
  text-decoration: none;
  color: white;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(59, 130, 246, 0.4);
}

.btn-primary:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 40px rgba(59, 130, 246, 0.6);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  padding: 15px 25px;
  border-radius: 12px;
  text-decoration: none;
  color: white;
  font-weight: 600;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-4px);
}

/* ===== ANIMATION ===== */
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}


</style>