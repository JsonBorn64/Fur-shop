import { createStore } from 'vuex'
import { db, auth } from '@/firebase/firebase.js'
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default createStore({
  state () {
    return {
      furs: [],
      fursLoaded: false,
      isAuth: false,
      uid: null,
      userName: null,
      editableContent: {},
      favorites: JSON.parse(localStorage.getItem('favorites')),
      favoritesIds: JSON.parse(localStorage.getItem('favorites'))?.map(item => item.id) || [],
      cartItems: JSON.parse(localStorage.getItem('cart')),
      cartItemsIds: JSON.parse(localStorage.getItem('cart'))?.map(item => item.id) || [],
    }
  },
  getters: {
    topFurs: (state) => (count) => {
      return [...state.furs].sort((a, b) => b.Orders - a.Orders).slice(0, count);
    },
    specialFurById: (state) => (id) => {
      return state.furs.find(fur => fur.id === id)
    },
    topFileredFurs: (state) => (count, ids) => {
      let furs = state.furs
      furs = furs.filter(item => !ids.includes(item.id))
      if (furs.length < 1) return null
      return furs.sort((a, b) => b.Orders - a.Orders).slice(0, count);
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
    updateFavorites(state) {
      state.favorites = JSON.parse(localStorage.getItem('favorites'))
      state.favoritesIds = JSON.parse(localStorage.getItem('favorites')).map(item => item.id)
    },
    updateCart(state) {
      state.cartItems = JSON.parse(localStorage.getItem('cart'))
      state.cartItemsIds = JSON.parse(localStorage.getItem('cart')).map(item => item.id)
    },
    setEditableContent(state, content) {
      state.editableContent = content
    }
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
    },
    async getEditableContent({state, commit}) {
      const docRef = doc(db, "EditableContent", "fields");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        commit('setEditableContent', docSnap.data());
      } else {
        console.log("No such document!");
      }
    }
  }
})