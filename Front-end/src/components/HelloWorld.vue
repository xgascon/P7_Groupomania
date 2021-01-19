<template>
  <div class="container my-3">
      <div class="row">
          <div class="col-12">
              <div class="jumbotron">
                  <h1 class="text-center">
                      Bienvenue au Réseau Social de Groupomania
                  </h1>
              </div>
          </div>
      </div>

      <div class="row">
          <div class="col-12 col-lg-6">
              <div class="card shadow my-4 py-4"> 
                  <div class="card-text">
                      
                      <form class="form-group text-left mx-5">
                          <h2 class="h4 text-left text-primary inline">
                              Se connecter :                                  
                          </h2>
                          <br>
                          <br>

                          <label for="email-connexion">Adresse e-mail</label>
                          <input id="email-connexion" type="email" placeholder="email@gmail.com" class="form-control" required>  
                          <br>

                          <label for="mpasse-connexion">Mot de passe</label>
                          <input id="mpasse-connexion" type="password" placeholder="Motdepasse!1" class="form-control" required>  
                          <br>

                          <p class="card-text inline">
                              <button id="contact_button-connexion" class="btn btn-primary" type="submit">Connexion</button>
                          </p>                           
                                                      
                      </form>
                      
                  </div>
              </div>
          </div>      
          <div class="col-12 col-lg-6">
              <div class="card shadow my-4 py-4"> 
                  <div class="card-text">
                      
                      <form class="form-group text-left mx-5">
                          <h2 class="h4 text-left text-primary inline">
                              Première inscription :                                  
                          </h2>
                          <br>
                          <br>

                          <label for="firstName">Prénom</label>
                          <input id="firstName" type="text" placeholder="Pierre" class="form-control" required>     
                          <br>

                          <label for="lastName">Nom</label>
                          <input id="lastName" type="text" placeholder="Dupont" class="form-control" required>  
                          <br>

                          <label for="email-inscription">Adresse e-mail</label>
                          <input id="email-inscription" type="email" placeholder="email@gmail.com" class="form-control" required>  
                          <br>

                          <label for="mpasse-inscription">Mot de passe</label>
                          <p class="font-italic font-weight-light text-black-50">Doit contenir entre 8 et 15 caractères, des minuscules et majuscules, au moins un chiffre et un caractère spécial </p>
                          <input id="mpasse-inscription" type="password" placeholder="Motdepasse!1" class="form-control" required>  
                          <br>

                          <p class="card-text inline">
                              <button id="contact_button-inscription" class="btn btn-primary" type="submit">S'inscrire</button>
                          </p>                           
                                                      
                      </form>
                      
                  </div>
              </div>
          </div>             
      </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
