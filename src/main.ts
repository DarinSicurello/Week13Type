import { API_KEY1 } from './key';

console.log('API Key is:', API_KEY1 );
console.log("Script loaded")

// Assert their types, and check for Typescript null

const formEl = document.querySelector('.form') as HTMLFormElement | null;
const deleteBtn = document.getElementById('delete-user') as HTMLButtonElement | null;

let userToken: string | null = null; // API Token required for Delete storage if needed later

/* Type definition for expected POST response Delcared! / Not used
interface UserResponse {
  id?: string;
  token?: string;
  [key: string]: unknown;
}
*/ 
console.log('Looking for .form element...');
console.log('formEl is:', formEl);

if (formEl) {
  console.log('Form found and listener imported');
  

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
    } catch (error) {
      console.error('Error submitting form:', (error as Error).message);
    }
  });
}


// DELETE API Call
if (deleteBtn) {
  deleteBtn.addEventListener('click', async () => {
    try {
      // Step 2: DELETE request with token and API key
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
