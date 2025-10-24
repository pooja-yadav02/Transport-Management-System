document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('captchaCanvas');
  const ctx = canvas ? canvas.getContext('2d') : null;
  let currentCaptcha = '';

  function randChars(n = 5) {
    const chars = '1234567890';
    let s = '';
    for (let i = 0; i < n; i++) s += chars.charAt(Math.floor(Math.random() * chars.length));
    return s;
  }

  function drawCaptcha() {
    if (!ctx || !canvas) return;
    const w = canvas.width, h = canvas.height;
    currentCaptcha = randChars(5);

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#f7f7f7';
    ctx.fillRect(0, 0, w, h);

    // noise lines
    for (let i = 0; i < 3; i++) {
      ctx.strokeStyle = `rgba(0,0,0,${Math.random() * 0.12})`;
      ctx.beginPath();
      ctx.moveTo(Math.random() * w, Math.random() * h);
      ctx.lineTo(Math.random() * w, Math.random() * h);
      ctx.stroke();
    }

    ctx.textBaseline = 'middle';
    const fontSize = Math.floor(h * 0.62);
    ctx.font = `${fontSize}px sans-serif`;

    // draw each char with slight rotation/offset
    for (let i = 0; i < currentCaptcha.length; i++) {
      const ch = currentCaptcha[i];
      const x = (w / currentCaptcha.length) * (i + 0.5);
      const y = h / 2 + (Math.random() * 6 - 3);
      const angle = (Math.random() * 24 - 12) * Math.PI / 180;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.fillStyle = '#222';
      ctx.fillText(ch, 0, 0);
      ctx.restore();
    }

    // dots
    for (let i = 0; i < 20; i++) {
      ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.12})`;
      ctx.beginPath();
      ctx.arc(Math.random() * w, Math.random() * h, Math.random() * 1.4 + 0.4, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // init
  drawCaptcha();

  const refreshBtn = document.getElementById('refreshCaptcha');
  if (refreshBtn) refreshBtn.addEventListener('click', (e) => { e.preventDefault(); drawCaptcha(); });

  const signInBtn = document.querySelector('.btn-signin');
  if (signInBtn) signInBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const id = (document.getElementById('studentId') || {}).value || '';
    const pwd = (document.getElementById('password') || {}).value || '';
    const input = (document.getElementById('captchaInput') || {}).value || '';

    if (!id.trim() || !pwd.trim()) {
      alert('Please enter BUS ID and Password.');
      return;
    }

    if (input.trim().toUpperCase() !== currentCaptcha.toUpperCase()) {
      alert('Incorrect captcha. Try again.');
      drawCaptcha();
      return;
    }

    // success -> open main page (index.html must be in same folder)
    window.location.href = 'index.html';
  });
});