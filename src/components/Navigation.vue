<template>
  <header>
  <div class="nav__container">
    <nav class="container">
  <div class="branding">
  <router-link class="header" :to="{name:'Home'}">News</router-link>
  </div>
  <div class="nav-links">
       <ul v-show="!mobile">
           <router-link class="link" :to="{name:'Home'}">Home</router-link>
           <router-link v-if="user" class="link" :to="{name: 'Blogs'}">News</router-link>
            <router-link class="link" :to="{name: 'ListReadingLater'}">ListReading Later</router-link>
            <router-link v-if="admin" class="link" :to="{name:'CreatePost'}">Create Post</router-link>
           <router-link v-if="!user" class="link" :to="{name: 'Login'}">Log in</router-link>
           <router-link v-if="!user" class="link" :to="{name: 'Register'}"> Sign up</router-link>
         
       </ul>
       <div v-if="user" @click="toggleProfileMenu" class="profile" ref="profile">
        <span>{{this.$store.state.ProfileInitials}}</span>
        
        <div v-show="profileMenu" class="profile-menu">
            <div class="info">
                <p class="initials"> {{this.$store.state.ProfileInitials}}</p>
                <div class="right">
                    <p>{{this.$store.state.profileFirstName}} {{this.$store.state.profileLastName}}</p>
                    <p>{{this.$store.state.profileUsername}}</p>
                    <p>{{this.$store.state.profileEmail}}</p>
                </div>
            </div>
            <div class="options">
                <div class="option">
                    <router-link class="option" :to="{name: 'Profile'}">
                        <userIcon class="icon"/>
                        <p>Profile</p>
                    </router-link>
                 </div>
                   <div @click="signOut" class="option">
                        <signOutIcon class="icon"/>
                        <p>Sign Out</p>
                 </div>
            </div>
        </div>
       </div>
  </div>
  </nav>
  <div class="wrapper-menu-icon">
    <menuIcon @click="toggleMobileNav" class="menu-icon" v-show="mobile"/>
  </div>

  </div>

  <transition name="mobile-nav"> 
         <ul  @click="toggleMobileNav" class="mobile-nav" v-show="mobileNav">
                <div   v-if="user" class="info mobile">
                <p class="initials"> {{this.$store.state.ProfileInitials}}</p>
                <div class="right">
                    <p>{{this.$store.state.profileFirstName}} {{this.$store.state.profileLastName}}</p>
                    <p>{{this.$store.state.profileUsername}}</p>
                    <p>{{this.$store.state.profileEmail}}</p>
                </div>
            </div>
            
           <router-link class="link" :to="{name:'Home'}">Home</router-link>
           <router-link v-if="user" class="link" :to="{name:'Blogs'}">News</router-link>
           <router-link v-if="admin" class="link" :to="{name:'CreatePost'}">Create Post</router-link>
           <router-link   v-if="user" class="link" :to="{name: 'Profile'}">Profile</router-link>
           <div v-if="user" class="link" @click="signOut"><p>Sign Out</p></div>
           <router-link v-if="!user" class="link" :to="{name: 'Login'}">Log in</router-link>
           <router-link v-if="!user" class="link" :to="{name: 'Register'}"> Sign up</router-link>
       </ul>
  </transition>
  </header>
</template>

<script>
import menuIcon from '../assets/Icons/bars-regular.svg';
import userIcon from '../assets/Icons/user-alt-light.svg';

