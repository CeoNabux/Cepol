import Vue from 'vue'
import katex from 'katex'
import 'katex/dist/katex.min.css'

Vue.use(katex, {
  mounted() {
    window.katex = katex
  }
})