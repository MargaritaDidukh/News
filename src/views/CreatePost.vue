<template>
  <div class="create-post">
  <BlogCoverPreview v-show="this.$store.state.blogPhotoPreview" />
  <Loading v-show="loading" />
      <div class="container">
          <div :class="{invisible: !error}" class="err-message">
              <p><span>Error:</span> {{this.errorMsg}}</p>
          </div>
          <div class="blog-info">
              <input type="text" placeholder="YOUR TITLE" v-model="blogTitle" />
              <h3>Selection of titles scroll to the right →</h3>
              <div class="list-title">
                <div class="list-title__item" @click="requestButton"> {{titleOne}}</div>
                <div class="list-title__item" @click="requestButton">{{titleTwo}}</div>
                <div class="list-title__item" @click="requestButton">{{titleTree}}</div>
                <div class="list-title__item" @click="requestButton">{{titleFour}}</div>
                <div class="list-title__item" @click="requestButton">{{titleOne}}</div>
                <div class="list-title__item" @click="requestButton">{{titleTwo}}</div>
                <div class="list-title__item" @click="requestButton">{{titleTree}}</div>
                <div class="list-title__item" @click="requestButton">{{titleFour}}</div>
                 <div class="list-title__item" @click="requestButton">{{titleOne}}</div>
                <div class="list-title__item" @click="requestButton">{{titleTwo}}</div>
                <div class="list-title__item" @click="requestButton">{{titleTree}}</div>
                <div class="list-title__item" @click="requestButton">{{titleFour}}</div>
              </div>
              <div class="upload-file">
                  <label for="blog-photo">Upload Cover Photo</label>
                  <input type="file" ref="blogPhoto" id="blog-photo" @change="fileChange" accept=".png, .jpg, ,jpeg" />
                  <button @click="openPreview" class="preview" :class="{'button-inactive' : !this.$store.state.blogPhotoFileURL}">Preview photo</button>
                  <span>File Chosen: {{this.$store.state.blogPhotoName}}</span>
              </div>
          </div>
          <div class="editor">
              <vue-editor  :editorOptions="editorSettings" v-model="blogHTML" placeholder="Write here..." useCustomImageHandler  @image-added="imageHandler"/>
          </div>
          <div class="blog-options">
              <button @click="uploadBlog">Publish Blog</button>
              <router-link class="router-button" :to="{name: 'BlogPreview'}">Post Preview</router-link>
          </div>
      </div>
  </div>
</template>

<script>
import BlogCoverPreview from "../components/BlogCoverPreview.vue";
import Quill from "quill";
import Loading  from "../components/Loading.vue";
import firebase from "firebase/app";
import "firebase/storage";
import db from "../firebase/firebaseInit";


window.Quill = Quill;
const ImageResize = require("quill-image-resize-module").default;
Quill.register("modules/imageResize", ImageResize);

export default {
   name: "CreatePost",
   data(){
       return{
           file: null,
           error: null,
           loading:null,
           errorMsg:null,
           titleOne:"Nobody expected this!",
           titleTwo:"Incredible events of the week!!!",
           titleTree:"! News of the day !",
           titleFour:"Sensation of the day",
           editorSettings: {
               modules: {
                   imageResize: {},
               },
           },
       };
   },
   components:{
       BlogCoverPreview,
       Loading,
   },
   methods:{
        requestButton(e) {
            const buttonValue = e.target.innerHTML;
            this.blogTitle = buttonValue;
     
       },
       fileChange(){
           this.file = this.$refs.blogPhoto.files[0];
           const fileName = this.file.name;
           this.$store.commit("fileNameChange", fileName);
          this.$store.commit("createFileURL", URL.createObjectURL(this.file));
       },
       openPreview(){
           this.$store.commit("openPhotoPreview");
       },
       imageHandler(file, Editor, cursorLocation, resetUploader){
           const storageRef = firebase.storage().ref();
           const docRef = storageRef.child(`documents/blogPostPhotos/${file.name}`);
           docRef.put(file).on("state_changed", (snapshot)=>{
               console.log(snapshot);
           }, (err) =>{
               console.log(err)
           }, async () =>{
               const downloadURL = await docRef.getDownloadURL();
               Editor.insertEmbed(cursorLocation, "image", downloadURL);
               resetUploader();
           }
           );
       },
       uploadBlog(){
           if(this.blogTitle.length !== 0 && this.blogHTML.length !==0){
               if(this.file){
                   this.loading = true;
                   const storageRef = firebase.storage().ref();
                   const docRef = storageRef.child(`documents/BlogCoverPhoto/${this.$store.state.blogPhotoName}`);
                   docRef.put(this.file).on("state_changed", (snapshot) =>{
                      console.log(snapshot);
                   }, (err) =>{
                       console.log(err);
                         this.loading = false;
                   }, async () =>{
                       const downloadURL = await docRef.getDownloadURL();
                       const timestamp = await Date.now();
                       const dataBase = await db.collection("blogPosts").doc();

                       await dataBase.set({
                           blogID: dataBase.id,
                           blogHTML: this.blogHTML,
                           blogCoverPhotoName: this.blogCoverPhotoName,
                           blogCoverPhoto: downloadURL,
                           blogTitle:this.blogTitle,
                           profileId: this.profileId,
                           date: timestamp,
                        //    userInterest: firebase.firestore.FieldValue.arrayUnion(""),
                       });
                       await this.$store.dispatch("getPost");
                        this.loading = false;
                       this.$router.push({name:"ViewBlog", params: {blogid: dataBase.id}});
                   }
                   
                   );
                   return;
               }
                    this.error = true;
                    this.errorMsg = "Please photo";
                    setTimeout(() =>{
                        this.error = false;
                    }, 5000);
                        return;
           }
           this.error = true;
           this.errorMsg = "Please title & post!";
           setTimeout(() =>{
               this.error = false;
           }, 5000);
            return;
       },
   },
   computed:{
       profileId(){
           return this.$store.state.profileId;
       },
       blogCoverPhotoName(){
           return this.$store.state.blogPhotoName;
       },
       blogTitle:{
           get(){
               return this.$store.state.blogTitle;
           },
           set(payload){
               this.$store.commit("updateBlogTitle", payload);

           },
       },
        blogHTML:{
           get(){
               return this.$store.state.blogHTML;
           },
           set(payload){
               this.$store.commit("newBlogPost", payload);

           },
       },
   },
};
</script>

