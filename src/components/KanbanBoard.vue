<script setup>
import { Container, Draggable } from 'vue3-smooth-dnd'
</script>

<template>
  <div>
    <div class="kanban-board">
      <div class="card-column">
        <div class="card-column-header">
          <h2>Unassigned</h2>
        </div>
        <Container group-name="col-items" class="col-drag-container" :get-child-payload="getCardPayload('unassigned')" @drop="(e) => onCardDrop('unassigned', e)">
          <Draggable v-for="(card, cardIndex) in unassignedColumn.cards" :key="cardIndex">
            <div class="card">
              {{ card.name }}
              <button class="delete-button" @click="removeCard('unassigned', cardIndex)" >
                <svg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><rect width='24' height='24' stroke='none' fill='#000000' opacity='0'/>
                  <g transform="matrix(1.54 0 0 1.54 12 12)" >
                    <path style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" translate(-7.5, -7.5)" d="M 6.496094 1 C 5.675781 1 5 1.675781 5 2.496094 L 5 3 L 2 3 L 2 4 L 3 4 L 3 12.5 C 3 13.324219 3.675781 14 4.5 14 L 10.5 14 C 11.324219 14 12 13.324219 12 12.5 L 12 4 L 13 4 L 13 3 L 10 3 L 10 2.496094 C 10 1.675781 9.324219 1 8.503906 1 Z M 6.496094 2 L 8.503906 2 C 8.785156 2 9 2.214844 9 2.496094 L 9 3 L 6 3 L 6 2.496094 C 6 2.214844 6.214844 2 6.496094 2 Z M 4 4 L 11 4 L 11 12.5 C 11 12.78125 10.78125 13 10.5 13 L 4.5 13 C 4.21875 13 4 12.78125 4 12.5 Z M 5 5 L 5 12 L 6 12 L 6 5 Z M 7 5 L 7 12 L 8 12 L 8 5 Z M 9 5 L 9 12 L 10 12 L 10 5 Z" stroke-linecap="round" />
                  </g>
                </svg>
              </button>
            </div>
          </Draggable>
        </Container>
      </div>
      <div class="card-column" v-for="(column, columnIndex) in columns" :key="columnIndex">
        <div class="card-column-header">
          <h2 v-if="column.name !== ''">{{ column.name }}</h2>
          <h2 v-else>Column {{columnIndex}}</h2>
          <button class="delete-button-column" @click="removeColumn(columnIndex)">
            <svg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><rect width='24' height='24' stroke='none' fill='#000000' opacity='0'/>
              <g transform="matrix(1.54 0 0 1.54 12 12)" >
                <path style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" translate(-7.5, -7.5)" d="M 6.496094 1 C 5.675781 1 5 1.675781 5 2.496094 L 5 3 L 2 3 L 2 4 L 3 4 L 3 12.5 C 3 13.324219 3.675781 14 4.5 14 L 10.5 14 C 11.324219 14 12 13.324219 12 12.5 L 12 4 L 13 4 L 13 3 L 10 3 L 10 2.496094 C 10 1.675781 9.324219 1 8.503906 1 Z M 6.496094 2 L 8.503906 2 C 8.785156 2 9 2.214844 9 2.496094 L 9 3 L 6 3 L 6 2.496094 C 6 2.214844 6.214844 2 6.496094 2 Z M 4 4 L 11 4 L 11 12.5 C 11 12.78125 10.78125 13 10.5 13 L 4.5 13 C 4.21875 13 4 12.78125 4 12.5 Z M 5 5 L 5 12 L 6 12 L 6 5 Z M 7 5 L 7 12 L 8 12 L 8 5 Z M 9 5 L 9 12 L 10 12 L 10 5 Z" stroke-linecap="round" />
              </g>
            </svg>
          </button>
        </div>
        <Container group-name="col-items" class="col-drag-container" :get-child-payload="getCardPayload(columnIndex)" @drop="(e) => onCardDrop(columnIndex, e)">
          <Draggable v-for="(card, cardIndex) in column.cards" :key="cardIndex">
            <div class="card">
              {{ card.name }}
              <button class="delete-button" @click="removeCard(columnIndex, cardIndex)">
                <svg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><rect width='24' height='24' stroke='none' fill='#000000' opacity='0'/>
                  <g transform="matrix(1.54 0 0 1.54 12 12)" >
                    <path style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" translate(-7.5, -7.5)" d="M 6.496094 1 C 5.675781 1 5 1.675781 5 2.496094 L 5 3 L 2 3 L 2 4 L 3 4 L 3 12.5 C 3 13.324219 3.675781 14 4.5 14 L 10.5 14 C 11.324219 14 12 13.324219 12 12.5 L 12 4 L 13 4 L 13 3 L 10 3 L 10 2.496094 C 10 1.675781 9.324219 1 8.503906 1 Z M 6.496094 2 L 8.503906 2 C 8.785156 2 9 2.214844 9 2.496094 L 9 3 L 6 3 L 6 2.496094 C 6 2.214844 6.214844 2 6.496094 2 Z M 4 4 L 11 4 L 11 12.5 C 11 12.78125 10.78125 13 10.5 13 L 4.5 13 C 4.21875 13 4 12.78125 4 12.5 Z M 5 5 L 5 12 L 6 12 L 6 5 Z M 7 5 L 7 12 L 8 12 L 8 5 Z M 9 5 L 9 12 L 10 12 L 10 5 Z" stroke-linecap="round" />
                  </g>
                </svg>
              </button>
            </div>
          </Draggable>
        </Container>
      </div>
    </div>
    <div>
    <div class="add-card-container">
      <form @submit.prevent="addCardToColumn('unassigned')">
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
import { ref, onValue, set} from 'firebase/database';

