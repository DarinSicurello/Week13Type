import { API_KEY1 } from './key';

export function setupCreate(formEl: HTMLFormElement) {
  let userToken: string | null = null; // API Token required for Delete storage if needed later

  /* Type definition for expected POST response Declared! / Not used
  interface UserResponse {
    id?: string;
    token?: string;
    [key: string]: unknown;
  }
  */

  console.log('Looking for .form element...');
  console.log('formEl is:', formEl);

  formEl.addEventListener('submit', async (event: Event) => {
    event.preventDefault();
    console.log('Form submit');

    const formData = new FormData(formEl);
    const data = Object.fromEntries(formData.entries());
    console.log('Form data:', data);

    try {
      const response = await fetch('https://reqres.in/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY1
        },
        body: JSON.stringify(data)
      });

      const json = await response.json();
      console.log('Response API ', json);
      userToken = json.token ?? null;

      // Save Delete token if API provides / Mock response
      if (userToken) sessionStorage.setItem('userToken', userToken);

    } catch (error) {
      console.error('Error submitting form:', (error as Error).message);
    }
  });
}
