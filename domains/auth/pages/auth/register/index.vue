<!--<template>-->
<!--    <div class="login-page">-->
<!--        &lt;!&ndash; <EaMessage-->
<!--            v-if="accountStoreInlineMessage.status"-->
<!--            class="ea-message " -->
<!--            v-bind="accountStoreInlineMessage"-->
<!--        /> &ndash;&gt;-->
<!--        <div class="login__form">-->
<!--            <div class="name">-->
<!--                <TextInput-->
<!--                    v-model="authStore.userRegisterForm.name"-->
<!--                    label="Name"-->
<!--                    placeholder="Name..."-->
<!--                />-->
<!--            </div>-->
<!--            <div class="email">-->
<!--                <TextInput-->
<!--                    v-model="authStore.userRegisterForm.email"-->
<!--                    label="Email"-->
<!--                    placeholder="Email..."-->
<!--                />-->
<!--            </div>-->
<!--            <div class="password">-->
<!--                <TextInput-->
<!--                    v-model="authStore.userRegisterForm.password"-->
<!--                    label="Password"-->
<!--                    placeholder="Password..."-->
<!--                />-->
<!--            </div>-->
<!--            <div class="password-confirmation">-->
<!--                <TextInput-->
<!--                    v-model="authStore.userRegisterForm.password_confirmation"-->
<!--                    label="Password Confirmation"-->
<!--                    placeholder="Password..."-->
<!--                />-->
<!--            </div>-->
<!--            <Button label="Register" @click="authStore.onRegister" />-->
<!--        </div>-->
<!--    </div>-->
<!--</template>-->
<template>
  <div class="login-page">
    <div class="login-panel">
      <div class="panel-image">
        <img :src="loginPanelImage" alt="login-panel" >
      </div>
      <div class="login__form">
        <h4>Welcome</h4>
        <div class="login__form">
          <div class="name">
            <TextInput
                v-model="authStore.userRegisterForm.name"
                label="Name"
                placeholder="Name..."
            />
          </div>
          <div class="email">
            <TextInput
                v-model="authStore.userRegisterForm.email"
                label="Email"
                placeholder="Email..."
            />
          </div>
          <div class="password">
            <TextInput
                v-model="authStore.userRegisterForm.password"
                label="Password"
                placeholder="Password..."
            />
          </div>
          <div class="password-confirmation">
            <TextInput
                v-model="authStore.userRegisterForm.password_confirmation"
                label="Password Confirmation"
                placeholder="Password..."
            />
          </div>
        </div>
        <div class="submit-button">
          <Button label="Register" :loading="authStore.isLoginActionLoading" @click="authStore.onRegister"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import  TextInput from '~/domains/app/components/form/TextInput/index.vue';
import  Button from '~/domains/app/components/form/Button/index.vue';
import loginPanelImage from '~/domains/auth/assets/images/login/login-panel.png';
const authStore = useAuthStore();

</script>

<style scoped>
.login-page{
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(../../../assets/images/login/page-image.png);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5); /* 50% black overlay */
    z-index: 1;
  }

  .login-panel{
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    height: auto;
    background-color: #fff;
    border-radius: 10px;

    .panel-image{
      box-sizing: border-box;
      flex: 1;
      height: 100%;
      overflow: hidden;
      width: auto;

      img{
        width: 100%;
        height: 100%;
        border-radius: 10px 0 0 10px;
      }
    }

    .login__form{
      box-sizing: border-box;
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
      column-gap: 10px;
      border-radius: 10px;
      filter: blur(0px);

      h4{
        font-size: 1.5rem;
        font-weight: 600;
        color: #000;
        text-align: center;
      }

      .submit-button{

        > div{
          width: 100%;
        }
      }

      .links{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        font-size: 0.875rem;
        font-weight: 400;
        color: #000;
        text-align: center;

        a{
          color: #000;
          text-decoration: none;
        }

        a:hover{
          text-decoration: underline;
        }
      }

    }
  }
}
</style>