function randomName() {
  return Math.random().toString(36).substring(7);
}

export default {
  data() {
    return {
      unassignedColumn: [],
      columns: [],
      newCardName: '',
      newColumnName: '',
    };
  },
  created() {
    const columnsRef = ref(db, 'columns');
    const unassignedRef = ref(db, 'unassigned');

    onValue(unassignedRef, (snapshot) => {
      const unassignedData = snapshot.val();

      if (unassignedData === null || !unassignedData) {
        this.unassignedColumn = [];
      } else {
        this.unassignedColumn = unassignedData;
      }
    });

    onValue(columnsRef, (snapshot) => {
      const columnsData = snapshot.val();
      if (columnsData === null || !columnsData) {
        this.columns = [];
      } else {
        this.columns = columnsData;
      }
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

      this.columns.push(newColumn)
      set(columnsRef, this.columns)
          .then(() => {
            this.newColumnName = '';
          })
          .catch((error) => {
            console.error('Failed to add column:', error);
          });
    },
    addCardToColumn(columnIndex) {
      let columnRef = ref(db, `columns/${columnIndex}/cards`);
      let targetColumn = this.columns[columnIndex];

      // special case for unassigned column
      if (columnIndex === 'unassigned') {
        columnRef = ref(db, 'unassigned/cards');
        targetColumn = this.unassignedColumn;
      }
      console.log(`add card to column ${columnIndex}`)

      const newCard = {
        name: this.newCardName,
      };

      if (!targetColumn.cards) {
        targetColumn.cards = [];
      }
      targetColumn.cards.push(newCard)
      set(columnRef, targetColumn.cards)
          .then(() => {
            this.newCardName = '';
          })
          .catch((error) => {
            console.error('Failed to add card to column:', error);
          });
    },
    addCardToColumnAtIndex(card, columnIndex, cardIndex) {
      let columnRef = ref(db, `columns/${columnIndex}/cards`);
      let targetColumn = this.columns[columnIndex];
      // special case for unassigned column
      if (columnIndex === 'unassigned') {
        columnRef = ref(db, 'unassigned/cards');
        targetColumn = this.unassignedColumn;
      }

      console.log(`add card to column ${columnIndex} at index ${cardIndex}`)

      if (!targetColumn.cards) {
        targetColumn.cards = [];
      }
      targetColumn.cards.splice(cardIndex, 0, card)
      set(columnRef, targetColumn.cards)
          .catch((error) => {
            console.error('Failed to add card to column:', error);
          });
    },
    removeColumn(index) {
      console.log(`remove column ${index}`)
      const columnRef = ref(db, `columns`);

      this.columns.splice(index, 1)
      set(columnRef, this.columns)
          .catch((error) => {
            console.error('Failed to remove column:', error);
          });
    },
    removeCard(columnIndex, cardIndex) {
      console.log(`remove card ${columnIndex} ${cardIndex}`)
      let cardRef = ref(db, `columns/${columnIndex}/cards`);
      let targetColumn = this.columns[columnIndex];
      // special case for unassigned column
      if (columnIndex === 'unassigned') {
        cardRef = ref(db, 'unassigned/cards');
        targetColumn = this.unassignedColumn;
      }
      
      if (!targetColumn.cards) {
        return
      }

      targetColumn.cards.splice(cardIndex, 1)
      set(cardRef, targetColumn.cards)
          .catch((error) => {
            console.error('Failed to remove card:', error);
          });
    },
    onCardDrop(column, dropResult) {
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
        if (dropResult.removedIndex !== null) {
          console.log(`remove ` + JSON.stringify(dropResult.payload) + ` at index ${dropResult.removedIndex} from column ${column}`)
          this.removeCard(column, dropResult.removedIndex)
        }
        if (dropResult.addedIndex !== null) {
          console.log(`add ` + JSON.stringify(dropResult.payload) + ` at index ${dropResult.addedIndex} to column ${column}`)
          this.addCardToColumnAtIndex(dropResult.payload, column, dropResult.addedIndex)
        }
      }
    },
    getCardPayload(colIndex) {
      return cardIndex => {
        switch (colIndex) {
          case 'unassigned':
            console.log(`get card payload ${colIndex} ${cardIndex}`)
            console.log(this.unassignedColumn.cards[cardIndex])
            return this.unassignedColumn.cards[cardIndex];
          default:
            console.log(`get card payload ${colIndex} ${cardIndex}`)
            console.log(this.columns[colIndex].cards[cardIndex])
            return this.columns[colIndex].cards[cardIndex];
        }
      };
    }
  },
};
</script>

<style>
.kanban-board {
  display: flex;
}

.col-drag-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.card-column {
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
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}

.delete-button {
  outline: none;
  border: none;
  cursor: pointer;
  background: none;
  position: absolute;
  top: 5px;
  right: 1px;
}

.delete-button-column {
  outline: none;
  border: none;
  cursor: pointer;
  background: none;
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

.card-column-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

/* Optional styles */
.card-column-header h2 {
  margin-right: 10px;
}
</style>