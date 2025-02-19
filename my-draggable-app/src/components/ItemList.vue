<template>
  <div>
    <Draggable 
      :modelValue="items" 
      @update:modelValue="updateItems" 
      @end="handleDragEnd"
      itemKey="id"  <!-- Correct comment placement -->
    >
      <div v-for="item in items" :key="item.id">
        {{ item.name }}
      </div>
    </Draggable>
  </div>
</template>

<script>
import Draggable from 'vuedraggable';

export default {
  components: {
    Draggable
  },
  data() {
    return {
      items: [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' },
      ],
    };
  },
  methods: {
    updateItems(newItems) {
      this.items = newItems;
    },
    handleDragEnd() {
      console.log('Drag ended');
    },
  },
};
</script>

<style scoped>
/* You can add styles here if necessary */
</style>
