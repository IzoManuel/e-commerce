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
              Create account
            </h1>
            <div id="form">
              <div
                id="accounts_register-grid"
                class="flex flex-col lg:flex-row"
              >
                <div
                  id="form-group"
                  class="w-full mb-[30px] lg:w-[256px] group flex flex-col"
                >
                  <label
                    for="FirstName"
                    class="uppercase text-[12px] leading-[1] tracking-[1.5px] mb-[5px] group-focus:text-red-500"
                    >First Name</label
                  >
                  <input
                    class="h-[50px] border placeholder-black border-black px-[15px] text-[12px] leading-[50px] tracking-[1px] text-black rounded-none focus:placeholder-transparent"
                    type="text"
                    name=""
                    id="FirstName"
                    placeholder="FIRST NAME"
                    required
                    autofocus
                  />
                </div>
                <div id="form-group"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </base-layout>
</template>
