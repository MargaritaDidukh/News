<template>

  <div @mouseleave="hideContent" class="blog-wrapper" :class="{'no-user' : !user}" >
       <div @mouseover="showContent"  class="blog-photo">
             <img v-if="post.welcomeScreen" :src="require(`../assets/blogPhotos/${post.photo}.jpg`)" alt="">
             <img v-else :src="post.blogCoverPhoto" alt="">
             <h5 v-if="post.welcomeScreen" >Glad to see you</h5>
             <h5  v-else>Posted on: {{new Date(post.blogDate).toLocaleString('en-us', {dateStyle:"long"})}}</h5>
         </div>
     <div v-show="content" class="blog-content">
         <div>
         <h2 v-if="post.welcomeScreen">{{post.title}}</h2>
         <h2 v-else>{{post.blogTitle}}</h2>
         <p v-if="post.welcomeScreen">{{post.blogPost}}</p>
        
         <router-link class="link link-light" v-if="post.welcomeScreen"  :to="{name: 'Register'}">Register<Arrow class="arrow arrow-light" />
         </router-link>
        <router-link class="link " v-else :to="{name: 'ViewBlog', params: {blogid: this.post.blogID}}"> View the post<Arrow class="arrow" /> </router-link>
          
         </div>
       
     </div>
    
  </div>
</template>

<script>
import Arrow from "../assets/Icons/arrow-right-light.svg";
export default {
     name:"blogPost",
     props: ["post"],
     components:{
         Arrow,
     },
      data() {
        return{
            content:false,
        };

    },
     computed:{
        user(){
            return this.$store.state.user;
        }
    },
     methods: {
         showContent(){
               setTimeout(() =>   this.content = true, 600);
         },
          hideContent(){
             setTimeout(() =>   this.content = false, 600);
         }

     }
};
</script>

<style lang="scss" scoped>

 .blog-wrapper{
    display: flex;
    flex-direction: column;
    margin-bottom: 10%;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    @media (min-width: 700px) {
        height: 650px;
        flex-direction: row;
        
    }

    


 .blog-content{
        display: flex;  
        flex-direction: column;
        justify-content: center;
        flex: 4;
        order: 2;
        @media (min-width: 700px){
            order: 1;
        }
        @media (min-width: 800px) {
           align-items: center;
           flex: 3;
            
        }

        div{
            max-width: 375px;
            padding: 72px 24px;
            @media (min-width: 700px){
                padding: 0 24px;
            }

            h2{
                font-family: 'Poppins', sans-serif;
                font-size: 10px;
                font-weight: 300;
                color: #0162f1;
                text-transform: uppercase;
                margin-bottom: 24px;
                @media (min-width: 700px){
                    font-size: 20px;
                }
            }
             p{
                 font-size: 15px;
                 font-weight: 300;
                 line-height: 1.7;
             }

           /*  .content-preview{
                 font-size: 13px;
                 max-height: 24px;
                 width: 250px;
                 line-height: 15px;
                 white-space: nowrap;
                 overflow: hidden;
                 text-overflow: ellipsis;
             }
             */

             .link{
                 display: inline-flex;
                 align-items: center;
                 margin-top: 32px;
                 padding-bottom: 4px;
                 border-bottom: 1px solid transparent;
                transition: .5s ease-in all;


                &:hover{
                   border-bottom-color: #303030;
                }
             }
            .link-light{
                &:hover{
                    border-bottom-color: #fff;
                }
            }
        }
    }

    .blog-photo{
        order: 1;
        flex: 3;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

        @media (min-width: 700px){
            order: 2;
        }
         @media (min-width: 800px){
           flex: 4;
        }

        img{
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        h5{
            float: right;
        }
    }

}

.no-user:first-child{
  .blog-content{
    background-color: #53a4f3;
    color: #fff;
  }
} 

</style> 