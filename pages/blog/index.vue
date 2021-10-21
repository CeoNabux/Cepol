<template>
  <div>
    aqui vamos a poner los blogs
    <div class="w-full lg:w-1/2">
      <div class="w-full px-2">
        <quill-editor v-model="quill" />
      </div>
      <c-button name="Guardar" class="bg-secondary" @click="sendData" />
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    editor: ''
  }),
  methods: {
    sendData() {
      const editorData = this.quill
      console.log(editorData)
    }
  }
}
</script>


