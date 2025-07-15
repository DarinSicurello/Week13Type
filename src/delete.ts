import { API_KEY1 } from './key';

export function setupDelete(deleteBtn: HTMLButtonElement) {
  deleteBtn.addEventListener('click', async () => {
    try {
      // Step 2: DELETE request with token and API key
      const userToken = sessionStorage.getItem('userToken');

      const headers: HeadersInit = {
        'x-api-key': API_KEY1,
        ...(userToken ? { Authorization: `Bearer ${userToken}` } : {}) // Use token if available
      };

      const response = await fetch('https://reqres.in/api/users/2', {
        method: 'DELETE',
        headers
      });

      console.log('Delete response status:', response.status);

      if (response.status === 204) {
        // Mock API response request as it not Real Database.
        console.log('User deleted successfully (mock).');
      } else {
        console.error('ERROR! THIS IS A MOCK ERROR', response.status);
      }

    } catch (err) {
      console.error('Error: THIS IS A MOCK ERROR', (err as Error).message);
    }
  });
}
