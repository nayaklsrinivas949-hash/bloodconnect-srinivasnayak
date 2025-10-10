function attachFormHandler(formId) {
  const form = document.getElementById(formId);
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const valid = form.checkValidity();
    if (!valid) {
      form.reportValidity();
      return;
    }
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    console.log(`[${formId}] submission`, payload);
    alert('Submitted! (Hook up backend later)');
    form.reset();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  attachFormHandler('donor-form');
  attachFormHandler('receiver-form');
});


