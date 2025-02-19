<template>
  <div id="app">
    <h1>Draggable List</h1>

    <div class="input-container">
      <input v-model="newItemName" type="text" placeholder="Enter item name..." />
      <button @click="addItem">Add Item</button>
    </div>

    <draggable v-model="items" @end="handleDragEnd" itemKey="id" class="draggable-list">
      <template #item="{ element }">
        <div :key="element.id" class="item">
          {{ element.name }}
          <button class="remove-btn" @click="removeItem(element.id)">✖</button>
        </div>
      </template>
    </draggable>

    <div class="button-container">
      <button @click="saveItems">Save</button>
      <button @click="shareItems">Share</button>
    </div>

    <p v-if="message" class="message">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useItemStore } from '@/stores/itemStore';
import draggable from 'vuedraggable';
import { firestore, database } from '@/utils/firebaseConfig';
import { set, ref as dbRef } from 'firebase/database';
import { collection, addDoc } from 'firebase/firestore';

// Store management
const store = useItemStore();
const items = ref([...store.items]); // Create a reactive copy of store items
const newItemName = ref('');
const message = ref('');

// Watch store changes and update items
watch(() => store.items, (newItems) => {
  items.value = [...newItems];
}, { deep: true });

// Handle drag end event
const handleDragEnd = () => {
  store.updateItemOrder(items.value);
};

// Add new item
const addItem = () => {
  if (newItemName.value.trim() === '') {
    message.value = "Item name cannot be empty!";
    return;
  }

  const newItem = {
    id: Date.now(),
    name: newItemName.value.trim()
  };

  store.addItem(newItem);
  newItemName.value = '';
  message.value = "Item added successfully!";
};

// **Fix: Properly remove an item**
const removeItem = (id: number) => {
  store.removeItem(id);
  items.value = [...store.items]; // Update items array after removing
  message.value = "Item removed!";
};

// Save items (debugging)
const saveItems = () => {
  console.log('Current Item Order:', items.value);
  message.value = "Items saved!";
};

// Share items to Firebase
const shareItems = async () => {
  try {
    await saveItemsToFirestore(items.value);
    await saveItemsToRealtimeDatabase(items.value);
    message.value = "Items shared successfully!";
  } catch (error) {
    console.error('Error saving data:', error);
    message.value = "Error sharing items!";
  }
};

// Save to Firestore
const saveItemsToFirestore = async (items: any[]) => {
  try {
    const docRef = await addDoc(collection(firestore, 'items'), { items });
    console.log('Document written with ID:', docRef.id);
  } catch (e) {
    console.error('Error adding document to Firestore:', e);
  }
};

// Save to Firebase Realtime Database
const saveItemsToRealtimeDatabase = async (items: any[]) => {
  const itemsRef = dbRef(database, 'items/');
  try {
    await set(itemsRef, items);
    console.log('Items saved to Realtime Database!');
  } catch (error) {
    console.error('Error saving items to Realtime Database:', error);
  }
};
</script>

<style scoped>
/* Modern Styling */
#app {
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
  text-align: center;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #333;
  font-size: 1.8rem;
}

/* Input & Button Styling */
.input-container {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

input {
  flex: 1;
  padding: 10px;
  border: 2px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
}

button {
  padding: 10px 15px;
  border: none;
  background: #007bff;
  color: white;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  background: #0056b3;
}

/* Draggable List */
.draggable-list {
  padding: 10px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  margin: 5px 0;
  background: #e9ecef;
  border-radius: 5px;
  cursor: grab;
  font-weight: 500;
  transition: 0.3s;
}

.item:hover {
  background: #dee2e6;
}

/* Remove Button */
.remove-btn {
  background: #dc3545;
  color: white;
  font-size: 0.8rem;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
  border: none;
}

.remove-btn:hover {
  background: #c82333;
}

/* Button Container */
.button-container {
  margin-top: 20px;
  display: flex;
  gap: 10px;
  justify-content: center;
}

/* Message Display */
.message {
  margin-top: 15px;
  font-size: 1rem;
  color: #28a745;
  font-weight: 500;
}
</style>
