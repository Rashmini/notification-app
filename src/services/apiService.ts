import axios, { AxiosResponse } from "axios";
import { Notification } from '@/types/Notification';

// Axios instance for direct requests
const apiClient = axios.create({
  baseURL: "https://testau.asknice.ly/api/v1/candidate-test",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Axios instance for proxied requests
const proxyApiClient = axios.create({
  baseURL: "/api/v1/candidate-test",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

interface ActionResponse {
  success: boolean;
}

export default {
  async getNotifications(): Promise<{ data: Notification[] }> {
    try {
      const response: AxiosResponse<{ data: Notification[] }> =
        await apiClient.get("/mock-notifications");
      return response.data;
    } catch (error: unknown) {
      return Promise.reject(error);
    }
  },
  async performAction(id: string): Promise<ActionResponse> {
    try {
      const response: AxiosResponse<ActionResponse> = await proxyApiClient.post(
        "/mock-action",
        {
          id,
          action: "TODO",
        }
      );
      return response.data;
    } catch (error: unknown) {
      return Promise.reject(error);
    }
  },
};
