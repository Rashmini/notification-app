<template>
  <div class="notification" @click="handleClick">
    <div class="icon-wrapper">
      <div v-if="!notification.read" class="unread-dot"></div>
      <div class="author-icon" :style="{ backgroundColor: getRandomColor() }">
        {{ getUserInitials(notification.author) }}
      </div>
    </div>
    <div class="notification-content">
      <div class="notification-header">
        <span class="title">{{ notification.title }}</span>
      </div>
      <p class="preview-text">{{ notification.preview_text }}</p>
      <div class="notification-footer">
        <span class="author">{{ notification.author }}</span>
        <span class="created">{{ notification.created }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Notification } from '@/types/Notification';

export default defineComponent({
  name: 'NotificationItem',
  props: {
    notification: {
      type: Object as () => Notification,
      required: true,
    },
  },
  methods: {
    getUserInitials(userName: string): string {
      return userName.split(' ').map(name => name[0]).join('');
    },
    getRandomColor(): string {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      return `rgb(${r}, ${g}, ${b})`;
    },
    handleClick(): void {
      this.$emit('notification-click', this.notification);
    },
  },
});
</script>

<style scoped>
.notification {
  display: flex;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
}

.notification-content {
  flex: 1;
  margin-left: 10px;
}

.notification-header {
  font-weight: bold;
  margin-bottom: 10px;
  color: #ddd;
}

.icon-wrapper {
  display: flex;
  align-items: center;
  position: relative;
}

.author-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;
}

.unread-dot {
  width: 6px;
  height: 6px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: -15px;
  transform: translateY(-50%);
}

p.preview-text {
  margin: 5px 0 20px 0;
  color: #ddd;
}

.notification-footer {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
}
</style>
