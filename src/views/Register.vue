<template>
   <div class="form-wrap">
  <form action="register">
     <p class="login-register"> Already have an account
      <router-link class="router-link" :to="{name:'Login'}">Login</router-link>
     </p>
    <h2>Register</h2>
    <div class="inputs">
        <div class="input">
           <input class="inputElem" @focus="focused" type="text" placeholder="First Name" v-model="firstName">
           <user class="icon"/>
      </div>
          <div class="input">
           <input class="inputElem" type="text" @focus="focused" placeholder="Last Name" v-model="lastName">
           <user class="icon"/>
      </div>
          <div class="input">
           <input class="inputElem" type="text" @focus="focused" placeholder="Username" v-model="username">
           <user class="icon"/>
      </div>
       <div class="input">
           <input class="inputElem" type="text" @focus="focused" placeholder="Email" v-model="email">
           <email class="icon"/>
      </div>
        <div class="input">
           <input class="inputElem" :type="type" @focus="focused" placeholder="Password" v-model="password">
           <eye @click="showPassword" class="icon"/>
      </div>
      <div v-show="error" class="error">{{this.errorMsg}}</div>
    </div>
   
    <button @click.prevent="register">Sign Up</button>
  
  </form>
  <div class="background"></div>

  </div>
</template>

<script>
import email from "../assets/Icons/envelope-regular.svg";

import user from "../assets/Icons/user-alt-light.svg";
import eye from "../assets/Icons/eye.svg";
import firebase from "firebase/app";
import "firebase/auth";
import db from "../firebase/firebaseInit";
export default {
  name:"Register",
  components:{
      email,
      user,
      eye,
  },
  data(){
      return{
          firstName: "",
          lastName:"",
          username: "",
          admin:"",
          email: "",
          password: "",
          error:null,
          errorMsg: "",
          type: 'password',
          emailValid: null,
          nameValid: null,
      };
  },

  
  methods:{
      focused(event){
          let elem = event.target;
          let elemAll = document.querySelectorAll(".inputElem");
          for(let i=0; i < elemAll.length; i++){
             elemAll[i].style.border = "none";
          }
          elem.style.border = "1px solid #0061f0";
      },
      showPassword(){
     if(this.type === 'password') {
          this.type = 'text'
      } else {
        this.type = 'password'
      }
      },
    //   validEmail(email) {
    //   let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //   return re.test(email);
    // },

      async register(){
         try{
             if(
                this.firstName  !== "" && 
                this.lastName  !== "" && 
                this.username  !== "" && 
                this.email !== "" && 
                this.password !== ""
          ){
              this.error = false;
              this.errorMsg = "";
              const firebaseAuth = await firebase.auth();
              const createUser = await firebaseAuth.createUserWithEmailAndPassword(this.email, this.password);
              const result = await createUser;
              const dataBase = db.collection("users").doc(result.user.uid);
              await dataBase.set({
                  firstName: this.firstName,
                  lastName: this.lastName,
                  username: this.username,
                  email: this.email,
                  admin: false,
                
              });
              this.$router.push({name: "Home"})
              return;
          }
          this.error = true;
          this.errorMsg = "Error: Fields cannot be empty!";
          return;

         }catch(err){
              this.error = true;
              this.errorMsg = err;
         }
          

      },
  },
};
</script>

<style lang="scss" scoped>
.register{
    h2{
        max-width:350px;
    }
}
.form-wrap{
    overflow: hidden;
    display: flex;
    height: 100vh;
    justify-content: center;
    align-self: center;
    margin: 0 auto;
    width: 90%;
    @media(min-width: 900px){
        width: 100%;
    }

    .login-register{
        margin-bottom: 32px;

        .router-link{
            color: #000;
        }
    }
    form{
        padding: 0 10px;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 1;
        @media(min-width: 900px){
            padding: 0 50px;
        }

        h2{
            text-align: center;
            font-size: 32px;
            color: #303030;
            margin-bottom: 40px;
            @media(min-width: 900px){
                font-size: 40px;
            }
        }
        .inputs{
            width: 100%;
            max-height: 350px;
            .input{
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-bottom: 8px ;
                
                input{
                    width: 100%;
                    border: none;
                    background-color:#e8f0fe;
                    padding: 4px 4px 4px 30px;
                    height: 50px;

                    &:focus{

                        outline: none;

                    }

                }
                .icon{
                    width: 12px;
                    position: absolute;
                    left: 6px;
                }
            }
        }

        .forgot-password{
            text-decoration: none;
            cursor: pointer;
            color: #000;
            font-size: 14px;
            margin: 16px 0 32px;
            border-bottom: 1px solid transparent;
            transition: .5s ease all;
           
           &:hover{
               border-color: #303030;
           }
        }


    }
.background{
    display: none;
    flex:2;
    background-size: cover;
    background: no-repeat center/80% url("../assets/blogPhotos/undraw_Access_account_re_8spm.png");
    width: 100%;
    height: 100%;
    @media(min-width: 900px){
        display: initial;
        background-size: 90%;
    }
}

}
</style>