<style lang="scss">
.create-post{
    position: relative;
    height: 100%;
    margin-top: 90px;

    button{
        margin-top: 0;

    }
    .router-button{
        text-decoration: none;
        color: #fff;

    }

  label,
  button,
  .router-button{
      transition: 0.5s ease-in-out all;
      align-self: center;
      font-size: 14px;
      cursor: pointer;
      border-radius: 20px;
      padding: 12px 24px;
      color: #fff;
      background-color: #0d5dbc;
      text-decoration: none;

      &:hover{
          background-color: #53a4f3;
      }
  }
  .container{
      position: relative;
      height: 100%;
      padding: 10px 25px 60px;

  }

  .invisible{
      opacity: 0 !important;
  }
  .err-message{
      width: 100%;
      padding: 12px;
      border-radius: 8px;
      color: #fff;
      margin-bottom: 10px;
      background-color: #303030;
      opacity: 1;
      transition: 0.5s ease all;
      p{
          font-size: 14px;
      }
      span{
          font-weight: 600;
      }
  }

  .blog-info{
      display: flex;
      flex-direction: column;
      margin-bottom: 32px;

      input:nth-child(1){
          min-width: 300px;
          text-align: center;
      }
      input{
          transition:  .5s ease-in-out all;
          padding: 10px 4px;
          border: none;
          border: 1px solid #ffaa01;
          border-radius: 20px;
          margin-bottom: 20px;

          &:focus{
              outline: none;
              
          }
       
      }
         .list-title{
            margin-top: 10px;
            display: flex;
            overflow-x: scroll;
            padding: 20px 0;
           
     
               .list-title__item{
                    flex: 1;
                    background-color: #fac355 ;
                    color: #fff;
                    margin-right: 20px;
                    border-radius: 20px;
                    padding: 10px 24px;
                    height: 40px;
                    min-width: 300px;
                    text-align: center;

                       &:hover{
                        background-color: #ffe46b;
                        
                    }
                }
                .list-title__item:nth-child(odd){
                    background-color: #0d5dbc;

                    
                    &:hover{
                        background-color: #53a4f3;
                        
                    }
                }
              
            }
          
      .upload-file{
          margin-top: 2%;
          position: relative;
          flex: 1;
          display: flex;
         

          input{
              display: none;
          }
          .preview{
              margin-left: 16px;
              text-transform: initial;
          }
          span{
              font-size: 12px;
              margin-left: 16px;
              align-self: center;

          }
      }
  }
  .editor{
      height: 60vh;
      display: flex;
      flex-direction: column;

      .quillWrapper{
          position: relative;
          display: flex;
          flex-direction: column;
          height: 100%;

      }
    .ql-container{
          display: flex;
          height: 100%;
          overflow: scroll;
          flex-direction: column;
      }
  }
  .blog-options{
      margin-top: 32px;

      button{
          margin-right: 16px;
      }
  }
}

</style>