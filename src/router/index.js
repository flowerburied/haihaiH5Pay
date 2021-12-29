import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
// import Home from "../views/Home.vue";

const routes = [{
        path: "/",
        name: "voucherCenter",
        component: () =>
            import ("@/views/payhome/voucherCenter.vue"),
    },
    {
        path: "/aliPay",
        name: "aliPay",
        component: () =>
            import ("@/views/payhome/aliPay.vue"),
    },
    {
        path: "/payWithdrawal",
        name: "payWithdrawal",
        component: () =>
            import ("@/views/payhome/payWithdrawal.vue"),
    },
    {
        path: "/Home",
        name: "Home",
        component: () =>
            import ("@/views/Home.vue"),
    },
    {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ("@/views/About.vue"),
    },
    {
        path: "/qrcode",
        name: "qrcode",
        component: () =>
            import ("@/views/QRcode.vue"),
    },
    {
        path: "/field",
        name: "field",
        component: () =>
            import ("@/views/field.vue"),
    },
    {
        path: "/fieldList",
        name: "fieldList",
        component: () =>
            import ("@/views/fieldList.vue"),
    },

    {
        path: "/siguUp",
        name: "siguUp",
        component: () =>
            import ("@/views/siguUp.vue"),
    },
    {
        path: "/ranksList",
        name: "ranksList",
        component: () =>
            import ("@/views/ranksList.vue"),
    },
    {
        path: "/volunteer",
        name: "volunteer",
        component: () =>
            import ("@/views/volunteer.vue"),
    },
];

const router = createRouter({
    history: createWebHashHistory(), //带#号
    // createWebHistory  //不带#号
    routes,
});

export default router;