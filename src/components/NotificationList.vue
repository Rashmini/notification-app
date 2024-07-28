<template>
  <notifications />
  <div class="notifications-container">
    <div class="header">Notifications</div>
    <div class="notifications-list">
      <NotificationItem v-for="notification in notifications" :key="notification.id" :notification="notification"
        @notification-click="handleNotificationClick" />
      <div v-if="loading" class="loading">Loading...</div>
    </div>
    <PageFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import apiService from '@/services/apiService';
import { Notification } from '@/types/Notification';
import NotificationItem from './NotificationItem.vue';
import PageFooter from './PageFooter.vue';

export default defineComponent({
  name: 'NotificationList',
  components: {
    NotificationItem,
    PageFooter
  },
  data() {
    return {
      notifications: [] as Notification[],
      loading: false
    };
  },
  mounted() {
    this.fetchNotifications();
  },
  methods: {
    async fetchNotifications(): Promise<void> {
      this.loading = true;
      try {
        const response = await apiService.getNotifications();
        this.notifications = response.data.map((notification: Notification) => ({
          ...notification,
        }));
      } catch (error: unknown) {
        console.error('Error fetching notifications:', error);
        this.$notify({
          type: 'error',
          title: 'Error',
          text: `Error in fetching notifications.`,
        });
      } finally {
        this.loading = false;
      }
    },
    async handleNotificationClick(notification: Notification): Promise<void> {
      if (notification.available_actions?.includes('CREATE_TODO')) {
        try {
          await apiService.performAction(notification.id);
          this.$notify({
            type: 'success',
            title: 'Success',
            text: 'Action performed successfully.'
          });
        } catch (error: unknown) {
          console.error('Error performing action:', error);
          this.$notify({
            type: 'error',
            title: 'Error',
            text: `Error in performing action.`
          });
        }
      }
    }
  }
});
</script>

<style scoped>
.notifications-container {
  padding: 0;
  max-width: 400px;
  margin: 0 auto;
  background: linear-gradient(#6b097a, #274bdb);
  color: white;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.notifications-list {
  overflow-y: auto;
  flex-grow: 1;
  padding: 0 20px;
}
</style>
