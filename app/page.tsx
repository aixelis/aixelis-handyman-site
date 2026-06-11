'use client';

import React, { useState } from 'react';

const brand = 'Aixelis';
const phone = '626-252-4457';
const phoneHref = 'tel:626-252-4457';

const translations = {
  'zh-TW': {
    navCall: `電話 ${phone}`,
    langBtn: 'English',
    heroTitle: 'Aixelis 住宅與商家維修安裝服務',
    heroSub: '家電/商用設備 • 網路佈線 • 監控安裝 • 智能家居 • 小型水電 • 綜合維修',
    heroNote: '服務 Walnut 周邊、洛杉磯地區與 Orange County / Irvine，適合屋主、房東、店鋪、餐飲、倉庫與小型辦公室。',
    bookBtn: '立即預約',
    learnBtn: '查看服務',
    aboutTitle: '把住宅和商家那些「一直想修」的問題一次處理好',
    aboutDesc:
      '我們提供靈活、透明、好溝通的 handyman 服務。從住宅門鎖、燈具、家電小故障，到商家 Wi-Fi、網路線、攝影機、智能門鈴、溫控器、出風口與日常維修，先了解問題，再給出清楚方案與報價。',
    trustItems: ['透明報價', '快速回覆', '可做多項雜修', '中英文溝通'],
    servicesTitle: '常見服務項目',
    servicesDesc: '如果你的問題不在列表裡，也可以先提交描述，我們會判斷是否能處理。',
    serviceCards: [
      {
        title: '家電與商用設備',
        desc: '住宅家電、店鋪常用設備、洗衣機、烘乾機、洗碗機、冰箱、油煙機、垃圾處理器等檢查、拆裝與小型維修。',
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=900',
      },
      {
        title: '網路與弱電',
        desc: '住宅與商家 Wi-Fi 覆蓋、路由器設定、網路線佈線、牆面網口、機櫃整理與網路排查。',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=900',
      },
      {
        title: '監控與智能設備',
        desc: '住宅、店鋪與辦公室攝影機、NVR、智能門鈴、智能鎖、感應燈與基礎智能設備安裝設定。',
        image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=900',
      },
      {
        title: '溫控器與出風口維護',
        desc: '空調濾網、智能溫控器、出風口、冷暖氣基礎檢查與簡單維護；複雜 HVAC 維修會先評估是否適合承接。',
        image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=900',
      },
      {
        title: '小型水電雜修',
        desc: '燈具、開關、插座、水龍頭、馬桶配件、漏水初步排查、浴室廚房常見小維修。',
        image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&q=80&w=900',
      },
      {
        title: '門窗牆面與五金',
        desc: '門鎖、鉸鏈、窗簾、置物架、電視掛架、牆面修補、家具組裝與各類五金安裝。',
        image: 'https://images.unsplash.com/photo-1606676539940-12768ce0e762?auto=format&fit=crop&q=80&w=900',
      },
      {
        title: '出租房與商家維護',
        desc: '租客退房後維修、入住前檢查、店鋪維護清單、房東常見維護與緊急小處理。',
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=900',
      },
    ],
    areaTitle: '服務區域',
    areaDesc: '以 Walnut 周邊為核心，也承接洛杉磯地區與 Orange County / Irvine 的家庭維修需求。具體能否上門取決於距離、時間與工作內容。',
    areas: ['Walnut 周邊', 'Diamond Bar', 'Rowland Heights', '洛杉磯地區', 'Orange County', 'Irvine 地區'],
    seoTitle: '常見搜尋服務',
    seoDesc: 'Aixelis 可協助住宅與商家處理 handyman、家電維修、商用設備安裝、網路佈線、Wi-Fi 設定、監控攝影機安裝、智能門鈴、智能鎖、溫控器、小型水電、門鎖五金、家具組裝、出租房維護與店鋪維修等需求。',
    seoKeywords: ['handyman Walnut CA', 'Walnut 家庭維修', 'Los Angeles handyman', 'Orange County handyman', 'Irvine handyman', '家電維修', '商用設備安裝', '網路佈線', 'Wi-Fi 設定', '監控安裝', '智能門鈴安裝', '智能鎖安裝', '溫控器安裝', '家具組裝', '店鋪維修', '出租房維護'],
    processTitle: '預約流程',
    process: ['描述問題', '確認照片與地址', '估算方案與時間', '上門完成服務'],
    loginTitle: `${brand} 會員登入`,
    userLabel: '使用者名稱',
    userPlaceholder: '請輸入使用者名稱',
    passLabel: '密碼',
    passPlaceholder: '請輸入密碼',
    loginBtn: '登入',
    registerBtn: '註冊',
    regNavBtn: '會員',
    forgotLink: '忘記密碼？',
    forgotTitle: '找回密碼',
    forgotBtn: '發送驗證碼',
    resetTitle: '重置密碼',
    resetBtn: '確認重置',
    tokenLabel: '驗證碼',
    tokenPlaceholder: '請輸入 6 位驗證碼',
    emailLabel: '電子郵箱',
    emailPlaceholder: '請輸入您的郵箱',
    switchLogin: '已有帳號？立即登入',
    switchRegister: '還沒有帳號？立即註冊',
    loginSuccess: '登入成功',
    loginFail: '登入失敗: ',
    footer: `© 2026 ${brand}. All Rights Reserved.`,
    modalTitle: '預約 Handyman 服務',
    nameLabel: '您的姓名',
    phoneLabel: '聯絡電話',
    serviceLabel: '需要什麼服務？',
    serviceOptions: ['家電 / 商用設備維修與安裝', '網路 / Wi-Fi / 佈線', '監控 / 門鈴 / 智能設備', '溫控器 / 出風口 / 濾網', '小型水電雜修', '門窗牆面與五金', '出租房 / 商家維護', '其他住宅或商家雜事'],
    dateLabel: '期望日期',
    descLabel: '問題描述',
    descPlaceholder: '請描述住宅/商家類型、設備型號、故障情況、地址城市；如果方便，之後可補照片。',
    cancelBtn: '取消',
    submitBtn: '送出預約',
    submittingBtn: '送出中...',
    bookSuccess: '預約已送出，我們會盡快與您聯絡。',
  },
  en: {
    navCall: `Call ${phone}`,
    langBtn: '中文',
    heroTitle: 'Aixelis Handyman Services for Homes & Businesses',
    heroSub: 'Appliances & Business Equipment • Networking • Security Cameras • Smart Home • Small Electrical • Repairs',
    heroNote: 'Serving Walnut, the greater Los Angeles area, and Orange County / Irvine for homeowners, landlords, shops, restaurants, warehouses, and small offices.',
    bookBtn: 'Book Service',
    learnBtn: 'View Services',
    aboutTitle: 'Get home and business repairs off your list',
    aboutDesc:
      'We provide practical, transparent handyman help for jobs that are too small for a contractor but too important to ignore. From home repairs to shop Wi-Fi, cameras, smart devices, thermostats, vents, and everyday maintenance, tell us what is happening and we will help you decide the right next step.',
    trustItems: ['Clear pricing', 'Fast response', 'Multi-task visits', 'English / Chinese'],
    servicesTitle: 'Popular Services',
    servicesDesc: 'If your issue is not listed, send a short description and we will let you know whether we can help.',
    serviceCards: [
      {
        title: 'Appliances & Business Equipment',
        desc: 'Home appliances, common shop equipment, washer, dryer, dishwasher, refrigerator, range hood, garbage disposal inspection, installation, and minor repair.',
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=900',
      },
      {
        title: 'Networking & Low Voltage',
        desc: 'Home and business Wi-Fi coverage, router setup, Ethernet cabling, wall jacks, network cleanup, and troubleshooting.',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=900',
      },
      {
        title: 'Cameras & Smart Devices',
        desc: 'Security cameras, NVR, video doorbells, smart locks, motion lights, and smart device setup for homes, shops, and offices.',
        image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=900',
      },
      {
        title: 'Thermostat & Vent Help',
        desc: 'Air filters, smart thermostats, vents, and basic heating or cooling checks. Larger HVAC repairs are reviewed before scheduling.',
        image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=900',
      },
      {
        title: 'Small Electrical & Plumbing',
        desc: 'Lights, switches, outlets, faucets, toilet parts, basic leak checks, kitchen and bathroom small repairs.',
        image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&q=80&w=900',
      },
      {
        title: 'Doors, Walls & Hardware',
        desc: 'Locks, hinges, curtain rods, shelves, TV mounts, drywall patching, furniture assembly, and hardware installs.',
        image: 'https://images.unsplash.com/photo-1606676539940-12768ce0e762?auto=format&fit=crop&q=80&w=900',
      },
      {
        title: 'Rental & Business Maintenance',
        desc: 'Move-out punch lists, pre-move-in checks, shop maintenance lists, landlord maintenance, and bundled small repairs.',
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=900',
      },
    ],
    areaTitle: 'Service Area',
    areaDesc: 'Walnut and nearby cities are the core service area, with availability across greater Los Angeles and Orange County / Irvine depending on schedule, distance, and job scope.',
    areas: ['Walnut Area', 'Diamond Bar', 'Rowland Heights', 'Greater Los Angeles', 'Orange County', 'Irvine Area'],
    seoTitle: 'Common Searches We Serve',
    seoDesc: 'Aixelis helps homes and businesses with handyman service, appliance repair, business equipment installation, Ethernet cabling, Wi-Fi setup, security camera installation, video doorbells, smart locks, thermostat installation, small electrical, plumbing, locks, hardware, furniture assembly, rental property maintenance, and shop repairs.',
    seoKeywords: ['handyman Walnut CA', 'Walnut home repair', 'Los Angeles handyman', 'Orange County handyman', 'Irvine handyman', 'home repair near me', 'appliance repair', 'business equipment installation', 'Ethernet cabling', 'Wi-Fi setup', 'security camera installation', 'video doorbell installation', 'smart lock installation', 'thermostat installation', 'furniture assembly', 'shop repair', 'rental property maintenance'],
    processTitle: 'How Booking Works',
    process: ['Describe the issue', 'Confirm photos and address', 'Estimate plan and timing', 'Finish the job on site'],
    loginTitle: `${brand} Member Login`,
    userLabel: 'Username',
    userPlaceholder: 'Enter username',
    passLabel: 'Password',
    passPlaceholder: 'Enter password',
    loginBtn: 'Login',
    registerBtn: 'Register',
    regNavBtn: 'Member',
    forgotLink: 'Forgot password?',
    forgotTitle: 'Recover Password',
    forgotBtn: 'Send Code',
    resetTitle: 'Reset Password',
    resetBtn: 'Confirm Reset',
    tokenLabel: 'Verification Code',
    tokenPlaceholder: 'Enter 6-digit code',
    emailLabel: 'Email Address',
    emailPlaceholder: 'Enter email',
    switchLogin: 'Already have an account? Login',
    switchRegister: 'No account? Register',
    loginSuccess: 'Login successful',
    loginFail: 'Login failed: ',
    footer: `© 2026 ${brand}. All Rights Reserved.`,
    modalTitle: 'Book Handyman Service',
    nameLabel: 'Your Name',
    phoneLabel: 'Phone Number',
    serviceLabel: 'Service Needed',
    serviceOptions: ['Appliance / Business Equipment Repair & Install', 'Network / Wi-Fi / Cabling', 'Cameras / Doorbell / Smart Devices', 'Thermostat / Vents / Filters', 'Small Electrical & Plumbing', 'Doors, Walls & Hardware', 'Rental / Business Maintenance', 'Other Home or Business Task'],
    dateLabel: 'Preferred Date',
    descLabel: 'Issue Description',
    descPlaceholder: 'Describe whether this is for a home or business, the issue, model number, city, and any details. Photos can be shared later.',
    cancelBtn: 'Cancel',
    submitBtn: 'Submit Request',
    submittingBtn: 'Submitting...',
    bookSuccess: 'Request submitted. We will contact you soon.',
  },
};

