import {createStore} from "vuex";
export default createStore({
  state: {
    isLoading: false,
    logedIn: false,
    token: localStorage.getItem("token"),
    name: "",
    roles: "",
  },
  getters: {
    isLoading: (state) => state.isLoading,
    logedIn: (state) => state.logedIn,
    token: (state) => state.token,
    name: (state) => state.name,
    roles: (state) => state.roles
  },
  mutations: {
    setLoading(state, item) {
      state.isLoading = item;
    },
    setLogin(state, item) {
      (state.logedIn = item.logedIn),
        (state.name = item.name),
        (state.roles = item.roles)
    },
    setAdmin(state, item) {
      state.name = item.name;
      state.roles = item.roles;
    },
    setToken(state, item) {
      state.token = item;
    },
    setLoginDefault(state) {
      state.logedIn = false;
      state.token = "";
      state.name = "";
      state.roles = "";
      state.state = false;
      localStorage.clear();
    },
  },
  actions: {},
  modules: {},
});