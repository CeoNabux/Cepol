<template>
  <div>
    <the-profile />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import TheProfile from '@/components/TheProfile'
export default {
  layout: 'app',
  components: {
    TheProfile
  },
  mounted() {
    this.resetEditingPost()
  },
  methods: {
    ...mapActions('fireBlogs', ['resetEditingPost'])
  }
}
</script>