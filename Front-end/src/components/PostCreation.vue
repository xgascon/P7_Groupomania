<template>
<div class="card cardGroupomania shadow my-4 py-4"> 
    <div class="card-text">
        <button @click="cachePost('create-post')" class="btn toClick"> <h2 class="h5">Rédigez un post en cliquant ici !</h2></button>
        <div id="create-post" style="display:none">
            <form class="form-group text-left mx-5">
                <!-- Post text content -->
                <label for="postContent">Texte de votre post : </label>
                <textarea id="postContent" rows="5" v-model="postContent" type="text" placeholder="Contenu de mon post" class="form-control">     
                </textarea>
                <br>

                <!-- Post image content -->
                <label for="postImage">Image : </label>
                <p>
                <input id="postImage" type="file" @change="imageUpload" class="input"> 
                </p>

                <!-- Publication button -->
                <p class="card-text text-center inline">
                <button @click="postContentFunction" class="btn font-weight-bold toClick" type="submit">Publier mon post</button>
                </p>
            </form>   
        </div>        
    </div>              
</div>
    
</template>

<script>
import axios from 'axios'

export default {
  name: 'Post',
  props: {
    msg: String
  },
  data() { 
    return {  
    userId: parseInt(localStorage.getItem("userId")), // Needs to be parseInt for the auth process that compares UserId from the req.body and the one with the token
    boolPost: 1, 
    postContent: null,
    imageUrl: null
    }
  },
  methods : {
    // Transform image into a file
    imageUpload (event) {      
        this.imageUrl = event.target.files[0];
    },
    // Function to display and hide an element
    cachePost(id){
        console.log()
        if(this.boolPost==1){
            document.getElementById(id).style.display='initial';
            this.boolPost=0;
        } else {
            document.getElementById(id).style.display='none';
            this.boolPost=1;
        }
    },
    // Send post to API
    postContentFunction() {      
        // Create a formData to send the data with the image (in file format) 
        const formData = new FormData();
        if(this.imageUrl) {
            formData.append('image', this.imageUrl);
        }
        if(this.postContent) {
            formData.append('postContent', this.postContent);
        }
        formData.append('userId', this.userId);        
        axios.post('http://localhost:3000/api/post/', formData,
            {
                headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then((response) => {
            console.log(response)
            alert('Félicitations, votre post a été publié !');
            this.$emit('updatePost', true);
            document.getElementById('create-post').style.display='none';
            this.boolPost = 1;
            this.postContent = null;
            this.imageUrl = null;
        })
        .catch( ()=> {
            alert('Oops, une erreur est survenue');
            console.log('Une erreur est survenue');
        })
    }
  }
}
</script>