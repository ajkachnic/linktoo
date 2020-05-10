<template>
  <div>
    <div class="editorx_body">
      <!--editorjs id-->
      <div id="codex-editor" class />
    </div>
    <button type="button" name="button" @click="save()">
      Save
    </button>
  </div>
</template>

<script>
import EditorJS from '@editorjs/editorjs'
import Header from '@editorjs/header'
import Paragraph from '@editorjs/paragraph'
import List from '@editorjs/list'
import Marker from '@editorjs/marker'
import Link from '@editorjs/link'

export default {
  props: {
    value: {
      default: null,
      type: Object
    }
  },
  data() {
    return {
      dataValue: this.value
    }
  },
  mounted() {
    this.myEditor()
  },
  methods: {
    save() {
      this.editor.save().then((savedData) => {
        this.dataValue = savedData
        this.$emit('saved', savedData)
      })
    },
    myEditor() {
      this.editor = new EditorJS({
        holder: 'codex-editor',
        autofocus: true,
        placeholder:
          'Type in this editor. Highlight text and click the link icon to add links',
        initialBlock: 'paragraph',
        tools: {
          header: {
            class: Header,
            shortcut: 'CMD+SHIFT+H'
          },
          list: {
            class: List
          },
          paragraph: {
            class: Paragraph,
            config: {
              placeholder: '.'
            }
          },
          marker: {
            class: Marker
          },
          link: {
            class: Link,
            config: {
              endpoint: '/api/preview'
            }
          }
        },
        data: this.dataValue
      })
    }
  }
}
</script>

<style lang="css" scoped>
.editorx_body {
  /* width: 62%;
  margin-left: 15%; */
  width: 90%;
  max-width: 25rem;
  border: 2px solid #f1f3f5;
  box-sizing: border-box;
}
.ce-block--focused {
  background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(9, 9, 121, 0.5438550420168067) 35%,
    rgba(0, 212, 255, 1) 100%
  );
}
</style>
