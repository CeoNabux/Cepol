<template>
  <div class="w-full">
    <div class="w-full lg:w-1/2 px-2 pt-4">
      <h1 class="text-gray-700 text-3xl font-medium mb-8">
        Empecemos a escribir al increíble
      </h1>
      <div class="w-full">
        <quill-editor v-model="editorData" />
      </div>
      <div class="w-full lg:w-1/2 mt-12">
        <c-button name="Guardar" class="bg-secondary" @click="sendData" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    editorData: '',
  }),
  methods: {
    sendData() {
      const editorData = this.editorData
      console.log(editorData)
    },
  },
}
</script>
