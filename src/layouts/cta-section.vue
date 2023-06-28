<template>
            <div id="live-in-color-content">
          <div id="columns" class="flex flex-col md:flex-row">
            <div id="column-left" class="md:w-1/2">
                <slot name="image"></slot>
              
            </div>
            <div
              id="column-right"
              class="flex flex-col items-center justify-center pt-[3rem] pb-[3.75rem] px-[1.5rem] lg:p-[80px] bg-[#000] text-[#fff] text-center md:w-1/2"
            >
              <div id="text">
                <h3
                  id="top-text"
                  class="text-[12px] leading-[1] tracking-[2.5px] mb-[1.5rem] uppercase"
                >
                <slot name="top-text"></slot>
                  
                </h3>
                <h3
                  id="title"
                  class="font-bodoni text-[30px] leading-[1.33] tracking-[2px] mb-[2rem] uppercase"
                >
                <slot name="title"></slot>
                  
                </h3>
                <p
                  id="text"
                  class="max-w-[460px] text-[14px] tracking-[0.5px] mb-[2.5rem]"
                >
                <slot name="description"></slot>
                </p>
              </div>
              <button
                id="cta"
                class="transition bg-[#fff] py-[17px] px-[40px] border border-[#fff] hover:text-[#fff] hover:bg-[#000] text-[12px] leading-[1] tracking-[1.5px] uppercase text-[#000]"
              >
                shop now
              </button>
            </div>
          </div>
        </div>
</template>