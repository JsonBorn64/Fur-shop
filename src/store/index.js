import { createStore } from 'vuex'
import { db } from '@/firebase/firebase.js'
import { collection, getDocs } from "firebase/firestore";

export default createStore({
  state () {
    return {
      furs: [],
      fursLoaded: false
    }
  },
  getters: {
    topThreeFurs(state) {
      return [...state.furs].sort((a, b) => b.Orders - a.Orders).slice(0,3);
    },
  },
  mutations: {
    pushFur(state, fur) {
      state.furs.push(fur)
    },
    setFursLoaded(state, bool) {
      state.fursLoaded = bool
    },
  },
  actions: {
    async getData({state, commit}) {
      commit('setFursLoaded', false);
      const querySnapshot = await getDocs(collection(db, "Furs"));
      querySnapshot.forEach(doc => {
        commit('pushFur', {
          id: doc.id,
          ...doc.data()
        })
      })
      commit('setFursLoaded', true);
    },
  }
})