/**
 * BloodConnect 3D - Main UI & Interactive Helpers
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 2. Mobile Nav Toggle
  const toggle = document.querySelector('.nav-toggle');
  const list = document.getElementById('nav-list');
  if (toggle && list) {
    toggle.addEventListener('click', () => {
      list.classList.toggle('open');
      const isOpen = list.classList.contains('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.textContent = isOpen ? '✕' : '☰';
    });
  }

  // 3. Highlight Active Navigation Item
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-list a').forEach(link => {
    const href = link.getAttribute('href').replace('./', '');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // 4. Emergency Ticker Live Cycling
  const tickerText = document.getElementById('ticker-text');
  if (tickerText && window.bloodData) {
    const requests = bloodData.getRequests().filter(r => r.urgency === 'CRITICAL' && r.status === 'ACTIVE');
    if (requests.length > 0) {
      let idx = 0;
      const updateTicker = () => {
        const req = requests[idx % requests.length];
        tickerText.innerHTML = `<strong>${req.hospitalName}</strong> urgently needs <strong>${req.unitsNeeded} Units of ${req.bloodGroup}</strong> (${req.ward || 'ICU'}) &bull; Target radius: ${req.targetRadiusKm}km`;
        idx++;
      };
      updateTicker();
      if (requests.length > 1) {
        setInterval(updateTicker, 6000);
      }
    }
  }
});
