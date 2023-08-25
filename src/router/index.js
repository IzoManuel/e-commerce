import * as VueRouter from "vue-router";
import store from "../store";


const Register = () => import("../pages/auth/register.vue");
const AdminLogin = () => import("../pages/auth/admin-login.vue");
const Dashboard = () => import("../pages/dashboard/home.vue");
const Home = () => import("../pages/home.vue");

const DashProductIndex = () => import("../pages/dashboard/products/index.vue");
const DashListProducts = () => import("../pages/dashboard/products/list.vue");
const DashProductForm = () => import("@/pages/dashboard/products/ProductForm.vue");

const DashCategoryIndex = () => import("@/pages/dashboard/category/CategoryIndex.vue");
const DashCategoryList = () => import('@/pages/dashboard/category/CategoryList.vue');
const DashCategoryForm = () => import("@/pages/dashboard/category/CategoryForm.vue");

const DashCustomerIndex = () => import("@/pages/dashboard/customer/CustomerIndex.vue");
const DashCustomerList = () => import('@/pages/dashboard/customer/CustomerList.vue');
const DashCustomerForm = () => import("@/pages/dashboard/customer/CustomerForm.vue");

const DashOrderIndex = () => import("@/pages/dashboard/order/OrderIndex.vue");
const DashOrderList = () => import('@/pages/dashboard/order/OrderList.vue');
const DashOrderForm = () => import("@/pages/dashboard/order/OrderForm.vue");

const ProductIndex = () => import("../pages/products/index.vue");
const ListProducts = () => import("../pages/products/list.vue");
const ViewProduct = () => import("../pages/products/view.vue");

const Cart = () => import("../pages/cart/cart.vue");
const Checkout = () => import("../pages/cart/checkout.vue");


const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/products",
    name: "ProductIndex",
    component: ProductIndex,
    redirect: {path: '/products/list'},
    children: [
      {
        path: "list",
        name: "ListProducts",
        component: ListProducts,
      },
      {
        path: ":id",
        name: "ViewProduct",
        component: ViewProduct,
      },
    ],
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: Checkout,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/admin/login",
    name: "AdminLogin",
    component: AdminLogin,
    meta: {
      strictNoAuth: true,
    },
  },
  {
    path: "/admin",
    name: "Dashboard",
    component: Dashboard,
    redirect: {path: '/admin/products/list'},
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "products",
        name: "DashProductIndex",
        component: DashProductIndex,
        redirect: {path: '/admin/products/list'},
        children: [
          {
            path: "list",
            name: "DashListProducts",
            component: DashListProducts,
          },
          {
            path: "create",
            name: "ProductCreate",
            component: DashProductForm,
          },
          {
            path: ":id/:slug",
            name: "ProductUpdate",
            component: DashProductForm,
          },
        ],
      },
      {
        path: "categories",
        name: "DashCategoryIndex",
        component: DashCategoryIndex,
        redirect: {path: '/admin/categories/list'},
        children: [
          {
            path: "list",
            name: "DashCategoryList",
            component: DashCategoryList,
          },
          {
            path: "create",
            name: "CategoryCreate",
            component: DashCategoryForm,
          },
          {
            path: ":id/:slug",
            name: "CategoryUpdate",
            component: DashCategoryForm,
          },
        ],
      },
      {
        path: "customers",
        name: "DashCustomerIndex",
        component: DashCustomerIndex,
        redirect: {path: '/admin/customers/list'},
        children: [
          {
            path: "list",
            name: "DashCustomerList",
            component: DashCustomerList,
          },
          {
            path: "create",
            name: "CustomerCreate",
            component: DashCustomerForm,
          },
          {
            path: ":id/:slug?",
            name: "CustomerUpdate",
            component: DashCustomerForm,
          },
        ],
      },
      {
        path: "orders",
        name: "DashOrderIndex",
        component: DashOrderIndex,
        redirect: {path: '/admin/orders/list'},
        children: [
          {
            path: "list",
            name: "DashOrderList",
            component: DashOrderList,
          },
          {
            path: "create",
            name: "OrderCreate",
            component: DashOrderForm,
          },
          {
            path: ":id/:slug?",
            name: "OrderUpdate",
            component: DashOrderForm,
          },
        ],
      },
    ],
  },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes
});

router.beforeEach((to, from) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    //for a route that requires auth
    //check if they are authenticated
    if (store.getters.isAuthenticated) {
      //console.log(store.getters.isAuthenticated);
      // check role level
      //check if user is admin
      //check if user is authorized
      // if ( to.meta.permission !== '*' && ! ( store.getters.user.permissions.indexOf( to.meta.permission ) >= 0 ))
      // {
      //   return swal('You are not authorized to view this resource', '', 'error')
      // }
    } else {
      router.push({ name: "AdminLogin" }).catch((err) => {
        //console.log(err);
      });
      return true;
    }
  } else {
    //check if they are authenticated
    if (store.getters.isAuthenticated) {
      //do not access strict non auth routes if authenticated
      //prevents users from going back to: login page, forgot password, register
      if (to.matched.some((record) => record.meta.strictNoAuth)) {
        // return router.push({ name: "Home" }).catch((err) => {
        //   console.log(err);
        // });
        //console.log(`FROM: ${from.name}`);
        return { name: from.name };
      }
    }
  }

  //if requires no auth
  return true;
});

export default router;
