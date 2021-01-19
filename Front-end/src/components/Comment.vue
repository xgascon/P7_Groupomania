<template>
    <div class="text-left">           
        <div :id="'comment-display'+postId" style="display:none">
            <div v-for="comment in tableComments" :key="comment.id">
                <div :id="'comment-number'+comment.id" v-if="comment.postId == postId">
                    <div> 
                        <em class="displayFlexSpacebetween">
                            <em class="font-italic"> {{comment.user.firstName}} {{comment.user.lastName}} dit :  </em> 
                            <!-- Modify & Delete comment buttons for the current user -->
                            <div v-if="comment.userId == userId || role == 'admin'">
                                <button @click="cacheCommentModification('comment-modification'+comment.id); duplicateModifyComment(comment.id)" class="btn btn-warning py-0 px-0"> 🖊️ </button> 
                                <button @click="deleteComment(comment.id, comment.userId)" class="btn btn-danger mx-1 py-0 px-1"> <strong> X </strong> </button> 
                            </div>
                        </em>
                        <!-- Comment text content -->
                        <div v-if="comment.commentContent !== null" class="text-left">
                            <strong :id="'commentContent-number'+comment.id" class="font-body">{{comment.commentContent}} </strong>
                        </div>

                        <div :id="'commentMiddle-number'+comment.id" ></div>

                        <!-- Comment image content -->
                        <div v-if="comment.imageUrl !== null" class="text-left">
                            <a :id="'commentImageLink-number'+comment.id" :href="comment.imageUrl">
                                <img :id="'commentImage-number'+comment.id" :src="comment.imageUrl" class="commentImage roundedBordersLight" >
                            </a>            
                        </div>

                        <!-- Comment creation date -->
                        <em :id="'commentFooter-number'+comment.id" class="font-italic">{{comment.createdAt}}</em>                                
                    </div>                                  

                    <!-- Comment modification -->
                    <div :id="'comment-modification'+comment.id" style="display:none">
                        <br>

                        <label :for="'commentModifyContent'+comment.id">Texte de votre commentaire : </label>
                        <textarea :id="'commentModifyContent'+comment.id" rows="2" v-model="commentContentToModify"  type="text" placeholder="Contenu de mon commentaire" class="text-left form-control">  
                        </textarea>
                        <br>

                        <label :for="'commentModifyImage'+comment.id">Image : </label>
                        <p>
                            <input :id="'commentModifyImage'+comment.id" type="file" @change="commentImageToModifyUpload" class="input">
                        </p>

                        <button @click="modifyComment(comment.id, comment.userId)" class="btn btn-warning font-weight-bold font-italic" type="submit">Modifier ce commentaire</button>
                        <br>
                        <br>
                    </div>

                    <hr class="separationBar" align=left width="25%">

                </div>
            </div>
        </div>  
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Comment',
    props: {
        postId: Number,
        userId: Number,
        role: String,
        tableComments: Array,
    },
    data() {
        return {            
            boolCommentModification: 1,
            commentContentToModify: null,
            commentImageToModify: null
        }
    },
    methods: {
        cacheCommentModification (id) {
            if(this.boolCommentModification == 1){
                document.getElementById(id).style.display='initial';
                this.boolCommentModification = 0;
                this.$emit('boolCommentModification', this.boolCommentModification);
            } else {
                document.getElementById(id).style.display='none';
                this.boolCommentModification = 1;
                this.$emit('boolCommentModification', this.boolCommentModification);
            }
        },
        commentImageToModifyUpload (event) {
            this.commentImageToModify = event.target.files[0];
        },
        duplicateModifyComment (idCommentToModify) {
            if(document.getElementById('commentContent-number'+idCommentToModify)) {
                this.commentContentToModify = document.getElementById('commentContent-number'+idCommentToModify).innerHTML;
            }            
        },
        // Funtion to modify a comment sent to API
        modifyComment (idCommentToModify, UserIdCommentToModify) {
            if(confirm("Vous vous apprêtez à modifier ce commentaire. Confirmez-vous la modification ?")) {
                const formData = new FormData();
                if(this.commentContentToModify) {
                    formData.append('commentContent', this.commentContentToModify);
                }
                if(this.commentImageToModify) {
                    formData.append('image', this.commentImageToModify);
                }
                formData.append('userId', UserIdCommentToModify); /* for middleware adminVerif, to check that userId who created the comment is the same that modifies */
                axios.put('http://localhost:3000/api/comment/' + idCommentToModify, formData,
                    { 
                        headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                        }
                    }
                )
                .then((response) => {
                    console.log(response);
                    document.getElementById('comment-modification'+idCommentToModify).style.display='none'; 
                    this.boolCommentModification=1; 
                    this.$emit('updateComment', true);               
                })
                .catch( ()=> {
                    alert('Oops, une erreur est survenue');
                    console.log('Une erreur est survenue');
                })
            } 
        },
        // Function to delete a comment sent to API
        deleteComment(idCommentToDelete, userIdCommentToDelete) {
        if(confirm("Vous vous apprêtez à supprimer ce commentaire. Confirmez-vous la suppression ?")) {
            axios.delete('http://localhost:3000/api/comment/' + idCommentToDelete,            
                {
                    data: {
                        userId: userIdCommentToDelete /* for middleware adminVerif, to check that userId who created the comment is the same that deletes */
                    },
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    }
                }
            )
            .then((response) => {
                console.log(response);
                alert('Votre commentaire a bien été supprimé !');  
                this.$emit('updateComment', true);
                this.$emit('decreaseCommentNumber', this.postId);  
            })
            .catch( ()=> {
                alert('Oops, une erreur est survenue');
                console.log('Une erreur est survenue');
            }) 
        }
        }
    }
}
</script>