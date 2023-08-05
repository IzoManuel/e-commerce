<script setup>
import axios from "../../axios/axios";
import { ref } from "vue";
import ErrorNotice from "../../assets/svgs/error-notice.vue";
import Spinner from "../../components/Spinner.vue";
import store from "../../store";
import { useRouter } from 'vue-router';
/**REACTIVE STATES*/
const credentials = ref({
  email: "d@gmail.com",
  password: "12345678",
});

const formError = ref({});
const loader = ref(false);
const router = useRouter()
/**FUNCTIONS*/
function login() {
  loader.value = true;
  axios
    .post("/admin/login", credentials.value)
    .then((response) => {
      let token = response.data.token;
      store.dispatch("set_token", response.data.token);
      store.dispatch("set_user",response.data.user );
      router.push({name:'Dashboard'});
    })
    .catch((err) => {
      if (err.response) {
        formError.value = err.response.data.errors;
      }
    })
    .finally(() => (loader.value = false));
}
</script>

<template>
  <div id="login" class="h-[100vh] font-segoe">
    <div
      id="login-content"
      class="relative top-[25vh] max-w-[400px] mx-auto p-[16px] rounded-[3px] md:shadow-xl md:w-[400px] md:py-[32px] md:px-[40px] text-[#5e6c84]"
    >
      <main class="">
        <div id="form-header">
          <h1
            class="text-center text-[#172b4d] text-[16px] leading-[20px] font-semibold"
          >
            Login to continue
          </h1>
        </div>

        <div id="form-body" class="mt-[20px] flex flex-col">
          <div
            id="field-error-text"
            class="flex gap-1 mx-auto"
            v-if="formError.error_code == 42"
          >
            <div id="error-notice-icon" class="h-[24px] w-[24px]">
              <error-notice></error-notice>
            </div>
            <p class="text-[0.857em] leading-[1.3333] mt-[4px] text-[#ae2a19]">
              {{ formError.message }}
            </p>
          </div>
          <div
            id="field-group"
            class="w-full md:flex-row items-center gap-4 mb-[12px]"
          >
            <label
              id=""
              for="email"
              class="w-[130px] text-[#6b778c] font-[500] text-[14px]"
              ><span class="underline">E</span>mail</label
            >
            <input
              type="text"
              id="email"
              :class="{
                'border-[#de350b]': formError.email,
                'border-[#dfe1e6]': !formError.email,
              }"
              class="transition w-full border-2 focus:border-[#4c9aff] focus:outline-none hover:bg-[#ebecf0] py-[3px] px-[4px] rounded-[3.01px] focus:bg-white block"
              v-model="credentials.email"
            />
            <div
              id="field-error-text"
              class="flex gap-1"
              v-if="formError.email"
            >
              <div id="error-notice-icon" class="h-[24px] w-[24px]">
                <error-notice></error-notice>
              </div>
              <p
                class="text-[0.857em] leading-[1.3333] mt-[4px] text-[#ae2a19]"
              >
                {{ formError.email[0] }}
              </p>
            </div>
          </div>
          <div id="field-group" class="w-full items-center gap-4 mb-[12px]">
            <label
              id=""
              for="password"
              class="w-[130px] text-right text-[#6b778c] font-[500] text-[14px]"
              ><span class="underline">P</span>assword</label
            >
            <input
              type="password"
              id="password"
              :class="{
                'border-[#de350b]': formError.password,
                'border-[#dfe1e6]': !formError.password,
              }"
              class="w-full transition border-2 focus:border-[#4c9aff] focus:outline-none hover:bg-[#ebecf0] py-[3px] px-[4px] rounded-[3.01px] focus:bg-white"
              v-model="credentials.password"
            />
            <div
              id="field-error-text"
              class="flex gap-1"
              v-if="formError.password"
            >
              <div id="error-notice-icon" class="h-[24px] w-[24px]">
                <error-notice></error-notice>
              </div>
              <p
                class="text-[0.857em] leading-[1.3333] mt-[4px] text-[#ae2a19]"
              >
                {{ formError.password[0] }}
              </p>
            </div>
          </div>
          <div id="field-group" class="mb-[12px]">
            <div class="flex gap-2 w-full">
              <input
                type="checkbox"
                id="rememberMe"
                class="border-2 border-[#dfe1e6] focus:border-[#4c9aff] focus:outline-none hover:bg-[#ebecf0] py-[3px] px-[4px] rounded-[3.01px] focus:bg-white"
              />
              <label for="rememberMe"
                ><span>R</span>emember my login in this computer</label
              >
            </div>
          </div>
          <button
            :disabled="loader"
            :class="{ 'cursor-not-allowed': loader }"
            id="login"
            class="bg-[#0052cc] text-white h-[40px] leading-[40px] rounded-[3px] font-semibold hover:bg-[#0065ff] relative"
            @click="login"
          >
            <div
              id="spinner"
              :class="{ hidden: !loader }"
              class="w-[24px] h-[24px] absolute top-0 right-0 bottom-0 left-0 m-auto"
            >
              <spinner></spinner>
            </div>
            <span :class="{ hidden: loader }">Continue</span>
          </button>
          <div id="reset-password" class="mt-[24px] text-[14px] text-center">
            <span
              class="leading-[20px] hover:underline hover:cursor-pointer text-[#0052cc]"
              >Can't log in?</span
            >
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
