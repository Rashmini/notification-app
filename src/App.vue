<template>
  <div id="app">
    <NotificationList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NotificationList from './components/NotificationList.vue';

export default defineComponent({
  name: 'App',
  components: {
    NotificationList
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: small;
}

.header {
  text-align: center;
  padding: 10px;
  color: white;
  font-size: 18px;
  position: sticky;
  top: 0;
  z-index: 1;
  border-bottom: 1px solid white;
}

.footer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #2f384c;
  color: #ddd;
  padding: 10px;
  font-weight: bold;
}

.footer span {
  cursor: pointer;
}

.footer .active {
  pointer-events: none;
  color: rgba(255, 255, 255, 0.6);
}

.loading {
  text-align: center;
  padding: 20px;
  color: white;
}

::-webkit-scrollbar {
  width: 0px;
}
</style>
