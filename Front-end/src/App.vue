<template>
  <div id="app">
    <div id="nav">
      <!-- Navigation links if userId absent from localStorage (user not connected yet) -->
      <div id="navConnected" v-if="connectStatus == 'connected'">
        <div>
          <router-link to="/groupomania">Groupomania</router-link> |
          <router-link to="/profile">Mon profil</router-link> |
          <router-link to="/"> <span @click="deconnexion()"> Se déconnecter </span> </router-link>
        </div>        
      </div>
      <!-- Navigation links if userId present in localStorage (user connected) -->
      <div id="navUnconnected" v-else>
      <router-link to="/register">S'inscrire</router-link> |
      <router-link to="/">Se connecter</router-link>
     </div> 
    </div>    
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      token: localStorage.getItem("token"),   
      connectStatus: null, 
    }
  },
  beforeMount() {
    this.connexionVerif();
  },
  methods: {
    connexionVerif() {
      if(this.token){
        this.connectStatus = 'connected';
      } else {
        this.connectStatus = 'notConnected';
      }
    },
    // Function to disconnect the user by clearing the localSorage (clearing the userId and the token)
    deconnexion() {
      localStorage.clear();
      this.$router.push({ name: "Connexion" });
      window.location.reload();
    }
  }
}
</script>

<style lang="scss">

// Definition of Sass variables
$website-color: #4c8baf;
$link-color-spec: yellow;
$separationBar-bgColor:white;
$likeReaction-color:rgb(47, 255, 47);
$dislikeReaction-color:rgb(255, 123, 129);
$cardGroupomania-bgColor: darken($website-color, 20);
// 

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  // color: #2c3e50;
  color: white;
  background: linear-gradient(135deg, $website-color 0%, #c4e0e5 100%);
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    // color: #2c3e50;
    color: white;

    &.router-link-exact-active {
      color: $link-color-spec;
      // color: #ffdb3c;
    }
  }

  .navigationItem {
    font-weight: bold;
    // color: #2c3e50;
    color: white;
  }
}

.welcomeText {
  font-weight: bold;
  text-shadow: $cardGroupomania-bgColor 1px 0 10px;
}

.toClick {
    color: white;
    &:hover {
        color: white;
        text-decoration: underline;
    }
}

.form-control {
    color: black;
    &:focus-visible {
      color: black;
    }
}

.likeReaction {
    color: $likeReaction-color;
}

.dislikeReaction {
    color: $dislikeReaction-color;
}

.cardGroupomania {
  background: linear-gradient(135deg, $cardGroupomania-bgColor 0%, lighten($cardGroupomania-bgColor, 20) 100%);  
  border-radius:40px; 
  color:white
}

.displayFlexRow{
  display:flex; 
  flex-direction:row;
}

.displayFlexSpacebetween {
  display:flex; 
  flex-direction:row; 
  justify-content:space-between;
}

.align-center {
  align-content: center;
  align-items: center;
}

.displayFlexSpacearound {
  display:flex; 
  flex-direction:row; 
  justify-content:space-around;
}

.roundedBorders {
  border-radius:500px;
}

.like-button {
  background: linear-gradient($likeReaction-color,$likeReaction-color);
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: bold;
}

.dislike-button {
  background: linear-gradient($dislikeReaction-color,$dislikeReaction-color);
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: bold;
}

.btnClicked {
  border: 3.5px inset grey;
}

.separationBar {
  background-color:$separationBar-bgColor;
}

.postImage {
  width: 100%;
  max-width: 700px;
}

.commentImage {
  width: 35%;
}

.profileImage {
  width: 250px;
}

.postModificationEnabled {
  color: white;
  font-weight: bold;
  border: white 2px solid;    
}

.displayFlexColumn{
  display: flex;
  flex-direction: column;  
  justify-content: center;
  align-items: center;
}

.displayFlexCenter {
  display:flex; 
  justify-content:center;
}

.roundedBordersLight {
  border-radius: 10px;
}

.btnBgApp {
  background-color: $cardGroupomania-bgColor;
}
.textColorApp {
  color: darken($website-color, 5)!important;
}

.input {
  white-space: normal!important;
  width: 100%;
}

@media (max-width: 780px) {

  .displayFlexSpacearoundResponsiveForProfile {
    display:flex; 
    flex-direction:column-reverse; 
    justify-content:space-around;
  }
}

@media (max-width: 500px) {

  .displayFlexSpacebetween {
    display:flex; 
    flex-direction:column; 
    justify-content:space-between;
  }

  .text-center-sm {
    text-align: center!important;
  }

  .marginButtonModifyPostResponsive {
    margin-bottom: 1rem;
  }

  .postImage {
    width: 50%;
  }
}

</style>
