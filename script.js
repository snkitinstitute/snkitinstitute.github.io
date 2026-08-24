// ============================================================
// DEMO DATA — এখন হার্ডকোড করা। পরে Firebase যোগ হলে এই array-টা
// আসল ডেটাবেজ থেকে আসা প্রতি স্টুডেন্টের রিয়েল কোর্স-লিস্ট দিয়ে
// রিপ্লেস হবে। কার্ডের ডিজাইন/মার্কআপ একই থাকবে।
// ============================================================
const COURSES = [
  {
    icon: '💻',
    title: 'ওয়েব ডেভেলপমেন্ট',
    batch: 'ব্যাচ ৩',
    status: 'ongoing',
    percent: 65,
    gradient: 'linear-gradient(135deg,#1D2E48,#3FA796)'
  },
  {
    icon: '🎨',
    title: 'গ্রাফিক্স ডিজাইন',
    batch: 'ব্যাচ ২',
    status: 'done',
    percent: 100,
    gradient: 'linear-gradient(135deg,#0F1B2D,#C99530)'
  },
  {
    icon: '🐍',
    title: 'প্রোগ্রামিং উইথ Python',
    batch: 'ব্যাচ ১',
    status: 'new',
    percent: 0,
    gradient: 'linear-gradient(135deg,#16243A,#1D2E48)'
  }
];

const STATUS_LABEL = { ongoing: 'চলমান', done: 'সম্পন্ন', new: 'নতুন ভর্তি' };
const STATUS_TAGCLASS = { ongoing: 'tag-ongoing', done: 'tag-done', new: 'tag-new' };

function renderCourses(filter = 'all') {
  const grid = document.getElementById('ticketGrid');
  const list = COURSES.filter(c => filter === 'all' ? true : c.status === filter);

  if (list.length === 0) {
    grid.innerHTML = `<p style="color:#5b6a80;grid-column:1/-1;">এই তালিকায় এখনো কোনো কোর্স নেই।</p>`;
    return;
  }

  grid.innerHTML = list.map(c => `
    <article class="course-ticket">
      <div class="ct-banner" style="background:${c.gradient}">
        ${c.icon}
        <span class="ct-batch">${c.batch}</span>
      </div>
      <div class="ct-perf"></div>
      <div class="ct-body">
        <h3 class="ct-title">${c.title}</h3>
        <div class="ct-tags">
          <span class="ct-tag ${STATUS_TAGCLASS[c.status]}">${STATUS_LABEL[c.status]}</span>
        </div>
        <div class="ct-progress-track">
          <div class="ct-progress-fill" style="width:${c.percent}%"></div>
        </div>
        <div class="ct-foot">
          <span class="ct-percent">${c.percent}% সম্পন্ন</span>
          <button class="ct-continue">${c.percent === 0 ? 'শুরু করুন' : c.percent === 100 ? 'রিভিউ করুন' : 'Continue →'}</button>
        </div>
      </div>
    </article>
  `).join('');
}

// Tabs
document.querySelectorAll('.mc-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.mc-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    renderCourses(tab.dataset.filter);
  });
});

renderCourses();
