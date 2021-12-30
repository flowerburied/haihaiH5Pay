import { createStore } from "vuex";

export default createStore({
    state: {
        test: "6666",
        userinfo: null
    },
    mutations: {
        SET_USER_INFO(state, step) {
            state.userinfo = step
        },
        SET_TEST(state, step) {
            state.test = step
        }
    },
    actions: {
        testFun({ commit, state }, step) {
            console.log("SET_TEST1", state.test)
            commit("SET_TEST", step)
            console.log("SET_TEST2", state.test)
        }
    },
    modules: {},
});