<template>
    <div>
        <div :id="'comment-creation'+postId" style="display:none">
            <br>

            <label :for="'commentContent'+postId">Texte de votre commentaire : </label>
            <textarea :id="'commentContent'+postId" rows="2" v-model="commentToPublish"  type="text" placeholder="Contenu de mon commentaire" class="text-left form-control" required>  
            </textarea>
            <br>

            <label :for="'commentImage'+postId">Image : </label>
            <p>
                <input :id="'commentImage'+postId" type="file" @change="commentImageToPublishUpload" class="input">
            </p>

            <button @click="publishComment(postId)" class="btn font-italic toClick" type="submit">Publier ce commentaire</button>
            <br>

        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'CommentCreation',
    props: {
        postId: Number,        
        tableComments: Array,
        userId: Number
    },
    data() {
        return {
            commentImageToPublish: null,
            commentToPublish: null
        }
    },
    methods: {
        // Function to publish a comment sent to API
        publishComment(idPostToComment) {
            const formData = new FormData();
            if(this.commentImageToPublish) {
                formData.append('image', this.commentImageToPublish);
            }
            if(this.commentToPublish) {
                formData.append('commentContent', this.commentToPublish);
            }
            formData.append('userId', this.userId);
            axios.post('http://localhost:3000/api/comment/'+ idPostToComment, formData,
                {
                    headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                    }
                }
            )
            .then((response) => {
                console.log(response); 
                this.$emit('updateComment', true);
                this.$emit('increaseCommentNumber', this.postId);
                this.commentToPublish = null;
                this.commentImageToPublish = null;
            })
            .catch( ()=> {
                alert('Oops, une erreur est survenue');
                console.log('Une erreur est survenue');
            })
        },
        commentImageToPublishUpload (event) {      
            this.commentImageToPublish = event.target.files[0];
        }
    }
}
</script>