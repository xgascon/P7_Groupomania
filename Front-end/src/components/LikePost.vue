<template>
    <div>
        <button @click="likePost(postId, 'likeReaction')" v-if="postCurrentUserLikeChild == 1" class="roundedBorders like-button btnClicked btn">👍 {{postLikeNumberChild}}</button> 
        <button @click="likePost(postId, 'likeReaction')" v-else  class="roundedBorders like-button btn">👍 {{postLikeNumberChild}}</button>

        <button @click="likePost(postId, 'dislikeReaction')" v-if="postCurrentUserDislikeChild == 1" class="roundedBorders btnClicked dislike-button btn">👎 {{postDislikeNumberChild}}</button>
        <button @click="likePost(postId, 'dislikeReaction')" v-else class="roundedBorders dislike-button btn">👎 {{postDislikeNumberChild}}</button>
        
        <!-- Details for Likes/Dislikes button -->
        <button @click="cacheDetailsLikes('details-likes'+postId)" class="btn font-italic toClick m-2 p-0" type="submit"> {{postDislikeNumberChild + postLikeNumberChild}} réaction(s)... </button>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'LikePost',
  props: {
    userId: Number,
    postId: Number,
    postCurrentUserLike: Number,
    postCurrentUserDislike: Number,
    postLikeNumber: Number,
    postDislikeNumber: Number
  },
  data() { 
    return {  
    boolLikes: 1,
    postCurrentUserLikeChild: this.postCurrentUserLike,
    postCurrentUserDislikeChild: this.postCurrentUserDislike,
    postLikeNumberChild: this.postLikeNumber,
    postDislikeNumberChild: this.postDislikeNumber
    }
  },
  methods : {
    cacheDetailsLikes(id){
        if(this.boolLikes==1){
            document.getElementById(id).style.display='initial';
            this.boolLikes=0;
        } else {
            document.getElementById(id).style.display='none';
            this.boolLikes=1;
        }
    },
    // Function to like one post sent to API
    likePost(idPostToLike, reaction) {
    axios.post('http://localhost:3000/api/like/' + idPostToLike, 
        { 
            userId: this.userId,
            reaction: reaction
        },
        {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            }
        }      
    )
    .then((response) => {
        console.log(response);
        this.$emit('updateLike', true);
        this.$emit('updatePost',true);
      })
      .catch( ()=> {
          alert('Oops, une erreur est survenue');
          console.log('Une erreur est survenue');
      })
    }
  }
}
</script>