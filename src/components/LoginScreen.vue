<template>
  <section class="login-screen">

    <h2 class="inside-title">InsideAirbnb Dashboard</h2>

    <div class="login-inner">

      <form class="login-form" @submit.prevent="tryLogin">

        <div class="form-row">
          <div class="form-icon">@</div>
          <label class="form-label" for="username">Utilizador:</label>
          <input
              id="username"
              type="text"
              v-model="username"
              class="form-input"
              placeholder="Escreva o seu nome"
              autocomplete="off"
          />
        </div>

        <div class="form-row">
          <div class="form-icon">#</div>
          <label class="form-label" for="password">Password:</label>
          <input
              id="password"
              type="password"
              v-model="password"
              class="form-input"
          />
        </div>

        <div class="form-actions">
          <button type="submit" class="btn-signin">Sign In</button>
        </div>

        <div class="form-message success" v-if="messageSuccess">{{ messageSuccess }}</div>
        <div class="form-message error" v-if="messageError">{{ messageError }}</div>
      </form>

      <div class="features-container">
        <div class="feature-item">
          <img src="@/assets/images/mala.png" alt="briefcase" class="feature-icon">
          <div class="feature-label">Book fast</div>
        </div>
        <div class="feature-item">
          <img src="@/assets/images/dinheiro.png" alt="wallet" class="feature-icon">
          <div class="feature-label">For all wages<br>and travelers</div>
        </div>
        <div class="feature-item">
          <img src="@/assets/images/cama.png" alt="bed" class="feature-icon">
          <div class="feature-label">Your comfort is<br>our top priority</div>
        </div>
      </div>

    </div>

    <footer class="signin-footer">
      <div class="signin-inner">
        <div class="signin-left-content">
          <div class="copyright">© 2025 Airbnb, Inc.</div>
        </div>

        <div class="signin-right-content">
          <img src="@/assets/images/instagram.png" alt="Instagram" class="signin-social">
          <img src="@/assets/images/facebook2.png" alt="Facebook" class="signin-social">
          <img src="@/assets/images/twitter.png" alt="X" class="signin-social">
          <img src="@/assets/images/gmail.png" alt="Gmail" class="signin-social">
        </div>
      </div>
    </footer>

  </section>
</template>

<script>
import usersRaw from '../data/users.json?raw';
import imgJose from '@/assets/images/user-jose.png';
import imgMaria from '@/assets/images/user-maria.png';
import imgAntonio from '@/assets/images/user-antonio.png';
import imgDefault from '@/assets/images/utilizador.png';

export default {
  name: 'LoginScreen',
  emits: ['login-success'],
  data() {
    return {
      username: '',
      password: '',
      messageError: '',
      messageSuccess: ''
    }
  },
  methods: {
    tryLogin() {
      this.messageError = '';
      this.messageSuccess = '';

      const typedUser = (this.username || '').trim().toLowerCase();

      if (!typedUser) {
        this.messageError = 'Por favor, escreva o nome de utilizador.';
        return;
      }

      let dados;
      try { dados = JSON.parse(usersRaw); } catch (e) { this.messageError = 'Erro crítico na base de dados.'; return; }

      // 1. VERIFICAÇÃO DE CHAVE E CONSTRUÇÃO DOS DADOS FINAIS
      if (!dados.hasOwnProperty(typedUser)) {
        this.messageError = 'Utilizador desconhecido. Tente "Jose Silva".';
        return;
      }

      if (this.password !== '123456') {
        this.messageError = 'Password incorreta.';
        return;
      }

      // 2. CONSTRUÇÃO DO OBJETO FINAL (inclui ID e Stats simuladas)
      const role = dados[typedUser];
      let avatarFinal = imgDefault;
      if (typedUser === 'jose') avatarFinal = imgJose;
      else if (typedUser === 'maria') avatarFinal = imgMaria;
      else if (typedUser === 'antonio') avatarFinal = imgAntonio;

      const userObj = {
        id: typedUser === 'jose' ? 1 : typedUser === 'maria' ? 2 : 3, // ID
        name: this.username,
        role: role,
        avatar: avatarFinal,
        email: `${typedUser}@airbnb.com`, // Email simulado
        // Estatísticas para a página de perfil
        stats: {
          searches: 28,
          comparisons: 14,
          favorites: 5
        }
      };

      this.messageSuccess = `Bem-vindo, ${userObj.name}!`;

      setTimeout(() => {
        this.$emit('login-success', userObj);
      }, 800);
    }
  }
}
</script>


<style scoped>
/* Contentor Principal */
.login-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  position: relative;
  padding-top: 120px;
  background-color: var(--bg-beige);
}

/* Título */
.inside-title {
  position: absolute;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--font-family-lato);
  color: var(--text-red);
  font-size: 38px;
  font-weight: 700;
  margin: 0;
  z-index: 1400;
}

/* Área Central (Form + Features) */
.login-inner {
  width: 100%;
  /* Reduzi o max-width para compactar tudo no centro */
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px; /* Mais espaço entre form e ícones */
}

/* Formulário */
.login-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Linhas do Formulário */
.form-row {
  display: grid;
  /* Ajustei colunas para ficarem mais equilibradas */
  grid-template-columns: 40px 100px 1fr;
  align-items: center;
  gap: 12px;
}

.form-icon {
  font-size: 32px;
  font-weight: bold;
  color: #333;
  text-align: center;
}

.form-label {
  color: var(--text-red);
  font-weight: bold;
  font-size: 18px;
  font-family: var(--font-family-lato);
  text-align: right;
}

.form-input {
  background-color: rgba(255, 230, 210, 1);
  border: none;
  padding: 12px 16px;
  border-radius: 4px;
  font-size: 16px;
  width: 100%;
  outline: none;
}

/* Botão Sign In */
.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

.btn-signin {
  background-color: var(--text-red); /* VERMELHO */
  color: #fff;
  border: none;
  padding: 10px 30px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 4px 6px rgba(0,0,0,0.2);
}

.btn-signin:hover {
  background-color: #aa1b19;
  transform: translateY(-1px);
}

/* Features (Centrados) */
.features-container {
  display: flex;
  /* Mudei de space-between para center para agrupar no meio */
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 60px; /* Espaço fixo entre os ícones */
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 120px; /* Largura fixa para alinhar texto */
}

.feature-icon {
  width: 50px;
  height: 50px;
  object-fit: contain;
  margin-bottom: 10px;
}

.feature-label {
  color: var(--text-red);
  font-size: 14px;
  line-height: 1.4;
}

/* Rodapé */
.signin-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 64px;
  background-color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  z-index: 1000;
}

.signin-inner {
  width: 100%;
  max-width: 100%; /* Permite ocupar a largura total */
  padding: 0 32px; /* Padding lateral para não colar no pixel exato */
  display: flex;
  justify-content: space-between; /* Empurra para os extremos */
  align-items: center;
}

.signin-right-content {
  display: flex;
  align-items: center;
  gap: 16px;
}

.signin-social {
  width: 24px;
  height: 24px;
  cursor: pointer;
}

/* Responsividade */
@media (max-width: 600px) {
  .form-row { grid-template-columns: 1fr; text-align: center; }
  .form-label { text-align: center; }
  .features-container { flex-direction: column; gap: 20px; }
  .signin-inner { padding: 0 16px; }
}
</style>