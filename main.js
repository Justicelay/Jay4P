/* ===================================
   JUSTICE LAY AMANFU — SRC CAMPAIGN
   main.js
   =================================== */

document.addEventListener('DOMContentLoaded', function () {
  /* === ABOUT READ MORE === */
  const aboutReadMoreBtn = document.getElementById('aboutReadMoreBtn');
  const aboutStoryRest = document.getElementById('aboutStoryRest');
  if (aboutReadMoreBtn && aboutStoryRest) {
    aboutReadMoreBtn.addEventListener('click', () => {
      aboutStoryRest.style.display = 'block';
      aboutReadMoreBtn.style.display = 'none';
    });
  }

  /* === STICKY NAVBAR === */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  /* === SMOOTH SCROLL === */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = navbar.offsetHeight + 12;
        window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
        // Close mobile nav
        mobileNav.classList.remove('open');
        hamburger.classList.remove('active');
      }
    });
  });

  /* === HAMBURGER === */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('open');
  });

  /* === ABOUT CAROUSEL === */
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.carousel-dot');
  const captions = ['Campaign Kickoff Meeting', 'Community Engagement', 'Leadership Forum', 'Student Outreach'];
  let currentSlide = 0;
  let carouselTimer;

  function goToSlide(n) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
    const capEl = document.querySelector('.carousel-caption');
    if (capEl && captions[currentSlide]) capEl.textContent = captions[currentSlide];
  }

  function startCarousel() {
    carouselTimer = setInterval(() => goToSlide(currentSlide + 1), 4000);
  }

  document.getElementById('carouselPrev')?.addEventListener('click', () => { clearInterval(carouselTimer); goToSlide(currentSlide - 1); startCarousel(); });
  document.getElementById('carouselNext')?.addEventListener('click', () => { clearInterval(carouselTimer); goToSlide(currentSlide + 1); startCarousel(); });
  dots.forEach((dot, i) => dot.addEventListener('click', () => { clearInterval(carouselTimer); goToSlide(i); startCarousel(); }));
  if (slides.length) startCarousel();

  /* === NEWS FILTER + MODALS === */
  const newsData = [
    {
      id: 1, cat: 'announcement', title: 'Official Campaign Launch Announcement',
      date: 'April 20, 2026', thumb: '📢',
      excerpt: 'Justice Lay Amanfu officially launches his bid for SRC President at Southshore University College, pledging Constitutional Governance and Real Service.',
      full: `<p>Today marks the official launch of the Justice Lay Amanfu campaign for SRC President at Southshore University College under the banner: <strong>"Constitutional Governance. Real Service. Your Voice."</strong></p>
<p>Speaking at the announcement, Amanfu declared: "I've read our Constitution — all 100 pages — and I'm committed to restoring legitimate, transparent governance for every student at Southshore."</p>
<p>The campaign promises to address three core constitutional failures: the absence of public oath-taking, violation of separation of powers, and the non-delivery of mandatory state of affairs addresses.</p>
<p>Students are encouraged to read the full manifesto and engage directly with the candidate through open office hours and social media platforms.</p>`
    },
    {
      id: 2, cat: 'event', title: 'Cool Classrooms Initiative — Fan Installation Drive',
      date: 'April 30, 2026', thumb: '🌬️',
      excerpt: 'The campaign announces the flagship "Cool Classrooms Initiative" — a student-led fundraising effort to install ceiling fans in every lecture hall on campus.',
      full: `<p>The Justice Lay Amanfu campaign has unveiled one of its flagship programs: the <strong>"Cool Classrooms Initiative"</strong> — a comprehensive project to install ceiling fans in all lecture halls at Southshore University College.</p>
<p>The initiative targets raising GH₵50,000–80,000 through voluntary student contributions, corporate sponsorships, alumni donations, and SRC budget allocation (subject to Legislative approval).</p>
<p>Key elements include a 100% voluntary fundraising model, transparent financial reporting, an honor board for contributors, and full constitutional process compliance through the Legislative Council.</p>
<p>"Learning conditions matter. No student should struggle to concentrate because of a hot, stuffy classroom," the candidate stated.</p>`
    },
    {
      id: 3, cat: 'update', title: 'Manifesto Released: 12 Sections, 34 Pages of Commitment',
      date: 'May 05, 2026', thumb: '📋',
      excerpt: 'The full campaign manifesto has been published, covering constitutional governance, concrete student programs, a 100-day action plan, and clear accountability mechanisms.',
      full: `<p>The complete Justice Lay Amanfu SRC Presidential Manifesto has been made publicly available to all students of Southshore University College.</p>
<p>The 34-page document covers twelve sections including: the Constitutional Crisis facing the SRC, commitment to oath-taking, restoration of separation of powers, transparency through state of affairs addresses, and a comprehensive range of student programs.</p>
<p>Key initiatives include inter-faculty competitions, faculty connect platforms, health screening, SRC Week, student loan support, corporate sponsorship strategy, and a Parliament visit program.</p>
<p>The manifesto also includes a detailed 100-day action plan and specific accountability mechanisms that allow students to hold the candidate responsible if elected.</p>
<p>Download the full manifesto from the campaign website or collect a printed copy from the campaign office.</p>`
    }
  ];

  function renderNews(filter = 'all') {
    const grid = document.getElementById('newsGrid');
    if (!grid) return;
    grid.innerHTML = newsData
      .filter(n => filter === 'all' || n.cat === filter)
      .map(n => `
        <div class="news-card reveal">
          <div class="news-thumb">${n.thumb}<span class="news-tag-badge">${n.cat.charAt(0).toUpperCase()+n.cat.slice(1)}</span></div>
          <div class="news-body">
            <div class="news-date">📅 ${n.date}</div>
            <div class="news-title">${n.title}</div>
            <div class="news-excerpt">${n.excerpt}</div>
            <button class="read-more" data-id="${n.id}">Read More →</button>
          </div>
        </div>`).join('');
    observeReveal();
    grid.querySelectorAll('.read-more').forEach(btn => {
      btn.addEventListener('click', () => openModal(parseInt(btn.dataset.id)));
    });
  }

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderNews(btn.dataset.filter);
    });
  });
  renderNews();

  /* === NEWS MODAL === */
  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalClose');

  function openModal(id) {
    const n = newsData.find(x => x.id === id);
    if (!n) return;
    document.getElementById('modalTag').textContent = n.cat;
    document.getElementById('modalTitle').textContent = n.title;
    document.getElementById('modalDate').textContent = n.date;
    document.getElementById('modalContent').innerHTML = n.full;
    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  modalClose?.addEventListener('click', closeModal);
  modalOverlay?.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });
  function closeModal() { modalOverlay.classList.remove('open'); document.body.style.overflow = ''; }

  /* === EVENTS RSVP === */
  document.querySelectorAll('.rsvp-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const form = btn.closest('.ev-content').querySelector('.rsvp-form');
      if (form) form.classList.toggle('open');
    });
  });

  document.querySelectorAll('.rsvp-submit').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const form = btn.closest('.rsvp-form');
      const name = form.querySelector('input[name="rname"]').value.trim();
      const phone = form.querySelector('input[name="rphone"]').value.trim();
      if (!name || !phone) { alert('Please fill in all fields.'); return; }
      form.innerHTML = '<p style="color:#006030;font-weight:600;text-align:center">✓ RSVP Confirmed! See you there.</p>';
    });
  });

  /* === CALENDAR LINKS === */
  document.querySelectorAll('.cal-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const title = btn.dataset.title;
      const date = btn.dataset.date;
      const loc = btn.dataset.loc || 'Southshore University College';
      const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${date}&location=${encodeURIComponent(loc)}&details=${encodeURIComponent('Justice Lay Amanfu SRC Presidential Campaign Event')}`;
      window.open(url, '_blank');
    });
  });

  /* === VOLUNTEER FORM === */
  const volForm = document.getElementById('volunteerForm');
  volForm?.addEventListener('submit', e => {
    e.preventDefault();
    const fields = volForm.querySelectorAll('input, select');
    let valid = true;
    fields.forEach(f => { if (!f.value.trim()) { f.style.borderColor = '#e55'; valid = false; } else { f.style.borderColor = '#dde'; } });
    if (!valid) return;
    volForm.style.display = 'none';
    document.getElementById('volSuccess').style.display = 'block';
  });

  /* === SHARE BUTTONS === */
  const campaignUrl = window.location.href;
  const shareText = 'Vote Justice Lay Amanfu for SRC President at Southshore University College! Constitutional Governance. Real Service. Your Voice. 🗳️';
  document.getElementById('shareWA')?.addEventListener('click', () => window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + campaignUrl)}`, '_blank'));
  document.getElementById('shareFB')?.addEventListener('click', () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(campaignUrl)}`, '_blank'));
  document.getElementById('shareTW')?.addEventListener('click', () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(campaignUrl)}`, '_blank'));
  document.getElementById('copyLink')?.addEventListener('click', () => {
    navigator.clipboard.writeText(campaignUrl).then(() => {
      const btn = document.getElementById('copyLink');
      const orig = btn.innerHTML;
      btn.innerHTML = '✓ Link Copied!';
      setTimeout(() => { btn.innerHTML = orig; }, 2000);
    });
  });

  /* === TESTIMONIAL SLIDER === */
  const track = document.getElementById('testiTrack');
  const testiDots = document.querySelectorAll('.slider-dot');
  let curTesti = 0;
  const totalTestis = document.querySelectorAll('.testi-card').length;
  let testiTimer;

  function goTesti(n) {
    curTesti = (n + totalTestis) % totalTestis;
    if (track) track.style.transform = `translateX(-${curTesti * 100}%)`;
    testiDots.forEach((d, i) => d.classList.toggle('active', i === curTesti));
  }

  function startTesti() { testiTimer = setInterval(() => goTesti(curTesti + 1), 5000); }
  document.getElementById('testiPrev')?.addEventListener('click', () => { clearInterval(testiTimer); goTesti(curTesti - 1); startTesti(); });
  document.getElementById('testiNext')?.addEventListener('click', () => { clearInterval(testiTimer); goTesti(curTesti + 1); startTesti(); });
  testiDots.forEach((d, i) => d.addEventListener('click', () => { clearInterval(testiTimer); goTesti(i); startTesti(); }));
  if (totalTestis) startTesti();

  /* === GALLERY LIGHTBOX === */
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  const lbCap = document.getElementById('lbCaption');
  const galleryItems = document.querySelectorAll('.gallery-item');
  let lbIndex = 0;
  const galleryData = [
    { src: 'images/gallery-1.jpg', cap: 'Campaign Strategy Session' },
    { src: 'images/gallery-2.jpg', cap: 'Student Engagement Drive' },
    { src: 'images/gallery-3.jpg', cap: 'Faculty Visit — Computer Science' },
    { src: 'images/gallery-4.jpg', cap: 'Community Outreach Event' },
    { src: 'images/gallery-5.jpg', cap: 'Manifesto Distribution' },
    { src: 'images/gallery-6.jpg', cap: 'Team Meeting' },
    { src: 'images/gallery-7.jpg', cap: 'Campus Walkabout' },
    { src: 'images/gallery-8.jpg', cap: 'SRC Debate and Engagement' },
  ];

  function openLightbox(i) {
    lbIndex = i;
    const d = galleryData[i];
    if (lbImg) { lbImg.src = d?.src || ''; lbImg.alt = d?.cap || ''; lbImg.onerror = function() { this.style.display='none'; }; }
    if (lbCap) lbCap.textContent = d?.cap || '';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  galleryItems.forEach((item, i) => item.addEventListener('click', () => openLightbox(i)));
  document.getElementById('lbClose')?.addEventListener('click', () => { lightbox.classList.remove('open'); document.body.style.overflow = ''; });
  document.getElementById('lbPrev')?.addEventListener('click', () => openLightbox((lbIndex - 1 + galleryData.length) % galleryData.length));
  document.getElementById('lbNext')?.addEventListener('click', () => openLightbox((lbIndex + 1) % galleryData.length));
  lightbox?.addEventListener('click', e => { if (e.target === lightbox) { lightbox.classList.remove('open'); document.body.style.overflow = ''; } });

  /* === CONTACT FORM === */
  const contactForm = document.getElementById('contactForm');
  const charCounter = document.getElementById('charCount');
  const msgField = document.getElementById('contactMsg');
  msgField?.addEventListener('input', () => {
    const len = msgField.value.length;
    charCounter.textContent = `${len}/500 characters`;
    charCounter.style.color = len > 480 ? '#e55' : 'var(--text-muted)';
    if (len > 500) msgField.value = msgField.value.substring(0, 500);
  });

  contactForm?.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;
    contactForm.querySelectorAll('input, select, textarea').forEach(f => {
      if (!f.value.trim()) { f.style.borderColor = '#e55'; valid = false; } else { f.style.borderColor = '#dde'; }
    });
    if (!valid) { document.getElementById('contactError').style.display = 'block'; return; }
    document.getElementById('contactError').style.display = 'none';
    document.getElementById('contactSuccess').style.display = 'block';
    contactForm.reset();
    setTimeout(() => { document.getElementById('contactSuccess').style.display = 'none'; }, 5000);
  });

  /* === SCROLL REVEAL === */
  function observeReveal() {
    const revealEls = document.querySelectorAll('.reveal:not(.visible)');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
    }, { threshold: 0.12 });
    revealEls.forEach(el => observer.observe(el));
  }
  observeReveal();

  /* === MANIFESTO PDF === */
  document.getElementById('downloadManifesto')?.addEventListener('click', () => window.open('documents/manifesto.pdf', '_blank'));

});
