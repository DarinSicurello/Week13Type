import { setupCreate } from './create';
import { setupDelete } from './delete';

// Assert their types, and check for Typescript null
const formEl = document.querySelector('.form') as HTMLFormElement | null;
const deleteBtn = document.getElementById('delete-user') as HTMLButtonElement | null;

if (formEl) {
  console.log('Form found and listener imported');
  setupCreate(formEl);
} else {
  console.error('Form element not found!');
}

if (deleteBtn) {
  setupDelete(deleteBtn);
} else {
  console.error('Delete button not found!');
}
