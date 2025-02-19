import { defineStore } from 'pinia';

export const useItemStore = defineStore('itemStore', {
  state: () => ({
    items: [
      { id: 1, name: 'Task A' },
      { id: 2, name: 'Task B' },
      { id: 3, name: 'Task C' }
    ],
  }),
  actions: {
    updateItemOrder(updatedItems: { id: number; name: string }[]) {
      this.items = updatedItems;
    },
    addItem(item: { id: number; name: string }) {
      this.items.push(item);
    },
    removeItem(id: number) {
      this.items = this.items.filter(item => item.id !== id);
    }
  },
});
