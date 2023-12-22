import { createStore } from "vuex";
export default createStore({
  state: {
    isLoading: false,
    logedIn: false,
    token: localStorage.getItem("token"),
    name: "",
    roles: "",
    /// add id ///
    id: "",
  },
  getters: {
    isLoading: (state) => state.isLoading,
    logedIn: (state) => state.logedIn,
    token: (state) => state.token,
    name: (state) => state.name,
    roles: (state) => state.roles,
    id: (state) => state.id
  },
  mutations: {
    setLoading(state, item) {
      state.isLoading = item;
    },
    setLogin(state, item) {
      (state.logedIn = item.logedIn),
        (state.name = item.name),
        (state.roles = item.roles),
        (state.id = item.id)
    },
    setAdmin(state, item) {
      state.name = item.name;
      state.roles = item.roles;
      state.id = item.id;

    },
    setToken(state, item) {
      state.token = item;
    },
    setLoginDefault(state) {
      state.logedIn = false;
      state.token = "";
      state.name = "";
      state.roles = "";
      state.id = "";
      state.state = false;
      localStorage.clear();
    },
  },
  actions: {},
  modules: {},
});