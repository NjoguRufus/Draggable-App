<template>
  <div>
    <draggable :modelValue="items" @update:modelValue="updateItems" @end="handleDragEnd">
      <div v-for="item in items" :key="item.id" class="item">
        {{ item.name }}  <!-- Use item.name instead of item.text -->
        <button @click="removeItem(item.id)">Remove</button>
      </div>
    </draggable>
    <button @click="addItem">Add Item</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useItemStore } from '@/stores/itemStore';  // Import the Pinia store
import draggable from 'vuedraggable';

export default defineComponent({
  components: { draggable },
  setup() {
    const store = useItemStore();
    const items = store.items;

    // Methods for handling drag events and updating items
    const updateItems = (newItems: { id: number; name: string }[]) => {
      store.updateItemOrder(newItems);
    };

    const handleDragEnd = () => {
      console.log('Drag ended');
    };

    // Add item to the list
    const addItem = () => {
      const newItem = { id: Date.now(), name: 'New Item' };
      store.addItem(newItem);
    };

    // Remove item from the list
    const removeItem = (id: number) => {
      store.removeItem(id);
    };

    return {
      items,
      updateItems,
      handleDragEnd,
      addItem,
      removeItem,
    };
  },
});
</script>

<style scoped>
.item {
  padding: 10px;
  margin: 5px;
  background-color: lightgray;
  border-radius: 5px;
}

button {
  padding: 5px 10px;
  margin-top: 5px;
}
</style>
