import { fireStorage, fireDataBase } from '~/plugins/firebase/app'
import {
  getDocs,
  setDoc,
  doc,
  collection,
  updateDoc,
  addDoc,
} from '@firebase/firestore'
import { getDownloadURL, uploadBytes, ref } from '@firebase/storage'

export const state = () => ({
  posts: [],
  loading: false,
})

export const getters = {
  getPosts() {
    return this.posts
  },
}

export const mutations = {
  // recibimos el post creado
  ADD_POST(state, payload) {
    state.posts.push(payload)
  },
  // recibimos los posts que traemos desde firebase
  ADD_POSTS(state, payload) {
    state.post = payload
  },
  LOADING(state, payload) {
    state.loading = payload
  },
}

export const actions = {
  async fetchPosts({ commit }, payload) {
    try {
    } catch (error) {
      console.error
    }
  },
  async savePost({ commit }, payload) {
    commit('LOADING', true)
    try {
      const postRef = doc(collection(fireDataBase, 'posts'))
      const filename = payload.image.name
      const imageNameExt = filename.slice(filename.lastIndexOf('.'))
      const image = payload.image
      const id = postRef.id
      const imageRefs = ref(fireStorage, 'posts/' + id + imageNameExt)
      await uploadBytes(imageRefs, image)
      const url = await getDownloadURL(imageRefs)
      const post = {
        title: payload.title,
        postData: payload.postData,
        image: url,
        published: false,
      }
      await setDoc(postRef, {
        post,
      })
      commit('LOADING', true)
    } catch (error) {
      console.error(error)
    }
  },
}
