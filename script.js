const WAITLIST_ENDPOINT = 'https://script.google.com/macros/s/AKfycbzyPYZQRZcKK4a8vad2cEmGpPKkN3Y_ABkixYvvAaQnbqDUQRhxOhfCXY7qKw8BjBtn/exec';
const form = document.getElementById('waitlistForm');
const status = document.getElementById('formStatus');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    
    const payload = {
      nombre: data.get('nombre'),
      email: data.get('email'),
      fecha: new Date().toISOString()
    };

    if (status) status.textContent = 'Enviando…';

    try {
      const params = new URLSearchParams();
      params.append('nombre', payload.nombre || '');
      params.append('email', payload.email || '');
      params.append('fecha', payload.fecha);

      await fetch(WAITLIST_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString()
      });

      form.reset();
      if (status) status.textContent = '¡Gracias por registrarte! Muy pronto recibirás noticias. ✨';
    } catch(err) {
      if (status) status.textContent = 'Hubo un problema. Intenta de nuevo o escríbeme a vane.zapata.ec@gmail.com';
    }
  });
}