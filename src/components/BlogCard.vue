<template>
  <div class="blog-card">
      <div v-show="editPost" class="icons">
        <div class="icon">
          <Edit class="edit" />
          </div>
        <div @click="deletePost" class="icon">
          <Delete class="delete" />
          </div>
          
      </div>

   <img :src="post.blogCoverPhoto" alt="">
   <div @click="readingLater" class="addPost">
   </div>
   <div class="info">
      <h4>{{post.blogTitle}}</h4>
      <h5>Posted on: {{new Date(post.blogDate).toLocaleString('en-us', {dateStyle:"long"})}}</h5>
      <router-link  class="link" :to="{name: 'ViewBlog', params: {blogid: this.post.blogID}}">
          View the post <Arrow class="arrow" />
      </router-link>
   </div>
  </div>
</template>

<script>
import Arrow from "../assets/Icons/arrow-right-light.svg";
import Edit from "../assets/Icons/edit-regular.svg";
import Delete from "../assets/Icons/trash-regular.svg";
// import Plus from "../assets/Icons/plus.svg";
import db from "../firebase/firebaseInit";
export default {
    name: "blogCard",
    props: ["post"],
    components:{
       Arrow,
       Edit,
       Delete,
      //  Plus,
    },
  
    methods:{
        deletePost(){
           this.$store.dispatch("deletePost", this.post.blogID);
        },
      //   readingLater(){
      //      this.$store.dispatch("readingLater", this.post.blogID);
      //   }
           readingLater(){
                const dataBase = db.collection("blogPostsLater").doc();
                    dataBase.set({
                           IdOfblog: this.post.blogID,
                           IdOfprofile: this.$store.state.profileId,
                       });
                 this.$router.push({name: "Home"})
                  return;
           },
    },
    computed:{
       editPost(){
          return this.$store.state.editPost;
       }
    }
};
</script>

<style lang="scss" scoped>

.blog-card{
    position: relative;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    background-color: #fff;
    min-height: 420px;
    transition: .5s ease all;

    &:hover{
        transform: scale(1.1);
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
    .icons{
        display: flex;
        position: absolute;
        top: 10px;
        right: 10px;
        z-index:99;
        
        .icon{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 35px;
            height: 35px;
            border-radius: 50%;
            background-color: #fff;
            transition: .5s ease all;

            &:hover{
               background-color: #303030;

               .edit,
               .delete{
                   path{
                   fill: #fff;
                   }
               }
            }

            &:nth-child(1){
               margin-right: 8px;
            }
            .edit,
            .delete{
                 pointer-events: none; 
                 height:15px;
                 width:auto;
               }
        }
    }

    img{
       display: block;
       border-radius:  8px 8px 0 0;
       z-index: 1;
       width:100%;
       height: 200px;
       object-fit: cover;
    }
    .addPost{
      position: relative;
      text-align: right;
      top: -40px;
      z-index: 99;
       .plus{
         width: 35px;
         height: 35px;
    }

    }
    
    .info{
       display: flex;
       flex-direction: column;
       z-index:3;
       padding: 32px 16px;
       color: #000;

       h4{
          padding-bottom: 8px;
          font-size: 20px;
          font-weight: 300;
       }

       h6{
       
          font-weight: 400;
          font-size: 12px;
          padding-bottom: 16px;
       }
       .link{
          display: inline-flex;
          margin-top: auto;
          align-items: center;
          justify-content: space-between;
          font-weight: 500;
          font-size: 12px;
          padding-top: 12px;
          padding-bottom: 4px ;
          transition: .5s ease-in all;


          &:hover{
            background-color: #fff;
          }

          .arrow{
             width: 10px;
          }
       }

    }
}

</style>