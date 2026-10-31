(function () {
  var root = document.documentElement;
  var themeBtn = document.getElementById('themeBtn');
  var menuBtn = document.getElementById('menuBtn');
  var navLinks = document.getElementById('navLinks');

  // Theme toggle
  function syncTheme() {
    var dark = root.dataset.theme !== 'light';
    if (themeBtn) {
      themeBtn.innerHTML = dark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
      themeBtn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = root.dataset.theme === 'light' ? 'dark' : 'light';
      root.dataset.theme = next;
      try { localStorage.setItem('theme', next); } catch (e) {}
      syncTheme();
    });
  }
  syncTheme();

  // Mobile menu
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', function () {
      var open = navLinks.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open);
    });
    navLinks.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        navLinks.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        navLinks.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // EmailJS configuration
  var EMAILJS_PUBLIC_KEY = 'T3a3O25CZ0mxgkt18';
  var EMAILJS_SERVICE_ID = 'service_31vvnof';
  var EMAILJS_TEMPLATE_ID = 'template_fcys2lb';

  function initEmailJS() {
    if (window.emailjs) {
      try {
        emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
      } catch (e) {
        try {
          emailjs.init(EMAILJS_PUBLIC_KEY);
        } catch (err) {
          console.warn('EmailJS init warning:', err);
        }
      }
    }
  }
  initEmailJS();

  // Contact form submission handler
  function contactMe(event) {
    if (event) {
      event.preventDefault();
    }

    var nameEl = document.getElementById('name');
    var emailEl = document.getElementById('email');
    var msgEl = document.getElementById('message');
    var statusEl = document.getElementById('formStatus');
    var btnEl = document.getElementById('sendBtn');
    var gotchaEl = document.querySelector('input[name="_gotcha"]');

    // Honeypot check for spam
    if (gotchaEl && gotchaEl.value) {
      return false;
    }

    var name = nameEl ? nameEl.value.trim() : '';
    var email = emailEl ? emailEl.value.trim() : '';
    var message = msgEl ? msgEl.value.trim() : '';

    var nameErr = document.getElementById('nameErr');
    var emailErr = document.getElementById('emailErr');
    var msgErr = document.getElementById('msgErr');

    if (nameErr) nameErr.textContent = '';
    if (emailErr) emailErr.textContent = '';
    if (msgErr) msgErr.textContent = '';

    var hasError = false;

    if (!name || name.length < 2) {
      if (nameErr) nameErr.textContent = 'Please enter your name (at least 2 characters).';
      if (nameEl) nameEl.classList.add('invalid');
      hasError = true;
    } else if (nameEl) {
      nameEl.classList.remove('invalid');
    }

    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) {
      if (emailErr) emailErr.textContent = 'Please enter a valid email address.';
      if (emailEl) emailEl.classList.add('invalid');
      hasError = true;
    } else if (emailEl) {
      emailEl.classList.remove('invalid');
    }

    if (!message || message.length < 5) {
      if (msgErr) msgErr.textContent = 'Please write a message (at least 5 characters).';
      if (msgEl) msgEl.classList.add('invalid');
      hasError = true;
    } else if (msgEl) {
      msgEl.classList.remove('invalid');
    }

    if (hasError) {
      if (statusEl) statusEl.textContent = 'Please fix the highlighted fields above.';
      return false;
    }

    var originalBtnText = btnEl ? btnEl.innerHTML : 'Send message';
    if (btnEl) {
      btnEl.disabled = true;
      btnEl.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending…';
    }
    if (statusEl) {
      statusEl.textContent = 'Sending message…';
      statusEl.style.color = '';
    }

    function executeSend() {
      initEmailJS();

      var templateParams = {
        form_name: name,
        name: name,
        from_name: name,
        form_email: email,
        email: email,
        from_email: email,
        text: message,
        message: message
      };

      emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)
        .then(function (response) {
          console.log('EmailJS Success:', response);
          var contactForm = document.getElementById('contactForm');
          if (contactForm) {
            contactForm.reset();
          }
          if (statusEl) {
            statusEl.textContent = '✨ Message sent successfully! Thank you, I’ll reply soon.';
            statusEl.style.color = 'var(--accent)';
          }
          alert('✨ Email Sent Successfully!');
        })
        .catch(function (error) {
          console.error('EmailJS Error:', error);
          if (statusEl) {
            statusEl.textContent = '❌ Failed to send. Please email anilyarlagadda6@gmail.com directly.';
            statusEl.style.color = '#d93025';
          }
          alert('❌ Email Not Sent! Please contact directly at anilyarlagadda6@gmail.com');
        })
        .finally(function () {
          if (btnEl) {
            btnEl.disabled = false;
            btnEl.innerHTML = originalBtnText;
          }
        });
    }

    if (window.emailjs) {
      executeSend();
    } else {
      var script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
      script.onload = executeSend;
      script.onerror = function () {
        if (btnEl) {
          btnEl.disabled = false;
          btnEl.innerHTML = originalBtnText;
        }
        if (statusEl) {
          statusEl.textContent = 'Could not load email service. Please email anilyarlagadda6@gmail.com directly.';
          statusEl.style.color = '#d93025';
        }
        alert('Could not load email service. Please email anilyarlagadda6@gmail.com directly.');
      };
      document.head.appendChild(script);
    }

    return false;
  }

  // Clear validation on user typing
  ['name', 'email', 'message'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', function () {
        el.classList.remove('invalid');
        var err = document.getElementById(id === 'message' ? 'msgErr' : id + 'Err');
        if (err) err.textContent = '';
      });
    }
  });

  // Attach submit handler to form
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', contactMe);
  }

  // Expose contactMe globally
  window.contactMe = contactMe;
})();
