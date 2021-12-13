<template>
  <div class="home">
     <div class="title-container">
     <div class="title-text">
       <h1>Always the most up-to-date <span>news</span> on politics, economics, culture, sports, etc.</h1>
      
       <div class="typing-slider">
      </div>
       <router-link class="router-button"  v-if="!user" :to="{name: 'Register'}"> Register</router-link>
        <router-link class="router-button"  v-if="user" :to="{name: 'Blogs'}">News</router-link>
     </div>
     <div v-show="!mobile" class="imgTitle">
        <img class=" backgroundTitle" src="../assets/blogPhotos/home_img_bg.png" alt="">
        <img class="sun" src="../assets/blogPhotos/sun.png" alt="">
        <img class=" news" src="../assets/blogPhotos/news.png" alt="">
        <img class=" video" src="../assets/blogPhotos/home_img_video.png" alt="">
        <img class="speaker" src="../assets/blogPhotos/home_img_speaker.png" alt="">
        <img class="msg" src="../assets/blogPhotos/home_img_msg.png" alt=""> 
     </div>
    </div>
    
    <div class="home-content">
            <BlogPost  v-if="!user" :post="welcomeScreen"/>
            <div v-if="user">
             <BlogPost  :post="post"  v-for="(post, index) in blogPostsFeed" :key="index"/>
            </div>
        <div v-if="user" class="blog-card-wrap">
          <div class="container">
              <h3>View more blogs</h3>
              <div class="blog-cards">
                  <BlogCard :post="post" v-for="(post, index) in blogPostsCards" :key="index"/>
              </div>
          </div>
        </div>
        <div v-if="!user" class="updates">
        <div class="container">
        <h2>never miss a post. register for you free account</h2>
        <router-link class="router-button" :to="{name: 'Register'}"> Register for BlogApp <Arrow class="arrow arrow-light"/></router-link>
        </div>
        </div>
    </div>

          
           
  </div>

  
</template>

<script>

import BlogPost from "../components/BlogPost.vue";
import BlogCard from "../components/BlogCard.vue";
import Arrow from "../assets/Icons/arrow-right-light.svg";
export default {

  name: "Home",
  components: { BlogPost, BlogCard, Arrow },
  data() {


    return{
        mobile: null,
      welcomeScreen:{
        title: "Welcome!",
        blogPost: "Register and follow our news",
        welcomeScreen: true,
        photo:"welcome",

      },
     
  
     
    };
},
 
 methods:{
        checkScreen() {
            this.windownWidth = window.innerWidth;
            if(this.windownWidth <= 1000){
                this.mobile = true;
                return;
            }
            this.mobile = false;
            return;

        },
 },
   created(){
        window.addEventListener('resize', this.checkScreen);
        this.checkScreen();
 
    },
  computed:{
    blogPostsFeed(){
      return this.$store.getters.blogPostsFeed;
    },
    blogPostsCards(){
      return this.$store.getters.blogPostsCards;
    },
     user(){
            return this.$store.state.user;
        },
     admin(){
            return this.$store.state.admin;
        },
  }
};
</script>
<style lang="scss" scoped>
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
@keyframes opacityText {
  0% {
    opacity:0;
  }
  50% {
     opacity:0.5;
  }
  100% {
    opacity:1;
  }
}
.title-container{
     height: 800px;
     display: flex;
     text-align: center;
     align-items: center;
     justify-content: center;
       @media (max-width:1000px){
        margin: 0 auto;
    }

    .title-text{
        padding: 0 20px;

         @media (min-width:900px){
           padding: 0;
    }
        
    }

    .imgTitle{
    
     @media (max-width:1000px){
          display: none;
    }
      @media (min-width:1830px){
          display: none;
    }

    
     img{
        width:700px;
        height: 600px;
        float: right;
        
     }
      .news{
       animation: opacityText  5s  infinite;
       position: relative;
       left: -200px;
       top: -330px;
       width: 160px;
       height: 70px;
     }
      .sun{
       animation: rotate 5s  infinite;
       position: relative;
       left: -80px;
       top: -490px;
       width: 90px;
       height: 90px;
     }
     .video{
       transition: 0.5s ease all;
       position: relative;
       left: -305px;
       top: -300px; 
       width: 80px;
       height: 80px;
     }
       .speaker{
          transition: 0.5s ease all;
          top: -450px;
          right: -10px;  
          position: relative;
          width: 80px;
          height: 80px;
     }
     .msg{
          transition: 0.5s ease all;
          position: relative;
          right: -310px;
          top: -310px;
          width: 80px;
          height: 80px;
          
          
        }
            .msg:hover{
            transition: 0.5s ease all;
            transform: scale(1.2);
          }
            .speaker:hover{
            transition: 0.5s ease all;
           transform: scale(1.2);
          }
            .video:hover{
            transition: 0.5s ease all;
           transform: scale(1.2);
          }
      }    
    h1{
      font-family: 'Poppins', sans-serif;
      font-size: 40px;
      float: left;
      text-align: center;
      margin-left: 0;
       @media (min-width:800px){
          
    }
      span{
        text-transform: uppercase;
        color: #ffaa01;
      }
    }
       h3{
          display: none;
      

       @media (min-width:800px){
          display: block;
          font-family: 'Poppins', sans-serif;
          font-size: 18px;
          margin-top: 10vh;
          width: 100%;
          float: left;
    }
    }

        .router-button{
          display: inline-block;
          margin-top: 5vh;
          
          
          @media (min-width:800px){
          margin-top:5vh;
    }
        }
       

} 
 
  .home-content{
    margin: 0 auto;
    width:80%;
  }

.blog-card-wrap{
   h3{
      font-weight: 300;
      font-size: 28px;
      margin-bottom: 32px;
   }
}
.updates{
  .container{
    padding: 100px 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (min-width:800px){
      padding: 125px 25px;
      flex-direction: row;
    }
    
    .router-button{
      display: flex;
      font-size: 14px;
      text-decoration: none;
      @media(min-width: 800px){
        margin-left: auto;
      }
    }

    h2{
      font-weight: 300;
      font-size: 32px;
      width: 100%;
      text-transform: uppercase;
      text-align: center;
      @media(min-width: 800px){
        text-align: initial;
        font-size: 40px;
      }
    }
    
  }

}


</style>