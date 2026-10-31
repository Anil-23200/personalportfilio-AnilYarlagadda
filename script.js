(function () {
  var root = document.documentElement;
  var themeBtn = document.getElementById('themeBtn');
  var menuBtn = document.getElementById('menuBtn');
  var navLinks = document.getElementById('navLinks');

  // Theme toggle
  function syncTheme() {
    var dark = root.dataset.theme !== 'light';
    themeBtn.innerHTML = dark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    themeBtn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  }
  themeBtn.addEventListener('click', function () {
    var next = root.dataset.theme === 'light' ? 'dark' : 'light';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
    syncTheme();
  });
  syncTheme();

  // Mobile menu
  menuBtn.addEventListener('click', function () {
    var open = navLinks.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open);
  });
  navLinks.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') { navLinks.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { navLinks.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); }
  });

  document.getElementById('year').textContent = new Date().getFullYear();

  // EmailJS initialization
  var EMAILJS_PUBLIC_KEY = '-e3iVlZmkErzJUW8P';
  var EMAILJS_SERVICE_ID = 'service_31vvnof';
  var EMAILJS_TEMPLATE_ID = 'template_v1jfss2';

  if (window.emailjs) {
    try {
      emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    } catch (e) {
      console.warn('EmailJS init error:', e);
    }
  }

  // Contact form handler
  var form = document.getElementById('contactForm');
  var status = document.getElementById('formStatus');
  var btn = document.getElementById('sendBtn');
  var fields = [
    { el: form.name, err: 'nameErr', check: function (v) { return v.trim().length >= 2 ? '' : 'Enter your name (at least 2 characters).'; } },
    { el: form.email, err: 'emailErr', check: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Enter a valid email address.'; } },
    { el: form.message, err: 'msgErr', check: function (v) { return v.trim().length >= 10 ? '' : 'Write a message of at least 10 characters.'; } }
  ];

  function validate(f) {
    var msg = f.check(f.el.value);
    document.getElementById(f.err).textContent = msg;
    f.el.classList.toggle('invalid', !!msg);
    f.el.setAttribute('aria-invalid', msg ? 'true' : 'false');
    return !msg;
  }
  fields.forEach(function (f) { f.el.addEventListener('blur', function () { validate(f); }); });

  function sendEmail() {
    btn.disabled = true;
    var originalBtnText = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending…';
    status.textContent = 'Sending message…';

    try {
      emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    } catch (e) {}

    var nameVal = form.name.value.trim();
    var emailVal = form.email.value.trim();
    var msgVal = form.message.value.trim();

    var templateParams = {
      form_name: nameVal,
      name: nameVal,
      from_name: nameVal,
      form_email: emailVal,
      email: emailVal,
      from_email: emailVal,
      text: msgVal,
      message: msgVal
    };

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
      .then(function () {
        form.reset();
        status.textContent = 'Message sent successfully! Thank you, I’ll reply soon.';
        alert('✨ Message sent successfully! Thank you for contacting me.');
      })
      .catch(function (error) {
        console.error('EmailJS Error:', error);
        status.textContent = 'Failed to send message. Please email anilyarlagadda6@gmail.com directly.';
        alert('❌ Failed to send message. Please email anilyarlagadda6@gmail.com directly.');
      })
      .finally(function () {
        btn.disabled = false;
        btn.innerHTML = originalBtnText;
      });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var ok = fields.map(validate).every(Boolean);
    if (!ok) { status.textContent = 'Please fix the highlighted fields.'; return; }
    if (form._gotcha && form._gotcha.value) return; // honeypot

    if (window.emailjs) {
      sendEmail();
    } else {
      btn.disabled = true;
      status.textContent = 'Connecting to email service…';
      var s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
      s.onload = function () {
        sendEmail();
      };
      s.onerror = function () {
        btn.disabled = false;
        status.textContent = 'Could not load email service. Please email anilyarlagadda6@gmail.com directly.';
      };
      document.head.appendChild(s);
    }
  });
})();
