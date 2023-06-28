<script setup>
import BaseLayout from "../layouts/base-layout.vue";
import CtaSection from "../layouts/cta-section.vue";
import ChevronDown from "../assets/svgs/chevron-down.vue";

function getSrc(path) {
  return new URL(`../assets/images/${path}`, import.meta.url).href;
}
</script>

<template>
  <base-layout>
    <template #mainContent>
      <section id="hero" class="relative">
        <div
          id="hero-background"
          class="absolute top-0 right-0 bottom-0 left-0 w-full"
        >
          <div id="hero-image" class="w-full relative overflow-hidden">
            <img
              src="../assets/images/hero-pillows.jpg"
              class="w-full min-w-[820px] h-full"
            />
          </div>
        </div>
        <div
          id="hero-body"
          class="flex items-center justify-center h-[40vw] min-h-[300px] shrink-0"
        >
          <div
            id="hero-container"
            class="relative mt-[35px] mb-[35px] mr-auto top-0 self-start 2xl:max-w-[1344px] xl:max-w-[1152px] lg:max-w-[960px]"
          >
            <div
              id="hero-body-inner"
              class="bg-[#000] p-[2rem] md:w-[355px] lg:w-[472px] max-w-[650px] text-[#fff]"
            >
              <h3
                id="hero-top-text"
                class="text-[12px] leading-[1] tracking-[2.5px] mb-[10px] uppercase"
              >
                limited time
              </h3>
              <h1
                id="hero-title"
                class="font-bodoni text-[30px] leading-[1.14] tracking-[3px] mb-[2.5rem]"
              >
                25% OFF PILLOWS
              </h1>
              <h3
                id="hero-subtitle"
                class="-mt-[1.25rem] text-[14px] leading-[1.57] tracking-[0.5px] mb-[1rem]"
              >
                Use code CUSHLIFE on our printed and handmade pillows!
              </h3>
              <p>
                <a
                  class="cursor-pointer underline uppercase tracking-[1px] text-[14px]"
                  >shop now</a
                >
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="product-grid">
        <div id="product-grid-content" class="py-[2rem] px-[1.5rem]">
          <div
            id="container"
            class="2xl:max-w-[1344px] xl:max-w-[1152px] lg:max-w-[960px] mx-auto"
          >
            <h3
              id="product-grid-title"
              class="font-bodoni text-[30px] leading-[1.33] tracking-[2px] uppercase mb-[1.5rem] mx-auto text-center"
            >
              Shop these faves
            </h3>
            <div id="column" class="mx-auto xl:w-[91.66667%] p-[0.75rem]">
              <div
                id="product-grid"
                class="md:flex flex-nowrap last:-mb-[0.75rem]"
              >
                <div
                  id="column"
                  class="pt-[0.75rem]"
                  :key="index"
                  v-for="(item, index) in [
                    'pillow-1',
                    'pillow-2',
                    'pillow-3',
                    'pillow-4',
                  ]"
                >
                  <div id="product-card" class="p-[1rem]">
                    <a id="product-image" class="cursor-pointer relative">
                      <div
                        id="product-image-container"
                        class="lg:max-w-[220px] m-auto"
                      >
                        <div
                          id="badge"
                          class="bg-[#000] rounded-[50px] text-center w-[60px] h-[60px] flex items-center justify-between absolute -right-[15px] -top-[15px] z-10"
                        >
                          <p
                            id="badge-text"
                            class="text-[#fff] text-[10px] leading-[1.2] tracking-[1px] uppercase"
                          >
                            Best seller
                          </p>
                        </div>
                        <div>
                          <div
                            id="nacelle-image"
                            class="max-w-[190px] max-h-[190px] md:max-w-[220px] md:max-h-[220px] mx-auto"
                          >
                            <img :src="getSrc(`${item}.jpg`)" alt="" />
                          </div>
                        </div>
                      </div>
                    </a>
                    <div
                      id="product-card-details"
                      class="flex flex-col pt-[30px] items-center justify-between w-full min-h-[80px]"
                    >
                      <a class="cursor-pointer">
                        <h3
                          id="product-title"
                          class="font-bodoni text-[18px] leading-[1.33] tracking-[0.5px] text-center mb-[0.5rem]"
                        >
                          Chambray Lattice Baule Pillow
                        </h3>
                      </a>
                      <div id="product-price-range" class="text-center">
                        <span
                          id="product-price"
                          class="text-[12px] leading-[1.83] tracking-[0.5px] mb-[0.5px]"
                          >$175</span
                        >
                        <span>-</span>
                        <span
                          id="product-price"
                          class="text-[12px] leading-[1.83] tracking-[0.5px] mb-[0.5px]"
                          >$225</span
                        >
                      </div>
                      <h3
                        id="product-additional-info"
                        class="text-[12px] leading-[1.83] tracking-[0.5px] text-center opacity-90"
                      >
                        Printed
                      </h3>
                      <h3
                        id="product-additional-info"
                        class="text-[12px] leading-[1.83] tracking-[0.5px] text-center opacity-90"
                      >
                        Available in Throw, Lumbar
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="live-in-color">
        <cta-section>
          <template #image>
            <img src="../assets/images/lic-1.jpg" alt="" class="ml-auto"/>
          </template>
          <template #top-text>Play with pattern</template>
          <template #title>CURTAINs AND YARDAGE</template>
          <template #description>
            Customize your space with bold and beautiful wallpaper, fabric and
            our new made to order french pleat curtains!
          </template>
        </cta-section>
      </section>
      <section id="featured">
        <div id="featured-content" class="py-[4rem]">
          <div id="columns" class="flex flex-col items-center justify-center">
            <div id="column-left" class="text-center">
              <h1
                id="collections-subtitle"
                class="text-[12px] leading-[1] tracking-[2.5px] mb-[1.5rem] uppercase"
              >
                More To
              </h1>
              <h3
                id="collections-subtitle"
                class="font-bodoni text-[30px] leading-[1.33] tracking-[2px] mb-[1rem] uppercase"
              >
                Discover
              </h3>
            </div>
            <div id="column-right" class="max-w-[1140px]">
              <div id="columns" class="grid grid-cols-3 mb-[12px]">
                <div
                  id="column"
                  :key="index"
                  class="p-[0.75rem] text-center"
                  v-for="(item, index) in [
                    'col-1.jpg',
                    'col-2.jpg',
                    'col-3.jpg',
                  ]"
                >
                  <a class="cursor-pointer">
                    <div id="collection-image" class="h-full w-full">
                      <img :src="getSrc(item)" alt="" class="h-full w-full" />
                    </div>
                  </a>
                  <a
                    id="collection-name"
                    class="transition text-[18px] tracking-[0.5px] hover:underline hover:opacity-70 cursor-pointer"
                    >New Releases</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="live-in-color">
        <cta-section>
          <template #image>
            <img src="../assets/images/tray-flower.jpg" alt="" class="ml-auto"/>
          </template>
          <template #top-text>Explore our new</template>
          <template #title> Printed + Vintage pillows. </template>
          <template #description>
            Embrace pattern, color, and texture with statement-making pillows.
          </template>
        </cta-section>
      </section>
      <section id="who's-st-manuel">
        <div
          id="who's-st-manuel-content"
          class="pt-[40px] max-w-[1120px] mx-auto md:py-[60px]"
        >
          <div id="columns" class="flex flex-col-reverse md:flex-row-reverse">
            <div id="column-left" class="md:w-1/2">
              <img src="../assets/images/woman-crafting.jpg" alt="" />
            </div>
            <div
              id="column-right"
              class="p-[80px] bg-[#fff] text-[#000] md:w-1/2"
            >
              <div id="text" class="flex flex-col justify-between h-full">
                <div>
                  <h3
                    id="top-text"
                    class="text-[12px] leading-[1] tracking-[2.5px] mb-[1.5rem] uppercase"
                  >
                    The way we work
                  </h3>
                  <h3
                    id="title"
                    class="font-bodoni text-[60px] leading-[1.14] tracking-[3px] mb-[2rem] uppercase"
                  >
                    Who is st. manuel?
                  </h3>
                </div>
                <div>
                  <p
                    id="text"
                    class="max-w-[450px] text-[18px] leading-[1.48] tracking-[0.5px] mb-[2rem]"
                  >
                    Customize your space with bold and beautiful wallpaper,
                    fabric and our new made to order french pleat curtains!
                  </p>
                  <button
                    id="cta"
                    class="transition border-b border-[#000] hover:border-[#000]/70 hover:text-[#000]/70 text-[18px] leading-[0.8] tracking-[0.5px] uppercase"
                  >
                    Read more
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="live-in-color">
        <cta-section>
          <template #image>
            <img src="../assets/images/tray-flower.jpg" alt="" class="ml-auto"/>
          </template>
          <template #top-text> Indulge in </template>
          <template #title> Beautiful Bedding </template>
          <template #description>
            Experience the exceptional quality of our bestselling bedding,
            available in crisp cotton percale and luxe linen.
          </template>
        </cta-section>
      </section>
      <section id="on-the-blog">
        <div
          id="on-the-blog-content"
          class="mx-auto pt-[2rem] pb-[10px] md:pt-[2.5rem] md:pb-[4rem] lg:max-w-[960px] xl:max-w-[1152px] 2xl:max-w-[1344px]"
        >
          <div id="columns" class="flex flex-col md:flex-col-reverse">
            <div id="column-left" class="pb-[40px] px-[28px]">
              <img src="../assets/images/sofa-pillows.jpg" alt="" />
            </div>
            <div
              id="column-right"
              class="bg-[#fff] text-[#000] flex justify-center text-center"
            >
              <div id="text" class="flex flex-col justify-between h-full">
                <div>
                  <h3
                    id="top-text"
                    class="text-[10px] leading-[1.2] tracking-[2px] mb-[0.5rem] uppercase"
                  >
                    Get inspired
                  </h3>
                  <h3
                    id="title"
                    class="font-bodoni text-[30px] leading-[1.33] tracking-[2px] mb-[2rem] uppercase"
                  >
                    shop the look
                  </h3>
                </div>
                <div>
                  <p
                    id="text"
                    class="mx-auto max-w-[450px] text-[14px] leading-[1.29] tracking-[0.5px] mb-[2rem]"
                  >
                    Achieve effortless style at home by shopping our bedroom,
                    living room, and dining rooms designed with curated pieces.
                  </p>
                  <button
                    id="cta"
                    class="transition bg-[#000] py-[17px] px-[40px] border border-[#000] hover:text-[#000] hover:bg-[#fff] text-[12px] leading-[1] tracking-[1.5px] uppercase text-[#fff] mb-[2rem]"
                  >
                    read now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="testimonials">
        <div
          id="testimonials-content"
          class="bg-black pt-[40px] pb-[60px] md:pt-[5rem] md:pb-[6rem]"
        >
          <div
            id="container"
            class="lg:max-w-[960px] xl:max-w-[1152px] 2xl:max-w-[1344px] mx-auto"
          >
            <div id="columns" class="flex">
              <div id="column" class="w-full">
                <div
                  id="testimonial-navigator"
                  class="flex items-center justify-between"
                >
                  <div id="testimonial-image-container" class="">
                    <h1 class="font-bodoni text-[#fff] text-[25px] uppercase">
                      HUFFPOST
                    </h1>
                  </div>
                  <div id="navigator-controls" class="flex items-center">
                    <button class="w-[40px] h-[40px]">
                      <chevron-down class="fill-white rotate-90"></chevron-down>
                    </button>
                    <button class="text-[#fff] text-[25px]">|</button>
                    <button class="w-[40px] h-[40px]">
                      <chevron-down
                        class="fill-white -rotate-90"
                      ></chevron-down>
                    </button>
                  </div>
                </div>
                <div id="my-progress" class="mt-[1rem] w-full bg-[grey]">
                  <div
                    id="my-bar"
                    class="h-[1px] bg-[#ddd] text-center leading-[30px] text-[#fff]"
                  ></div>
                </div>
              </div>
            </div>
            <div id="corousel">
              <div id="column">
                <h1
                  id="testimonial-quote"
                  class="font-bodoni text-[30px] leading-[1.14] tracking-[3px] pl-[0.5rem] md:text-[60px] md:leading-[1.2] md:tracking-[2px] text-[#fff] md:mr-[60px] md:pl-[1.75rem] md:indent-[1.75rem] uppercase mt-[60px] md:mb-[40px]"
                >
                  “ST. FRANK DEFIES CONSCIOUS CAPITALISM CONVENTIONS”
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="follow-us">
        <div id="follow-us-content container" class="lg:max-w-[960px] xl:max-w-[1152px] 2xl:max-w-[1344px] mx-auto pt-[4rem] pb-[3rem] md:pb-[4rem]">
          <div id="columns" class="flex flex-col">
            <div id="column text" class="p-[0.75rem] text-center">
              <a id="ig-account">
                <h1 class="text-[12px] leading-[1] tracking-[2.5px] mb-[1rem] uppercase">@stmanueltextiles</h1>
              </a>
              <h1 id="ig-title" class="mb-[1rem] uppercase text-[30px] nd:leading-[1.33] md:tracking-[2px] md:px-[60px] font-bodoni">Follow our journey</h1>
            </div>
            <div id="column ig-images" class="flex">
              <a class="cursor-pointer" :key="index" v-for="(item, index) in ['ig-1.jpg', 'ig-2.jpg', 'ig-3.jpg', 'ig-4.jpg']">
                <div id="ig-image" class="p-[1rem]">
                  <img :src="getSrc(item)" alt="">
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </template>
  </base-layout>
</template>

<style scoped></style>
