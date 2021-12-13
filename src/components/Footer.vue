<template>
  <footer>
      <div class="container">
          <div class="left">
              <div class="col-1">
                  <router-link class="header" :to="{name:'Home'}">News</router-link>
                  <ul>
                      <li>
                      <a href="#"><youTube class="svg-icon" /></a>
                      </li>
                      <li>
                       <a href="#"><instagram class="svg-icon" /></a>
                      </li>
                      <li>
                       <a href="#"><linkedin class="svg-icon" /></a>
                      </li>
                  
                  </ul>
              </div>
              <div class="col-2">
                  <ul>
                       <router-link class="link" :to="{name:'Home'}">Home</router-link>
                       <router-link v-if="user" class="link" :to="{name:'Blogs'}">News</router-link>
                       <router-link v-if="admin" class="link" :to="{name:'CreatePost'}">Create Post</router-link>
                       <router-link v-if="!user" class="link" :to="{name: 'Login'}">Log in</router-link>
                       <router-link v-if="!user" class="link" :to="{name: 'Register'}"> Sign up</router-link>
                      
                  
                  </ul>
              </div>
          
          </div>
          <div class="right">
        <img src="../assets/blogPhotos/footerPhoto.png" alt="">
          <p>copyright 2021</p>
          </div>
    
      </div>
  
  
  </footer>
</template>

<script>
import youTube from "../assets/Icons/youtube-brands.svg";
import instagram from "../assets/Icons/instagram-brands.svg";
import linkedin from "../assets/Icons/linkedin-brands.svg";

export default {
    name: "footer-vue",
    components:{
        youTube,
        instagram,
        linkedin
    },
    computed:{
        user(){
            return this.$store.state.user;
        },
        admin(){
            return this.$store.state.admin;
        },
    },
};
</script>

<style lang="scss" scoped>
footer{
    margin-top: auto;
    padding: 100px 25px;
    background-color: #0162f1;
    .container {
        display: flex;
        flex-direction: column;
        gap: 32px;
        @media (min-width: 800px){
            flex-direction: row;
            gap: 0;
        } 
     >div{
     display: flex;
     flex: 1;
     }
     .left{
       gap: 32px;
       color: #fff;
       display: flex;
       flex-direction: column;
       align-items: center;
       @media (min-width: 800px){
           flex-direction: row;
           align-items: center;
           gap: 0;
       }
       .header{
           text-align: center;
           font-size: 24px;
           color: #fff;
           text-decoration: none;
           font-weight: 600;
           @media (min-width: 800px){
               text-align: initial;
           }

       }
       ul{
           gap: 16px;
           list-style: none;
           display: flex;
       }

       .col-1,
       .col-2{
          gap:32px;
          display: flex;
          flex: 1;
          @media (min-width: 800px){
             gap: 0;
          }
       }

       .col-1{
           flex-direction: column;

           h2{
               text-align: center;
               @media (min-width: 800px){
                   text-align: initial;

               }
           }

           ul{
           margin-top: auto;

             li{
                 display: flex;
                 align-items: center;
                 .svg-icon{
                      width: 24px;
                      height: auto;
                      color: #fff;
                 }
             }
           }
       }

       .col-2{
           ul{
               height: 100%;
               justify-content: center;
               flex-direction: row;
               flex-wrap: wrap;
               @media (min-width: 800px){
                  flex-direction: column;
               }

               .link{
                   font-size: 16px;
                   font-weight:500;
                   color: #fff;
                   text-decoration: none;
               }
           }
       }

     }
     .right{
         gap: 32px;
         color: #000;
         background-color: #fff;
         border-radius:10px 100px / 120px;
         align-items: center;
         flex-direction: column;
         
         @media (min-width: 800px){
            align-items: flex-end;
            gap: 0;
            max-width: 220px;
         }
         img{
             width:40%;
             
              @media (min-width:800px){
               padding: 50px;
               width:200px;
          }
         }
      }
      p{
          margin-top: auto;
          padding: 10px 0;

          @media (min-width:800px){
               padding: 0 50px 10px 0px;
          }
      }
    }
}

</style>