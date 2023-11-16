<script setup>
import BaseLayout from "../../layouts/base-layout.vue";
</script>

<template>
  <base-layout>
    <template #mainContent>
      <div id="accounts">
        <div
          id="accounts-container"
          class="2xl:max-w-[1344px] xl:max-w-[1152px] lg:max-w-[960px] mx-auto"
        >
          <div
            id="accounts_register form-section"
            class="mb-[40px] lg:max-w-[540px] mx-auto"
          >
            <h1
              id="accounts_title"
              class="font-bodoni mt-[20px] mb-[40px] tracking-[1.5px] text-[2.6rem] text-center uppercase lg:text-[3rem] lg:leading-[1.33] lg:tracking-[2px] lg:my-[40px]"
            >
              sign in
            </h1>
            <form id="form">
                <div
                  id="form-group"
                  class="w-full mb-[30px] group flex flex-col"
                >
                  <label
                    for="email"
                    class="uppercase text-[12px] leading-[1] tracking-[1.5px] mb-[5px] opacit-0 group-focus:text-red-500 group-focus:opacity-100 transition-opacity duration-300"
                    >Email</label
                  >
                  <input
                    class="h-[50px] border placeholder-black border-black px-[15px] text-[12px] leading-[50px] tracking-[1px] text-black rounded-none focus:placeholder-transparent"
                    type="text"
                    name=""
                    id="email"
                    placeholder=""
                    required
                    autofocus
                  />
                </div>
                <div
                  id="form-group"
                  class="w-full mb-[30px] group flex flex-col"
                >
                  <label
                    for="password"
                    class="uppercase text-[12px] leading-[1] tracking-[1.5px] mb-[5px] opacit-0 group-focus:text-red-500 group-focus:opacity-100 transition-opacity duration-300"
                    >Password</label
                  >
                  <input
                    class="h-[50px] border placeholder-black border-black px-[15px] text-[12px] leading-[50px] tracking-[1px] text-black rounded-none focus:placeholder-transparent"
                    type="password"
                    name=""
                    id="password"
                    placeholder=""
                    required
                    autofocus
                  />
                </div>

                <div id="button-group">
                  <button
                    id="cta"
                    class="transition bg-[#000] py-[17px] px-[40px] border border-[#000] hover:text-[#000] hover:bg-[#fff] text-[12px] leading-[1] tracking-[1.5px] uppercase text-[#fff] mb-[2rem]"
                  >
                    log in
                  </button>
                </div>
                <div id="text-group" class="">
                  <a id="forgot-password" class="underline mb-3 cursor-pointer transition hover:text-black/70 block">Forgot password?</a>
                  <router-link :to="{ name: 'Register' }" id="sign-in" class="underline cursor-pointer transition hover:text-black/70">Not yet a member? Create account</router-link>
                </div>
            </form>
          </div>
        </div>
      </div>
    </template>
  </base-layout>
</template>
