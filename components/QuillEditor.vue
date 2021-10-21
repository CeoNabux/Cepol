<template>
  <div>
    <client-only>
      <quill-editor ref="content" :options="editorOption" v-model="content" />
    </client-only>
  </div>
</template>

<script>
export default {
  content: '<p>Estamos trabajando para el editor</p>',
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block']
    ]
  }
}
</script>
