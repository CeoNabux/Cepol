<template>
  <div>
    <client-only>
      <quill-editor ref="content" :options="editorOption" v-model="content" />
    </client-only>
  </div>
</template>

<script>
export default {
  data: () => ({
    editorOption: {
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          ['formula']
        ]
      }
    }
  })
}
</script>
