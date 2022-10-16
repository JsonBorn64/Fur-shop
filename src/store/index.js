import { createStore } from 'vuex'
import { db, auth } from '@/firebase/firebase.js'
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default createStore({
  state () {
    return {
      furs: [],
      fursLoaded: false,
      isAuth: false,
      uid: null,
      userName: null
    }
  },
  getters: {
    topFurs: (state) => (count) => {
      return [...state.furs].sort((a, b) => b.Orders - a.Orders).slice(0,count);
    },
    specialFurById: (state) => (id) => {
      return state.furs.find(fur => fur.id === id)
    }
  },
  mutations: {
    pushFur(state, fur) {
      state.furs.push(fur)
    },
    clearFurs(state) {
      state.furs = []
    },
    setFursLoaded(state, bool) {
      state.fursLoaded = bool
    },
    setIsAuth(state, bool) {
      state.isAuth = bool
    },
    setUid(state, uid) {
      state.uid = uid
    },
    setUserName(state, name) {
      state.userName = name
    },
  },
  actions: {
    async getData({state, commit}) {
      commit('setFursLoaded', false);
      commit('clearFurs');
      const querySnapshot = await getDocs(collection(db, "Furs"));
      querySnapshot.forEach(doc => {
        commit('pushFur', {
          id: doc.id,
          ...doc.data()
        })
      })
      commit('setFursLoaded', true);
    },
    getAuthState({state, commit}) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          const name = user.displayName
          commit('setIsAuth', true);
          commit('setUid', uid);
          commit('setUserName', name);
        } else {
          commit('setIsAuth', false);
          commit('setUid', null);
          commit('setUserName', null);
        }
      });
    }
  }
})