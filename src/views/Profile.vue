<template>
  <div class="profile">
   <Modal v-if="modalActive" :modalMessage ="modalMessage" v-on:close-modal="closeModal" />
   <div  v-show="user" class="container">
       <div class="profile-info">
           <div class="initials">{{$store.state.ProfileInitials}}</div>
           <div class="input">
               <label for="firstName">First Name: </label>
               <input type="text" id="firstName" v-model="firstName" />
           </div>
            <div class="input">
               <label for="lastName">Last Name: </label>
               <input type="text" id="lastName" v-model="lastName" />
           </div>
            <div class="input">
               <label for="username">Username: </label>
               <input type="text" id="username" v-model="username" />
           </div>
            <div class="input">
               <label for="email">Email: </label>
               <input disabled type="text" id="email" v-model="email" />
           </div>
           <button @click="updateProfile">Save</button>
       </div>
   </div>
    <div v-show="!user">
        <router-link class="router-button" :to="{name: 'Home'}">Home</router-link>
  </div>
  </div>
 
 
</template>

<script>
import Modal from "../components/Modal.vue";

export default {
    name:"Profile",
    components: {  
      Modal,
     
  },
  data(){

      return{
          modalMessage:"Changes were saved",
          modalActive:null,
      };
  },
  methods:{
       updateProfile(){
         this.$store.dispatch("updateUserSettings");
         this.modalActive = !this.modalActive;

       },
       closeModal(){
        this.modalActive = !this.modalActive;
      },

  },
  computed:{
    user(){
    return this.$store.state.user;
        },
    firstName:{
      get(){
        return this.$store.state.profileFirstName;
      },
      set(payload){
        this.$store.commit("changeFirstName", payload);

      },
    },
    lastName:{
      get(){
        return this.$store.state.profileLastName;
      },
      set(payload){
        this.$store.commit("changeLastName", payload);

      },
    },
    username:{
      get(){
        return this.$store.state.profileUsername;
      },
      set(payload){
        this.$store.commit("changeUsername", payload);

      },
    },
    email(){
      return this.$store.state.profileEmail;
    },

  },

     

};
</script>

<style lang="scss" scoped>

.profile{
 background: no-repeat center/100% url("../assets/blogPhotos/bg.jpg"); 
 background-size: cover;

/*  background: #370CC0;
  background: linear-gradient(#c8e6ff, #0d5dbc); */
  font-family: "Lato", sans-serif;
  font-size: 18px;

   .container{
      max-width: 1000px;
      padding: 60px 25px;

      h2{
        text-align: center;
        margin-bottom: 16px;
        font-weight: 300;
        font-size: 32px;
      }
      .profile-info{
         border-radius: 8px;
         box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
         padding: 32px;
         display: flex;
         flex-direction: column;
         max-width: 600px;
         margin: 32px auto;

         .initials{
           position: initial;
           width: 80px;
           height: 80px;
           font-size: 32px;
           background-color: #370CC0;
           color: #fff;
           display: flex;
           align-self: center;
           align-items: center;
           justify-content: center;
           border-radius: 50%;
         }

       
         .input{
           margin: 16px 0;
         
         
           label{
             font-size: 14px;
             display: block;
             padding-bottom: 6px;  
           }
           input{
             width: 100%;
             border: none;
             padding: 8px;
             height: 50px;
             @media(min-width:900px){
               
             }

             &:focus{
               outline: none;
             }
           }
         }

         button{
           align-self: center;
           border-color:  #370CC0;
         }
         
      }
   }
}

</style>