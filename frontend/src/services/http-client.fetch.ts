import { IHttpClient } from '~/interfaces/interface.httpClient';
import { toast } from 'sonner';

export class FetchHttpClient implements IHttpClient {
  private baseURL: string;
  private abortController: AbortController;
  private signal: AbortSignal;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.abortController = new AbortController();
    this.signal = this.abortController.signal;
  }

  private async request<T>(url: string, options: RequestInit) {
    options.signal = this.signal;

    const headers = new Headers(options.headers);
    headers.append('Accept', 'application/json');
    headers.append('device-os', 'portal');

    const hasToken = localStorage.getItem('@token');
    if (hasToken) {
      headers.append('Authorization', `Bearer ${hasToken}`);
    }

    options.headers = headers;

    try {
      const response = await fetch(`${this.baseURL}${url}`, { cache: 'no-cache', ...options });

      if (!response.ok) {
        if (response.status === 401) {
          this.abortController.abort();
          toast.error('Não autorizado');
          localStorage.removeItem('@accessToken');
          setTimeout(() => (window.location.href = '/login'), 1000);
        }

        if (response.status >= 500) {
          toast.error('Ocorreu um erro inesperado, tente novamente mais tarde');
        }

        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  }

  async get<T>(url: string, config?: RequestInit): Promise<T> {
    return this.request<T>(url, { method: 'GET', ...config });
  }

  async post<T>(url: string, data: any, config?: RequestInit): Promise<T> {
    return this.request<T>(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      ...config,
    });
  }

  async put<T>(url: string, data: any, config?: RequestInit): Promise<T> {
    return this.request<T>(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      ...config,
    });
  }

  async delete<T>(url: string, config?: RequestInit): Promise<T> {
    return this.request<T>(url, { method: 'DELETE', ...config });
  }

  async patch<T>(url: string, data: any, config?: RequestInit): Promise<T> {
    return this.request<T>(url, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      ...config,
    });
  }
}
