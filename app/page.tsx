'use client';

import React, { useState } from 'react';
import { siteContent, type Lang } from '@/lib/site-content';

export default function Home() {
  const translations = siteContent.translations;
  const [lang, setLang] = useState<Lang>('zh-TW');
  const t = translations[lang];
  const serviceCards = t.serviceCards.map(([title, desc, image]) => ({ title, desc, image }));

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
  const [bookService, setBookService] = useState<string>(t.serviceOptions[0]);
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
              <div className="text-lg font-black tracking-tight text-slate-900 sm:text-xl">{siteContent.brand}</div>
              <div className="hidden text-xs font-bold uppercase tracking-[0.2em] text-slate-500 sm:block">{siteContent.navTagline}</div>
            </div>
          </a>
          <div className="flex flex-1 items-center justify-end gap-1.5 sm:flex-none sm:gap-2">
            <button onClick={handleLangToggle} className="rounded-full border border-slate-300 px-2.5 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-100 sm:px-3 sm:text-sm">
              {t.langBtn}
            </button>
            <a href={siteContent.phoneHref} className="rounded-full bg-slate-900 px-3 py-2 text-xs font-bold text-white shadow-lg transition hover:bg-slate-700 sm:px-5 sm:text-sm">
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
        style={{ backgroundImage: `url('${siteContent.heroImage}')`, backgroundPosition: 'center center' }}
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
            {serviceCards.map((service) => (
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