export default function Home() {
  const [lang, setLang] = useState<'zh-TW' | 'en'>('en');
  const t = translations[lang];

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'forgot' | 'reset'>('login');
  const [message, setMessage] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [bookMessage, setBookMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookName, setBookName] = useState('');
  const [bookPhone, setBookPhone] = useState('');
  const [bookService, setBookService] = useState(t.serviceOptions[0]);
  const [bookDate, setBookDate] = useState('');
  const [bookDesc, setBookDesc] = useState('');

  const handleLangToggle = () => {
    const nextLang = lang === 'zh-TW' ? 'en' : 'zh-TW';
    setLang(nextLang);
    setBookService(translations[nextLang].serviceOptions[0]);
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('Processing...');

    let endpoint = '/api/login';
    let body: Record<string, string> = { username, password };

    if (authMode === 'register') {
      endpoint = '/api/register';
      body = { username, password, email };
    } else if (authMode === 'forgot') {
      endpoint = '/api/forgot-password';
      body = { email };
    } else if (authMode === 'reset') {
      endpoint = '/api/reset-password';
      body = { email, token, password };
    }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.success) {
        setMessage(t.loginSuccess);
        if (authMode === 'forgot') {
          setTimeout(() => setAuthMode('reset'), 1200);
        }
      } else {
        setMessage(t.loginFail + (data.error || ''));
      }
    } catch {
      setMessage(t.loginFail + 'Network Error');
    }
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: bookName,
          phone: bookPhone,
          service: bookService,
          date: bookDate,
          description: bookDesc,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setBookMessage(t.bookSuccess);
        setTimeout(() => {
          setShowModal(false);
          setBookMessage('');
          setBookName('');
          setBookPhone('');
          setBookDate('');
          setBookDesc('');
        }, 2200);
      } else {
        alert('提交失敗: ' + data.error);
      }
    } catch {
      alert('提交失敗，請稍後再試');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-stone-50 font-sans text-slate-900">
      <nav className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 px-3 py-3 shadow-sm backdrop-blur sm:px-4">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <a href="#" className="flex min-w-0 items-center gap-2 sm:gap-3">
            <div className="rounded-lg bg-amber-500 px-2.5 py-2 text-lg font-black leading-none text-slate-950 sm:px-3 sm:text-xl">AX</div>
            <div>
              <div className="text-lg font-black tracking-tight text-slate-900 sm:text-xl">{brand}</div>
              <div className="hidden text-xs font-bold uppercase tracking-[0.2em] text-slate-500 sm:block">Home & Business Repair</div>
            </div>
          </a>
          <div className="flex flex-1 items-center justify-end gap-1.5 sm:flex-none sm:gap-2">
            <button onClick={handleLangToggle} className="rounded-full border border-slate-300 px-2.5 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-100 sm:px-3 sm:text-sm">
              {t.langBtn}
            </button>
            <a href={phoneHref} className="rounded-full bg-slate-900 px-3 py-2 text-xs font-bold text-white shadow-lg transition hover:bg-slate-700 sm:px-5 sm:text-sm">
              {t.navCall}
            </a>
            <button onClick={() => setAuthMode('register')} className="rounded-full border border-slate-300 px-2.5 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-100 sm:px-3 sm:text-sm">
              {t.regNavBtn}
            </button>
          </div>
        </div>
      </nav>

      <section
        className="relative overflow-hidden bg-cover bg-center px-4 py-20 text-white sm:px-6 md:py-32"
        style={{
          backgroundImage: "url('/aixelis-smart-home-hero.jpg')",
          backgroundPosition: 'center center',
        }}
      >
        <div className="absolute inset-0 bg-slate-950/60" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex max-w-full rounded-full bg-amber-400 px-3 py-2 text-xs font-black text-slate-950 sm:px-4 sm:text-sm">Walnut • Los Angeles • Orange County</p>
            <h1 className="mb-5 text-3xl font-black leading-tight tracking-tight sm:text-4xl md:text-6xl">{t.heroTitle}</h1>
            <p className="mb-4 text-lg font-semibold leading-7 text-slate-100 sm:text-xl md:text-2xl">{t.heroSub}</p>
            <p className="mb-8 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base md:text-lg">{t.heroNote}</p>
            <div className="grid gap-3 sm:flex sm:flex-wrap sm:gap-4">
              <button onClick={() => setShowModal(true)} className="rounded-xl bg-amber-400 px-6 py-3.5 text-base font-black text-slate-950 shadow-2xl transition hover:-translate-y-1 hover:bg-amber-300 sm:px-8 sm:py-4 sm:text-lg">
                {t.bookBtn}
              </button>
              <a href="#services" className="rounded-xl border border-white/70 bg-white/10 px-6 py-3.5 text-center text-base font-black text-white backdrop-blur transition hover:-translate-y-1 hover:bg-white hover:text-slate-950 sm:px-8 sm:py-4 sm:text-lg">
                {t.learnBtn}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <h2 className="mb-5 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl md:text-4xl">{t.aboutTitle}</h2>
            <p className="text-base leading-8 text-slate-600 sm:text-lg">{t.aboutDesc}</p>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {t.trustItems.map((item) => (
              <div key={item} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                <div className="mb-2 text-2xl font-black text-amber-500">✓</div>
                <div className="text-sm font-black text-slate-800 sm:text-base">{item}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="bg-white px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <h2 className="mb-3 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl md:text-4xl">{t.servicesTitle}</h2>
            <p className="text-base leading-7 text-slate-600 sm:text-lg">{t.servicesDesc}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {t.serviceCards.map((service) => (
              <article key={service.title} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <div className="h-40 bg-cover bg-center sm:h-44" style={{ backgroundImage: `url('${service.image}')` }} />
                <div className="p-5 sm:p-6">
                  <h3 className="mb-3 text-xl font-black text-slate-900">{service.title}</h3>
                  <p className="leading-7 text-slate-600">{service.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-8">
        <div className="rounded-2xl bg-slate-900 p-6 text-white sm:p-8">
          <h2 className="mb-4 text-2xl font-black sm:text-3xl">{t.areaTitle}</h2>
          <p className="mb-6 leading-7 text-slate-300">{t.areaDesc}</p>
          <div className="flex flex-wrap gap-3">
            {t.areas.map((area) => (
              <span key={area} className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white ring-1 ring-white/15">
                {area}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="mb-6 text-2xl font-black text-slate-900 sm:text-3xl">{t.processTitle}</h2>
          <div className="grid gap-4">
            {t.process.map((step, index) => (
              <div key={step} className="flex items-center gap-4 rounded-xl bg-stone-50 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-400 font-black text-slate-950">{index + 1}</div>
                <div className="font-black text-slate-800">{step}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-7xl rounded-2xl border border-slate-200 bg-stone-50 p-6 sm:p-8">
          <h2 className="mb-3 text-2xl font-black text-slate-900 md:text-3xl">{t.seoTitle}</h2>
          <p className="mb-5 max-w-4xl leading-7 text-slate-600">{t.seoDesc}</p>
          <div className="flex flex-wrap gap-2">
            {t.seoKeywords.map((keyword) => (
              <span key={keyword} className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700">
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="mb-6 text-center text-2xl font-black text-slate-900">
            {authMode === 'login' ? t.loginTitle : authMode === 'register' ? t.registerBtn : authMode === 'forgot' ? t.forgotTitle : t.resetTitle}
          </h2>
          <form onSubmit={handleAuth} className="space-y-4">
            {(authMode === 'login' || authMode === 'register') && (
              <label className="block text-sm font-bold text-slate-700">
                {t.userLabel}
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 bg-stone-50 p-4 outline-none transition focus:border-amber-500 focus:bg-white" placeholder={t.userPlaceholder} />
              </label>
            )}
            {(authMode === 'register' || authMode === 'forgot' || authMode === 'reset') && (
              <label className="block text-sm font-bold text-slate-700">
                {t.emailLabel}
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 bg-stone-50 p-4 outline-none transition focus:border-amber-500 focus:bg-white" placeholder={t.emailPlaceholder} />
              </label>
            )}
            {authMode === 'reset' && (
              <label className="block text-sm font-bold text-slate-700">
                {t.tokenLabel}
                <input type="text" value={token} onChange={(e) => setToken(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 bg-stone-50 p-4 outline-none transition focus:border-amber-500 focus:bg-white" placeholder={t.tokenPlaceholder} />
              </label>
            )}
            {authMode !== 'forgot' && (
              <label className="block text-sm font-bold text-slate-700">
                {authMode === 'reset' ? t.resetTitle : t.passLabel}
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 bg-stone-50 p-4 outline-none transition focus:border-amber-500 focus:bg-white" placeholder={t.passPlaceholder} />
              </label>
            )}
            {authMode === 'login' && (
              <div className="text-right">
                <button type="button" onClick={() => setAuthMode('forgot')} className="text-xs font-bold text-slate-500 transition hover:text-slate-900">
                  {t.forgotLink}
                </button>
              </div>
            )}
            <button type="submit" className="w-full rounded-xl bg-slate-900 px-4 py-4 font-black text-white shadow-md transition hover:bg-slate-700">
              {authMode === 'login' ? t.loginBtn : authMode === 'register' ? t.registerBtn : authMode === 'forgot' ? t.forgotBtn : t.resetBtn}
            </button>
          </form>

          {(authMode === 'login' || authMode === 'register') && (
            <div className="mt-6 text-center">
              <button onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')} className="text-sm font-bold text-amber-700 hover:underline">
                {authMode === 'login' ? t.switchRegister : t.switchLogin}
              </button>
            </div>
          )}
          {(authMode === 'forgot' || authMode === 'reset') && (
            <div className="mt-6 text-center">
              <button onClick={() => setAuthMode('login')} className="text-sm font-bold text-slate-500 hover:underline">
                {t.switchLogin}
              </button>
            </div>
          )}
          {message && <div className={`mt-4 rounded-xl p-3 text-center font-bold ${message === t.loginSuccess ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{message}</div>}
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white py-8 text-center text-sm font-medium text-slate-500">
        {t.footer}
      </footer>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-950/70 px-4 py-4 backdrop-blur-sm sm:items-center sm:py-8">
          <div className="relative w-full max-w-lg rounded-2xl bg-white p-5 shadow-2xl sm:p-6 md:p-8">
            <h2 className="mb-6 text-2xl font-black text-slate-900">{t.modalTitle}</h2>
            {bookMessage ? (
              <div className="rounded-xl bg-green-100 p-6 text-center text-lg font-black text-green-700">{bookMessage}</div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm font-bold text-slate-700">
                    {t.nameLabel}
                    <input type="text" value={bookName} onChange={(e) => setBookName(e.target.value)} required className="mt-1 w-full rounded-xl border border-slate-200 bg-stone-50 p-3 outline-none focus:border-amber-500" />
                  </label>
                  <label className="block text-sm font-bold text-slate-700">
                    {t.phoneLabel}
                    <input type="tel" value={bookPhone} onChange={(e) => setBookPhone(e.target.value)} required className="mt-1 w-full rounded-xl border border-slate-200 bg-stone-50 p-3 outline-none focus:border-amber-500" />
                  </label>
                </div>
                <label className="block text-sm font-bold text-slate-700">
                  {t.serviceLabel}
                  <select value={bookService} onChange={(e) => setBookService(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 bg-stone-50 p-3 outline-none focus:border-amber-500">
                    {t.serviceOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </label>
                <label className="block text-sm font-bold text-slate-700">
                  {t.dateLabel}
                  <input type="date" value={bookDate} onChange={(e) => setBookDate(e.target.value)} required className="mt-1 w-full rounded-xl border border-slate-200 bg-stone-50 p-3 outline-none focus:border-amber-500" />
                </label>
                <label className="block text-sm font-bold text-slate-700">
                  {t.descLabel}
                  <textarea value={bookDesc} onChange={(e) => setBookDesc(e.target.value)} rows={4} className="mt-1 w-full resize-none rounded-xl border border-slate-200 bg-stone-50 p-3 outline-none focus:border-amber-500" placeholder={t.descPlaceholder} />
                </label>
                <div className="grid gap-3 pt-3 sm:flex">
                  <button type="button" onClick={() => setShowModal(false)} disabled={isSubmitting} className="rounded-xl bg-slate-100 py-3 font-black text-slate-600 transition hover:bg-slate-200 sm:w-1/3">
                    {t.cancelBtn}
                  </button>
                  <button type="submit" disabled={isSubmitting} className="rounded-xl bg-amber-400 py-3 font-black text-slate-950 shadow-lg transition hover:bg-amber-300 disabled:bg-amber-200 sm:w-2/3">
                    {isSubmitting ? t.submittingBtn : t.submitBtn}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