import signOutIcon from '../assets/Icons/sign-out-alt-regular.svg';
import firebase from "firebase/app";
import "firebase/auth";
export default {
    name: 'navigation',
    components:{
        menuIcon,
        userIcon,
        signOutIcon,
    },
    data() {
        return{
            profileMenu:null,
            mobile: null,
             mobileNav:null,
            windownWidth: null,
        };

    },

    created(){
        window.addEventListener('resize', this.checkScreen);
        this.checkScreen();
 
    },

    methods: {
        checkScreen() {
            this.windownWidth = window.innerWidth;
            if(this.windownWidth <= 750){
                this.mobile = true;
                return;
            }
            this.mobile = false;
            this.mobileNav = false;
            return;

        },
        toggleMobileNav (){
            this.mobileNav = !this.mobileNav;
        },
        
        toggleProfileMenu(){
            this.profileMenu = !this.profileMenu;
        },
        signOut(){
            firebase.auth().signOut();
            window.location.reload();
            this.$router.push({name: "Home"});
            
        },
      
    },
    computed:{
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
.nav__container{
    display: flex;
    align-self: center;
      @media (min-width:751px){
      display: block;
    }
}
header{
    position: fixed;
    width: 100%;
    background-color: #f2f2f2;
    padding: 0 25px;
    z-index: 99;

.link{
   font-weight: 500;
   padding:  8px;
   
   

   &:hover{
       color: #0162f1;
       transition: all 0.5s ease;
   }

}
.link:last-child{
    border-radius: 20px;
    color: #fff;
    background-color: #0d5dbc;

       &:hover{
         background-color: #53a4f3;
         transition: all 0.5s ease;
   }
}
nav{
 display: flex;
 padding: 25px 0;

    .branding{
    display: flex;
    align-items: center;

    .header{
         font-weight: 600;
         color: #ffaa01;
         text-decoration: none;
    }

    }
    .nav-links{
      display: none;
            @media (min-width:751px){
                position: relative;
                display: flex;
                flex: 1;
                align-items: center;
                justify-content: flex-end;
            }

    ul{
    margin-right: 32px;

      .link{
      margin-right: 32px;
      }
      .linl:last-child{
         margin-right: 0;
      
      }
    
    }

    .profile{
       position: relative;
       cursor: pointer;
       display: flex;
       align-items: center;
       justify-content: center;
       width: 40px;
       height: 40px;
       border-radius: 50%;
       margin-right: 30px;
       color: #fff;
       background-color: #0d5dbc;
      
       

       span{
          pointer-events: none;
       } 
       .profile-menu{
          position: absolute;
          top: 60px;
          right: 0;
          width: 250px;
          background-color: #0d5dbc;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

            @media (min-width: 800px) {
              width: 300px;

            }

          .info{
             display: flex;
             align-items: center;
             padding: 15px;
             border-bottom: 1px solid #fff;

             .initials{
                 position: initial;
                 width: 40px;
                 height: 40px;
                 background-color: #fff;
                 color: #303030;
                 display: flex;
                 align-items: center;
                 justify-content: center;
                 border-radius: 50%;

             }
             .right{
                flex: 1;
                margin-left: 24px;

                p:nth-child(1){
                   font-size:14px;
                }

                p:nth-child(2),
                p:nth-child(3){
                   font-size:12px;
                }
             }
          }

          .options{
              padding: 15px;

              .option{
                 text-decoration: none;
                 color: #fff;
                 display: flex;
                 align-items: center;
                 margin-bottom: 12px;

                 .icon{
                    width:18px;
                    height: auto;

                 }
                 p{
                    font-size: 14px;
                    margin-left:12px;
                 }
                   
                   &:last-child{
                      margin-bottom: 0px;
                   }
              }

         
              
          }
       }
    }
  }
 }
 .wrapper-menu-icon{
  height: 85px;
    @media (min-width:751px){
      height: auto;
    }
  .menu-icon{
    cursor: pointer;
    position: absolute;
    top: 32px;
    right: 25px;
    height: 25px;
    width: auto;
 }
 }

  .mobile-nav{
  padding: 20px;
  width: 70%;
  max-width: 250px;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100%;
  background-color: #0d5dbc;
  top: 0;
  left: 0;
    .info.mobile{
     

      .initials{
        background-color: #fff;
        border-radius: 50%;
        width: fit-content;
        padding: 10px;
      }
      .right{
        color: #fff;
        margin: 20px 0;
      }
    }
    
    .link{
    padding: 15px 0;
    color: #fff;
    }
  }
  .mobile-nav-enter-active,
  .mobile-nav-leave-active {
  transition: all 0.5s ease;
  }
  .mobile-nav-enter{
  transform: translateX(-250px);
  }
  .mobile-nav-enter-to{
  transform: translateX(0);
  }
  .mobile-nav-leave-to{
   transform: translateX(-250px);
  }
}
</style>