<script setup>
function getSrc(path) {
  return new URL(`../assets/svgs/${path}`, import.meta.url).href;
}
</script>

<template>
  <section id="footer">
    <div id="columns request-columns" class="bg-[#000] mb-[0.75rem]">
      <div
        id="column request-column"
        class="h-[50px] flex items-center justify-center"
      >
        <p class="text-[14px] tracking-[0.5px] leading-[1.5] text-white">
          Looking for inspiration in your mailbox?
          <span class="underline cursor-pointer">Request a Catalog</span>
        </p>
      </div>
    </div>
    <div id="site-footer" class="px-[0.5rem] py-[60px]">
      <div
        id="footer-container"
        class="2xl:max-w-[1344px] xl:max-w-[1152px] lg:max-w-[960px] mx-auto"
      >
        <div id="columns footer-columns" class="flex justify-between flex-col-reverse md:flex-row">
          <div id="columns col-left" class="flex">
            <div id="column" class="p-[0.75rem] lg:pr-[65px] md:pr-[80px]">
              <h1
                id="footer-col-title"
                class="text-[16px] leading-[1.38] tracking-[0.5px] mb-[20px]"
              >
                Company
              </h1>
              <div
                :key="index"
                v-for="(item, index) in [
                  'About Us',
                  'Contact us',
                  'Trade',
                  'Resume + Exchanges',
                  'FAQ',
                  'Press',
                  'Careers',
                ]"
                id="footer-link"
                class="text-[14px] tracking-[0.15px] mb-[14px]"
              >
                <a class="cursor-pointer hover:opacity-70 hover:underline">{{ item }}</a>
              </div>
            </div>
            <div id="column" class="p-[0.75rem] lg:pr-[65px] md:pr-[80px]">
              <h1
                id="footer-col-title"
                class="text-[16px] leading-[1.38] tracking-[0.5px] mb-[20px]"
              >
                Past Catalogs
              </h1>
              <div
                :key="index"
                v-for="(item, index) in [
                  'April 2023',
                  'January 2023',
                  'November 2022',
                  'October 2022',
                  'Winter 2022',
                  'Holiday 2021',
                  'Fall 2021',
                  'Pre-Fall 2021',
                ]"
                id="footer-link"
                class="text-[14px] tracking-[0.15px] mb-[14px]"
              >
                <a class="cursor-pointer hover:opacity-70 hover:underline">{{ item }}</a>
              </div>
            </div>
            <div id="column" class="p-[0.75rem] lg:pr-[65px] md:pr-[80px]">
              <h1
                id="footer-col-title"
                class="text-[16px] leading-[1.38] tracking-[0.5px] mb-[20px]"
              >
                Follow
              </h1>
              <div
                :key="index"
                v-for="(item, index) in [
                  { title: 'Instagram', svg: 'instagram.svg' },
                  { title: 'Facebook', svg: 'facebook.svg' },
                  { title: 'Pinterest', svg: 'pinterest.svg' },
                  { title: 'Twitter', svg: 'twitter.svg' },
                ]"
                id="footer-link"
                class="text-[14px] tracking-[0.15px] mb-[14px] flex items-center"
              >
                <img
                  class="mr-[0.5rem] h-[20px] w-[20px]"
                  :src="getSrc(item.svg)"
                />
                <a class="cursor-pointer hover:opacity-70 hover:underline">{{ item.title }}</a>
              </div>
            </div>
          </div>
          <div id="column col-right" class="md:max-w-[410px] p-[0.75rem] md:pl-[32px] border-b border-[#d3d3d3] pb-[30px] mb-[50px]">
            <div id="footer-form">
              <h1 id="form-col-title"
                class="text-[26px] font-bodoni md:text-[30px] uppercase mb-[0.5rem] leading-[1.33] tracking-[2px]"
              >
                Like Being the first?
              </h1>
              <span
                id="form-text"
                class="text-[14px] tracking-[0.5px] leading-[1.57] inline-block mb-[3.5rem] "
              >
                Join the Collectors' Circle for first dibs on one of a kind
                pieces, new collections, events, and more.
              </span>
              <div id="input-group" class="flex flex-wrap md:flex-nowrap">
                <input type="email" class="w-full h-[50px] border border-black pl-[0.5rem] md:w-[210px] mb-[0.5rem]">
                <button class="w-full h-[50px] border border-black bg-black text-white uppercase text-[12px] tracking-[1.5px]">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
