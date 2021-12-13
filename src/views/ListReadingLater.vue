<template>
  <div class="blog-card-wrap">
        <div class="blog-cards container">
         <BlogCard :post="post" v-for="(post, index) in blogPosts" :key="index"/>
        </div>
  </div>
</template>

<script>
import BlogCard from "../components/BlogCard.vue";
 
export default {
 name:"listReadingLater",

  components: {BlogCard},
   computed:{
        blogPosts(){
           for(let i= 0; i < 6; i++){
             console.log(this.$store.state.IdOfprofile);
          
           }
           console.log(this.$store.state.profileId);
          console.log(this.IdOfprofile);
          return this.$store.state.blogPosts;
           
          
        },
        // blogPostsLater(){
        //  if(blogTitle == "92T7VgU95cRYshzokdwM"){
        //    return this.$store.state.blogPosts;
        //  }else{
        //    return 1;
        //  }
        // },

   }
}
</script>

<style>

</style>