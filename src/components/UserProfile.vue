<template>
  <section class="user-profile-screen">
    <div class="profile-inner" v-if="userProfileData.name">

      <div class="profile-card">

        <div class="profile-header-bio">
          <div class="avatar-wrapper">
            <img :src="user.avatar" :alt="user.name" class="profile-avatar">
          </div>
          <div class="header-text-info">
            <h1 class="user-name">{{ userProfileData.name }}</h1>
            <p class="user-role">{{ userProfileData.profession }}</p>
          </div>
        </div>

        <div class="profile-content-grid">

          <div class="col-details">
            <h3 class="section-title">Dados Pessoais e Contexto</h3>
            <div class="meta-block">
              <p><strong>ID Utilizador:</strong> #{{ user.id }}</p>
              <p><strong>Idade:</strong> {{ userProfileData.age }} anos</p>
              <p><strong>Localidade:</strong> {{ userProfileData.localidade }}</p>
              <p><strong>Situação Familiar:</strong> {{ userProfileData.situacao }}</p>
              <p><strong>Educação:</strong> {{ userProfileData.education }}</p>
              <p class="email-line"><strong>Email:</strong> {{ user.email }}</p>
            </div>

            <h3 class="section-title mt-4">Contexto Profissional</h3>
            <p class="context-text">{{ userProfileData.contexto }}</p>
          </div>

          <div class="col-stats">
            <h3 class="section-title">Competências Técnicas</h3>
            <ul class="skills-list" v-if="userProfileData.competencias">
              <li v-for="(skill, index) in userProfileData.competencias.split(',')" :key="index">
                {{ skill.trim() }}
              </li>
            </ul>

            <h3 class="section-title mt-4 centered-title">Estatísticas de Atividade</h3>
            <div class="stats-grid">
              <div class="stat-box">
                <span class="stat-value">{{ user.stats.searches }}</span>
                <span class="stat-label">Buscas</span>
              </div>
              <div class="stat-box">
                <span class="stat-value">{{ user.stats.comparisons }}</span>
                <span class="stat-label">Comparações</span>
              </div>
              <div class="stat-box">
                <span class="stat-value">{{ user.stats.favorites }}</span>
                <span class="stat-label">Favoritos</span>
              </div>
            </div>

            <h3 class="section-title mt-4 centered-title">Gestão da Conta</h3>
            <div class="actions-group-management">
              <button class="btn-action" @click="handleAction('email')">Alterar Email</button>
              <button class="btn-action" @click="handleAction('password')">Alterar Password</button>
              <button class="btn-action" @click="handleAction('delete')">Excluir Conta</button>
            </div>
          </div>
        </div>

        <div class="actions-panel logout-panel">
          <button class="btn-action" @click="$emit('logout')">Sair da Conta</button>
          <button class="btn-action" @click="$emit('go-home')">Voltar ao Menu</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
const fullBioMap = {
  'jose': { id: 1, age: 35, profession: "Investigador", education: "Doutoramento", localidade: "Porto", situacao: "Solteiro", contexto: "Investigação académica", competencias: "Excel, SPSS, Python", stats: { searches: 28, comparisons: 14, favorites: 5 }, name: 'José Silva' },
  'maria': { id: 2, age: 43, profession: "Vereadora", education: "Mestrado", localidade: "Lisboa", situacao: "Casada", contexto: "Gestão urbanística", competencias: "Power BI, SIG", stats: { searches: 45, comparisons: 20, favorites: 12 }, name: 'Maria Santos' },
  'antonio': { id: 3, age: 24, profession: "Estudante", education: "Licenciatura", localidade: "Braga", situacao: "Partilhado", contexto: "Associação Habitação", competencias: "Redes Sociais", stats: { searches: 15, comparisons: 8, favorites: 2 }, name: 'António Costa' }
};

export default {
  name: 'UserProfile',
  emits: ['go-home', 'logout'],
  props: ['user'],
  computed: {
    userProfileData() {
      if(!this.user) return {};
      const key = (this.user.name || '').trim().toLowerCase().split(' ')[0];
      return Object.assign({}, this.user, fullBioMap[key] || fullBioMap['jose']);
    }
  },
  methods: {
    handleAction(actionType) {
      if (actionType === 'delete') {
        if(confirm('Tem a certeza?')) this.$emit('logout');
      } else {
        alert(`Ação solicitada: ${actionType}`);
      }
    }
  }
}
</script>

<style scoped>
/* REMOVIDO CSS DA BARRA LATERAL */

.user-profile-screen {
  display: flex;
  height: 100%;
  align-items: flex-start;
  justify-content: center;
  background-color: var(--bg-beige);
  padding: 40px 20px 80px 20px;
}
.profile-inner { width: 100%; max-width: 1000px; margin: 0 auto; }
.profile-card { padding: 0; text-align: center; }

/* Header */
.profile-header-bio { display: flex; flex-direction: column; align-items: center; gap: 8px; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 1px solid #eee; }
.avatar-wrapper { width: 130px; height: 130px; border-radius: 50%; overflow: hidden; border: 4px solid var(--text-red); margin-bottom: 10px; background: #fff; }
.profile-avatar { width: 100%; height: 100%; object-fit: cover; }
.user-name { font-family: var(--font-family-lato); font-size: 36px; font-weight: 800; color: var(--text-dark); margin: 0; }
.user-role { font-size: 18px; color: var(--text-red); font-weight: bold; margin: 5px 0 0; }

/* Grid */
.profile-content-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 50px; text-align: left; }
.section-title { font-family: var(--font-family-lato); color: var(--text-red); font-size: 20px; font-weight: 700; margin-bottom: 15px; padding-bottom: 5px; border-bottom: 2px solid rgba(197,34,31,0.1); }
.centered-title { text-align: center; border-bottom: none; margin-top: 30px; }
.col-stats .section-title.mt-4 { text-align: center; }

/* Meta */
.meta-block p { font-size: 15px; margin: 8px 0; color: #333; }
.context-text { font-size: 15px; color: #444; line-height: 1.6; text-align: justify; }
.skills-list { list-style: disc; padding-left: 20px; margin-bottom: 30px; }

/* Stats */
.stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 32px; }
.stat-box { background: #fff; border: 1px solid #e0e0e0; border-radius: 10px; padding: 12px 5px; text-align: center; }
.stat-value { font-size: 22px; font-weight: 900; color: var(--text-red); }
.stat-label { font-size: 11px; font-weight: 600; text-transform: uppercase; color: #666; }

/* Botões */
.actions-group-management { display: flex; justify-content: center; gap: 12px; }
.btn-action { background: #fff; border: 2px solid var(--text-red); color: var(--text-red); padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 13px; transition: all 0.2s; }
.btn-action:hover { background: var(--text-red); color: white; }
.logout-panel { display: flex; justify-content: center; margin-top: 50px; gap: 15px; padding-top: 20px; border-top: 1px solid #ddd; }
</style>