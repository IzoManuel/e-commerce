<script setup>
import FormInput from "@/components/form-input.vue";
import { ref, computed, onMounted } from "vue";
import AppButton from "@/components/app-button.vue";
import { getSrc } from "@/composables/util";
import store from "@/store";
import axios from "@/axios/axios";
import ErrorNotice from "@/assets/svgs/error-notice.vue";
import Modal from "@/components/modal.vue";
let useAppJson = import.meta.env.VITE_APP_USE_JSON_DATA;

const loader = ref(false);
const checkout = ref({});
const formError = ref({});
const checkoutError = ref({});
const isModalOpen = ref(false);
const cart = store.getters["cart/cartItems"];
const paymentOptions = ref([
  { label: "Mpesa", value: "mpesa" },
  { label: "Paypal", value: "paypal" },
  { label: "Stripe", value: "stripe" },
]);
const sections = ref([
  {
    title: "Contact",
    fields: [
      {
        label: "Email",
        id: "email",
        type: "email",
        required: true,
      },
      {
        label: "Full name",
        id: "full_name",
        type: "text",
        required: true,
      },
    ],
  },
  {
    title: "Shipping Address",
    fields: [
      {
        label: "Country",
        id: "country",
        type: "text",
        //renderAs: "select",
      },
      {
        label: "City",
        id: "city",
        type: "text",
        required: true,
      },
      {
        label: "Phone",
        id: "phone_number",
        type: "text",
        required: true,
      },
      { label: "Postal code", id: "postal_code", type: "text", required: true },
    ],
  },
  {
    title: "Payment Method",
    fields: [
      {
        label: "Payment option",
        id: "payment_method",
        type: "radio",
        required: true,
        options: paymentOptions.value,
      },
    ],
  },
]);
const defaultOrder = ref({
  first_name: "Leo",
  last_name: "vinci",
  full_name: "Leo Vincie",
  phone_number: "0746305365",
  email: "q@gmail.com",
  country: "Kenya",
  city: "Nairobi",
  postal_code: "22-11",
});

checkout.value = defaultOrder.value;
let stripePaymentMethod = ref(null);
/**
 * COMPUTED
 */
const cartItems = computed(() => store.getters["cart/cartItems"]);
const totalPriceForCartItem = computed(
  () => (cartItemId) => store.getters["cart/totalPriceForCartItem"](cartItemId)
);
const totalCartPrice = computed(() => store.getters["cart/totalCartPrice"]);
// const getCheckoutError = computed(() => {
//   return formError[props.id] || null// props.formError[props.id] ? formError[props.id] : null
// });
/**
 * FUNCTIONS
 */


async function createOrder() {
  loader.value = true;
  console.log(`PM string: ${checkout.value.payment_method}`)
  if(checkout.value.payment_method == 'stripe') {
    handlePayment();
  }
  try {
    const response = await axios.post("/checkout", {
      cart,
      ...checkout.value,
      //payment_method: stripePaymentMethod.value
    });
    //order.value = response.data.data;
    formError.value = {};
    checkoutError.value = {};
    //createStatusCode.value = response.status;
    //store.dispatch('addOrder', response.data.data);

    if (checkout.value.payment_method == "paypal") {
      // Calculate the position for the center of the screen
      const screenWidth = window.screen.availWidth;
      const screenHeight = window.screen.availHeight;
      const windowWidth = 600; // Customize the width as needed
      const windowHeight = 400; // Customize the height as needed
      const left = (screenWidth - windowWidth) / 2;
      const top = (screenHeight - windowHeight) / 2;

      // Customize the window properties as needed
      const windowFeatures = `width=${windowWidth},height=${screenHeight},left=${left}`;
      const newWindow = window.open(
        response.data.message,
        "PayPalSandbox",
        windowFeatures
      );

      if (newWindow) {
        // The new window was opened successfully
        // You can perform additional actions here if needed
      } else {
        // Opening the window was blocked by the browser's pop-up blocker
        // You can inform the user or handle this case as appropriate
        alert("Pop-up blocked. Please allow pop-ups for this site.");
      }
    }
  } catch (error) {
    if (error.response) {
      formError.value = error.response.data.errors;
      // if(error.response.data.errors == null) {
      //   checkoutError.value = error.response.data.message
      // }
    }
  } finally {
    loader.value = false;
    setTimeout(() => {
      //createStatusCode.value = false;
    }, 3000);
  }
}

const stripeAPIToken = import.meta.env.VITE_APP_STRIPE_KEY;
let stripe = null;
let elements = null;
let cardElement = null;

const includeStripe = (URL, callback) => {
  const object = document.createElement("script");
  object.src = "//" + URL;
  object.addEventListener(
    "load",
    (e) => {
      if (callback) callback(null, e);
    },
    false
  );
  document
    .getElementsByTagName("script")[0]
    .parentNode.insertBefore(
      object,
      document.getElementsByTagName("script")[0]
    );
};

async function handlePayment() {
  const { paymentMethod } = await stripe.createPaymentMethod({
    type: "card",
    card: cardElement,
  });
  stripePaymentMethod.value = paymentMethod.id
  console.log(`PM-ID:${stripePaymentMethod.value}`)
}

function setIsOpen(value) {
  isModalOpen.value = value;
}

function openModal() {
  isModalOpen.value = true;
}

function onSubmit () {
  if (useAppJson) {
    openModal();
  } else {
    createOrder();
  }
}

const configureStripe = () => {
  stripe = Stripe(stripeAPIToken);
  elements = stripe.elements();
  cardElement = elements.create("card");
  cardElement.mount("#card-element");
};

