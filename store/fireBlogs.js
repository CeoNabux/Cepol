import { fireStorage, fireDataBase } from '~/plugins/firebase/app'
import {
  getDocs,
  setDoc,
  doc,
  collection,
  updateDoc,
  query,
  getDoc,
  where,
} from '@firebase/firestore'
import {
  getDownloadURL,
  uploadBytes,
  ref,
  deleteObject,
} from '@firebase/storage'

export const state = () => ({
  posts: [],
  loading: false,
  postEditing: '',
})

export const getters = {
  getPosts(state) {
    return state.posts
  },
  isLoading(state) {
    return state.loading
  },
  getEditingPost(state) {
    return state.postEditing
  },
}

export const mutations = {
  // recibimos el post creado
  ADD_POST(state, payload) {
    state.posts.push(payload)
  },
  // recibimos los posts que traemos desde firebase
  ADD_POSTS(state, payload) {
    state.posts = payload
  },
  LOADING(state, payload) {
    state.loading = payload
  },
  EDITING_POST(state, payload) {
    // recibimos el id del documento en edicion
    state.postEditing = payload
  },
}

export const actions = {
  async fetchPosts({ commit }, payload) {
    try {
    } catch (error) {
      console.error
    }
  },
  async savePost({ commit, getters }, payload) {
    commit('LOADING', true)
    try {
      const postEditing = getters.getEditingPost
      // Primero verificamos que no exista el post
      if (postEditing === '') {
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
          id: id,
        }
        await setDoc(postRef, {
          post,
        })
        commit('ADD_POST', post)
        commit('EDITING_POST', id)
        commit('LOADING', false)
      }
      // en caso de que si exista se sobreescriben los datos
      else {
        const docRef = doc(fireDataBase, 'posts', postEditing)
        const filename = payload.image.name
        const imageNameExt = filename.slice(filename.lastIndexOf('.'))
        const image = payload.image
        const id = postEditing
        const imageRefs = ref(fireStorage, 'posts/' + id + imageNameExt)
        await deleteObject(imageRefs)
        await uploadBytes(imageRefs)
        const url = await getDownloadURL(imageRefs)
        const post = {
          title: payload.title,
          postData: payload.postData,
          image: url,
          published: false,
        }
        await updateDoc(docRef, {
          post,
        })
        commit('LOADING', false)
      }
    } catch (error) {
      console.error(error)
    }
  },
  async publishPost({ commit, getters }) {
    try {
      commit('LOADING', true)
      const postId = getters.getEditingPost
      const docRef = doc(fireDataBase, 'posts', postId)
      const published = {
        published: true,
      }
      await updateDoc(docRef, published)
      commit('LOADING', false)
    } catch (error) {
      console.error(error)
    }
  },
}
