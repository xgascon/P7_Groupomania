<template>
    <div class="row">     
        <div class="col-12">
            <div class="card cardGroupomania shadow my-4 py-4"> 
                <div class="card-text">                    
                    <form class="form-group text-left mx-5">
                        <h2 class="h4 text-left inline">
                            Première inscription :                    
                        </h2>
                        <br>

                        <label for="firstName">Prénom</label>
                        <input id="firstName" v-bind:style="border" v-model="firstName" type="text" placeholder="Pierre" class="form-control" required>     
                        <br>

                        <label for="lastName">Nom</label>
                        <input id="lastName" v-bind:style="border" v-model="lastName" type="text" placeholder="Dupont" class="form-control" required>  
                        <br>

                        <label for="photo-inscription">Photo de profil <span class="font-italic font-weight-light text-white-50"> Facultatif </span></label>
                        <p>
                          <input id="photo-inscription" type="file" @change="imageUpload" class="input">  
                        </p>
                        <br>

                        <label for="email-inscription">Adresse e-mail</label>
                        <input id="email-inscription" v-bind:style="border" v-model="email" type="email" placeholder="email@gmail.com" class="form-control" required>  
                        <br>

                        <label for="mpasse-inscription">Mot de passe</label>
                        <p v-if="!this.validPassword(this.password) || !this.password" class="font-italic font-weight-light text-white-50">Doit contenir entre 8 et 15 caractères, des minuscules et majuscules, au moins un chiffre et un caractère spécial </p>
                        <input id="mpasse-inscription" v-bind:style="border" v-model="password" type="password" placeholder="Motdepasse!1" class="form-control" required>  
                        <br>

                        <!-- Register button -->
                        <p class="card-text text-center inline">
                            <button @click="checkForm" id="contact_button-inscription" class="btn toClick font-weight-bold" type="submit"><div class="h4">S'inscrire</div></button>
                        </p>                        
                    </form>
                </div>
            </div>
        </div>             
    </div>
</template>

<script>
import axios from 'axios'

export default {
name: 'RegisterToApp',
    data() {
        return {
            firstName: null,
            lastName: null,
            imageUrl: 'http://localhost:3000/images/default-picture.jpg', // Set to default-picture if the user doesn't upload a profile picture
            email: null,
            password: null,
            border: null
        }       
    },
    methods: {
    // Transform image into a file
    imageUpload (event) {      
        this.imageUrl = event.target.files[0];
    },
  // Function to register
    checkForm(event) {
      event.preventDefault();
      // Check that all the form elements are completed by the user
      if (!this.firstName || !this.lastName || !this.email || !this.password) {
        alert("Veuillez renseigner tous les champs pour vous inscrire !");
        this.border= 'border: 2px solid #FF0000' 
      // Check that email typo is correct 
      } else if(!this.validEmail(this.email)) {
        alert("Veuillez renseigner un email valide !");
      // Check that password typo is correct  
      } else if(!this.validPassword(this.password)) {
        alert("Veuillez renseigner un mot de passe valide !");
      } else {
        // Create a formData to send the data with the image (in file format) 
        const formData = new FormData();
        if(this.imageUrl) {
          formData.append('image', this.imageUrl);
        }
        formData.append('firstName', this.firstName);
        formData.append('lastName', this.lastName);
        formData.append('email', this.email);
        formData.append('password', this.password);
        // Send data to API
        axios.post('http://localhost:3000/api/auth/signup', formData)
        .then((response) => {
          console.log(response)
          alert('Félicitations, vous êtes inscrit ! Connectez-vous pour accéder au réseau.');
          this.$router.push({ name: "Connexion" });
        })
        .catch( (error)=> {          
          alert('Oops une erreur est survenue.');
          console.log(error);
        })
      }
    },
    // Function to verify that email typo is correct
    validEmail: function (email) {
      var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      return re.test(email);
    },
    // Function to verify that password typo is correct
    validPassword: function (password) {
      var re = /^(?=.{8,15}$)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?\W).*$/;
      return re.test(password);
    }
  }
}
</script>