onMounted(() => {
  includeStripe("js.stripe.com/v3/", configureStripe);
});
</script>
<template>
    <Modal
    :isOpen="isModalOpen"
    :modalTitle="``"
    :setIsOpen="setIsOpen"
  >
    <template #modalBody>
      <div
        class="mt-[12px]"
      >
      <p>Oops! 🙊 It seems our payment magic is still in the making. We're hard at work getting it ready for you. Thanks for your patience!</p>
      </div>
    </template>
  </Modal>
  <div id="checkout">
    <div
      id="checkout-content"
      class="2xl:max-w-[1344px] xl:max-w-[1152px] lg:max-w-[960px] mx-auto relative"
    >
      <div id="grid-cols" class="flex flex-col lg:flex-row">
        <div
          id="col-left"
          class="border-r border-[#d3d3d3] lg:w-[54%] h-[100vh] pt-[4em] pr-[4em]"
        >
          <div class="site-logo">
            <router-link :to="{ name: 'ProductIndex' }">
              <h1 class="text-[2em] text-[#333333]">
                St. Manuel
              </h1>
            </router-link>
          </div>
          <form
            @submit.prevent="onSubmit"
            id="form"
            class="mt-[30px] text-[#333333]"
          >
            <div id="form-error-text" class="" v-if="formError">
              <div id="error-notice-icon" class="h-[24px] w-[24px]">
                <error-notice></error-notice>
              </div>
              <p class="text-[0.857em] leading-[1.3333] mt-[] text-[#ae2a19]">
                {{ formError }}
              </p>
            </div>
            <div v-for="(section, index) in sections" :key="index">
              <div id="section-header" class="mb-[10px]">
                {{ section.title }}
              </div>
              <div>
                <FormInput
                  :key="index"
                  v-for="(field, index) in section.fields"
                  :label="field.label"
                  :type="field.type"
                  :id="field.id"
                  :form-error="formError"
                  v-model="checkout[field.id]"
                  :render-as="field.renderAs"
                  :required="field.required"
                  :options="field.options"
                  :option-value="field.optionValue"
                  :option-key="field.optionKey"
                  :place-holder="field.placeholder"
                  class="mb-[20px]"
                ></FormInput>
              </div>
            </div>
            <!-- STRIPE -->
            <div class="mb-8" v-show="checkout.payment_method == 'stripe'">
              <label class="block mb-4">Stripe card payment</label>
              <div id="card-element" class="mb-4"></div>
            </div>
            <!-- STRIPE -->
            <div id="cta" class="flex justify-end pb-10">
              <AppButton
                :label="'Place order'"
                :loader="loader"
                @click="onSubmit"
              ></AppButton>
            </div>
          </form>
        </div>
        <div id="col-right" class="lg:w-[46%] pt-[56px] pl-[44px] relative">
          <div id="sidbar-summary">
            <div id="order-summary-sections" class="flex flex-col">
              <div id="product-list-section" class="mt-[0.75em] mb-[1.5em]">
                <div
                  v-for="(cartItem, index) in cartItems"
                  :key="index"
                  id="row product-table"
                  class="flex justify-between items-center"
                >
                  <div id="product-info" class="flex items-center gap-3">
                    <div
                      id="product-image"
                      class="h-[64px] w-[64px] relative border rounded-[6px]"
                    >
                      <div
                        id="item-quantity"
                        class="absolute right-0 top-0 rounded-full bg-[#727272e6] h-[25px] w-[25px] flex items-center"
                      >
                        <span
                          class="text-white text-center text-[0.8571em] font-medium leading-[1.75em] min-w-[1.75em] w-full p-[4px]"
                          >{{ cartItem.quantity }}</span
                        >
                      </div>
                      <img
                        :src="getSrc(`images/${cartItem.thumbnail_img}.jpg`)"
                      />
                    </div>
                    <div id="Product-description">
                      <h1 class="font-medium text-[#323232] text-[14px]">
                        {{ cartItem.name }}
                      </h1>
                    </div>
                  </div>
                  <div id="product-total">
                    <h1 class="font-medium text-[#323232] text-[14px]">
                      ${{ totalPriceForCartItem(cartItem.id) }}
                    </h1>
                  </div>
                </div>
              </div>
              <div
                id="discount-section form"
                class="py-[1.5em] border-t border-top flex items-center gap-2"
              >
                <FormInput
                  :label="'Discount code'"
                  :type="'text'"
                  :id="'discount_code'"
                ></FormInput>
                <AppButton :label="'Apply'"></AppButton>
              </div>
              <div id="totals-section" class="py-[1.5em] border-t border-top">
                <div id="subtotal" class="flex items-center justify-between">
                  <div id="subtotal-label" class="text-[14px]">Subtotal</div>
                  <div id="subtotal-price" class="font-medium text-[14px]">
                    ${{ totalCartPrice }}
                  </div>
                </div>
                <div
                  id="shipping"
                  class="flex items-center justify-between mt-[7px]"
                >
                  <div id="shipping-label" class="text-[14px]">Shipping</div>
                  <div id="shipping-price" class="font-medium text-[14px]">
                    $0
                  </div>
                </div>
                <div
                  id="total"
                  class="py-[1.5em] border-t border-top mt-[1.5em]"
                >
                  <div id="total" class="flex items-center justify-between">
                    <div id="total-label" class="text-[16px]">Total</div>
                    <div id="total-price" class="font-medium text-[24px]">
                      ${{ totalCartPrice }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
