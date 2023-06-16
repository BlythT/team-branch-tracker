<template>
  <div>
    <div class="kanban-board">
      <div class="column">
        <h2>Unassigned</h2>
        <div class="card" v-for="(card, index) in unassignedCards" :key="index">
          {{ card.name }}
          <button class="delete-button" @click="removeCard('unassigned', index)">🗑</button>
        </div>
      </div>
      <div class="column" v-for="(column, index) in columns" :key="index">
        <h2 v-if="column.name !== ''">{{ column.name }}</h2>
        <h2 v-else>Column {{index}}</h2>
        <button class="delete-button" @click="removeColumn(index)">🗑</button>
        <button @click="addCardToColumn(index)">Add Card</button>
        <div class="card" v-for="(card, cardIndex) in column.cards" :key="cardIndex">
          {{ card.name }}
          <button class="delete-button" @click="removeCard(`columns/${index}`, cardIndex)">🗑</button>
        </div>
      </div>
    </div>
    <div>
    <div class="add-card-container">
      <form @submit.prevent="addCard()">
        <input type="text" v-model="newCardName" placeholder="Enter a new card name" required>
        <button type="submit">Add Card</button>
      </form>
    </div>
  </div>
  <div class="add-column-container">
    <form @submit.prevent="addColumn">
      <input type="text" v-model="newColumnName" placeholder="Enter a new column name" required>
      <button type="submit">Add Column</button>
    </form>
  </div>
  </div>
</template>

<script>
import db from '../firebase.js';
import { ref, onValue, push, remove } from 'firebase/database';

function randomName() {
  return Math.random().toString(36).substring(7);
}

export default {
  data() {
    return {
      unassignedCards: [],
      columns: [],
      newCardName: '',
      newColumnName: '',
    };
  },
  created() {
    const columnsRef = ref(db, 'columns');
    const unassignedRef = ref(db, 'unassigned/cards');

    onValue(unassignedRef, (snapshot) => {
      const unassignedData = snapshot.val();
      console.log(unassignedData)

      if (unassignedData === null || !unassignedData) {
        this.unassignedCards = [];
      }

      this.unassignedCards = unassignedData
    });

    onValue(columnsRef, (snapshot) => {
      const columnsData = snapshot.val();
      console.log(columnsData)
      if (columnsData === null || !columnsData) {
        this.columns = [];
      }

      this.columns = columnsData;
    });
  },
  methods: {
    addColumn () {
      console.log('add column')
      const columnsRef = ref(db, 'columns');
      const newColumn = {
        name: this.newColumnName,
        cards: [],
      };

      push(columnsRef, newColumn)
          .then(() => {
            this.newColumnName = '';
          })
          .catch((error) => {
            console.error('Failed to add column:', error);
          });
    },
    addCard() {
      console.log('add card')
      const unassignedRef = ref(db, 'unassigned/cards');
      const newCard = {
        name: this.newCardName,
      };

      push(unassignedRef, newCard)
          .then(() => {
            this.newCardName = '';
          })
          .catch((error) => {
            console.error('Failed to add card:', error);
          });
    },
    addCardToColumn(index) {
      console.log(`add card to column ${index}`)
      const columnRef = ref(db, `columns/${index}/cards`);
      const newCard = {
        name: randomName(),
      };

      push(columnRef, newCard)
          .catch((error) => {
            console.error('Failed to add card to column:', error);
          });
    },
    removeColumn(column) {
      console.log(`remove column ${column}`)
      const columnRef = ref(db, `columns/${column}`);

      remove(columnRef)
          .catch((error) => {
            console.error('Failed to remove column:', error);
          });
    },
    removeCard(location, card) {
      console.log(`remove card ${location} ${card}`)
      const cardRef = ref(db, `${location}/cards/${card}`);

      remove(cardRef)
          .catch((error) => {
            console.error('Failed to remove card:', error);
          });
    },
  },
};
</script>

<style>
.kanban-board {
  display: flex;
}

.column {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 10px;
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  min-width: 200px; /* Adjust the value as per your preference */
  min-height: 500px; /* Adjust the value as per your preference */
}

.card {
  position: relative;
  padding: 10px;
  margin: 5px 0;
  background-color: #f0f0f0;
  border-radius: 5px;
  min-width: 180px; /* Adjust the value as per your preference */
  min-height: 100px; /* Adjust the value as per your preference */
}

.delete-button i {
  color: red;
}

.add-card-container {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.add-card-container input {
  flex: 1;
  margin-right: 10px;
}

.add-card-container button {
  padding: 5px 10px;
}

.add-column-container {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.add-column-container input {
  flex: 1;
  margin-right: 10px;
}

.add-column-container button {
  padding: 5px 10px;
}
</style>