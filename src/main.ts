import { API_KEY1 } from './key';

// assert their types, and check for Typescript null
const formEl = document.querySelector('.form') as HTMLFormElement | null;
const deleteBtn = document.getElementById('delete-user') as HTMLButtonElement | null;

let userToken: string | null = null; // API Token required for Delete storage if needed later

// My submit button
if (formEl) {
  formEl.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(formEl);
    const data = Object.fromEntries(formData.entries()); // Convert FormData to object

    // const API_KEY1 = 'reqres-free-v1'; // API Key (now imported from key.ts)

    // console.log(data);      *** Simple Check Form #1

    //      *** Simple fetch API Form #2
    fetch('https://reqres.in/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY1 // Imported / Export Key.ts turned on directly
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(response => {
        console.log(response); // *** Simple Check Form #3
        // Save  Delete token if API provides / Mock response
        userToken = response.token ?? null;
      })
      .catch(error => console.log(error));
  });
}

// DELETE API Call
if (deleteBtn) {
  deleteBtn.addEventListener('click', () => {
    // Step 2: DELETE request with token and API key
    fetch('https://reqres.in/api/users/2', {
      method: 'DELETE',
      headers: {
        'x-api-key': API_KEY1,
        ...(userToken ? { Authorization: `Bearer ${userToken}` } : {}) // Use token if available
      }
    })
      .then(res => {
        console.log('Delete response status:', res.status);
        if (res.status === 204) {
          // Mock API response request as it not Real Database.
          console.log('✅ User deleted successfully (mock).');
        } else {
          console.error('❌ ERROR! THIS IS A MOCK ERROR', res.status);
        }
      })
      .catch(err => {
        console.error('❌ Error: THIS IS A MOCK ERROR', err.message);
      });
  });
}