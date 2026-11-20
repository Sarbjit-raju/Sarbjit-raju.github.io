/* Sarbjit Raju — résumé assistant.
   Runs fully in the visitor's browser: no server, no API key, no data sent anywhere by this code.
   It answers ONLY from the facts below (taken from the résumé). It never contains or reveals
   the email address or phone number — contact questions are pointed to the Contact buttons. */
(function () {
  'use strict';

  // ---------- experience, counted from the Revclerx start date (1 April 2023) ----------
  const EXP = (function () {
    const start = new Date(2023, 3, 1), now = new Date();
    let m = (now.getFullYear() - start.getFullYear()) * 12 + now.getMonth() - start.getMonth();
    if (now.getDate() < start.getDate()) m--;
    m = Math.max(0, m);
    const y = Math.floor(m / 12), r = m % 12, s = n => (n === 1 ? '' : 's');
    return (y ? y + ' year' + s(y) : '') + (y && r ? ' ' : '') + (r ? r + ' month' + s(r) : '');
  })();

  // ---------- knowledge base ----------
  const KB = [
    { id: 'greet', k: ['hi', 'hello', 'hey', 'good morning', 'good evening', 'good afternoon', 'namaste'],
      a: "Hi! I'm Sarbjit's AI assistant. Ask me anything about his experience, skills, projects, education or how to get in touch." },
    { id: 'thanks', k: ['thanks', 'thank you', 'thankyou', 'great', 'awesome', 'nice', 'cool', 'bye', 'goodbye'],
      a: "You're welcome! If you'd like to talk to Sarbjit directly, use the Send email, Call me or WhatsApp buttons in the Contact section." },
    { id: 'about', generic: true, k: ['who is', 'who are you', 'introduce', 'yourself', 'tell me about', 'about sarbjit', 'about him', 'summary', 'profile', 'overview', 'sarbjit', 'describe'],
      a: "Sarbjit Raju is a .NET Full Stack Developer and Agentic AI / Generative AI integration specialist based in Mohali, Punjab. He has shipped production RAG pipelines and autonomous LLM-powered automation in a live enterprise SaaS product, with " + EXP + " of experience at Revclerx AI Solutions." },
    { id: 'experience', w: 0.7, k: ['where does he work', 'where do you work', 'work experience', 'experience', 'work', 'job', 'company', 'employer', 'revclerx', 'role', 'position', 'designation', 'career', 'currently working', 'present'],
      a: "Since April 2023 (" + EXP + "), Sarbjit has been a Software Developer (.NET & AI) at Revclerx AI Solutions Pvt. Ltd. (formerly Revclerx Pvt. Ltd.), a B2B SaaS startup of about 20 people building marketing automation tools for enterprise clients. His work covers Agentic AI / Generative AI / RAG and the core .NET platform." },
    { id: 'rag', k: ['rag system', 'system', 'rag', 'retrieval', 'langchain', 'llamaindex', 'llama index', 'documents', 'azure openai', 'gpt', 'search', 'natural language', 'chatbot', 'llm'],
      a: "Sarbjit architected and shipped a production Agentic AI-driven RAG system using LangChain, LlamaIndex and Azure OpenAI (GPT-4). It lets enterprise users query 10,000+ internal documents in natural language, replacing a slow keyword search that needed manual effort for every query." },
    { id: 'accuracy', k: ['accuracy', 'prompt', 'prompts', 'improve', 'improved', '55', '78', 'benchmark', 'hallucination', 'escalation', 'escalations'],
      a: "By redesigning GPT-4 prompt strategies and retrieval context windows, Sarbjit lifted AI response accuracy from about 55% to about 78%, measured on a 100-question human-evaluated benchmark. That directly reduced support escalations caused by incorrect AI answers." },
    { id: 'vector', k: ['vector database', 'vector', 'chroma', 'pinecone', 'latency', 'embedding', 'embeddings', 'semantic'],
      a: "He integrated the Chroma vector database for semantic document retrieval and achieved sub-second query latency on a corpus of 10,000+ documents. He is also proficient with Pinecone." },
    { id: 'agents', k: ['agent', 'agents', 'agentic', 'automation', 'automate', 'automated', 'autonomous', 'data entry', 'hours', 'saved', 'time saved', 'workflow', 'workflows'],
      a: "Sarbjit built Python-based agentic AI conversational agents, exposed through REST APIs, that autonomously automated about 60% of manual data-entry workflows (form processing and report generation). This saved the operations team 20+ hours every month." },
    { id: 'projects', k: ['project', 'projects', 'portfolio', 'built', 'build', 'worked on'],
      a: "Key projects: (1) a production Agentic AI RAG system (LangChain, LlamaIndex, Azure OpenAI GPT-4) that lets enterprise users query 10,000+ documents in natural language, with accuracy raised from ~55% to ~78%; (2) Python agentic AI agents that automated 60% of manual data-entry work, saving 20+ hours a month; (3) 3 full-stack ASP.NET Core modules of the AMP marketing platform, including a 35% faster View Asset module." },
    { id: 'platform', k: ['amp', 'platform', 'marketing', 'asset', 'modules', 'module', 'full stack project', 'asp.net project', 'releases', 'release', 'agile', 'team'],
      a: "On the core platform he delivered 3 full-stack modules of the AMP marketing platform using ASP.NET Core REST APIs and an HTML5/Bootstrap frontend, working in an Agile team of 5+ developers across 10+ production releases." },
    { id: 'perf', k: ['performance', 'optimise', 'optimize', 'optimized', 'optimised', 'sql optimization', 'caching', 'cache', 'faster', '35', 'query', 'queries', 'view asset'],
      a: "He optimised critical SQL Server queries and introduced server-side caching in the View Asset module (drip campaigns and email templates). That cut asset retrieval time by 35% and resolved the top performance complaint from clients." },
    { id: 'quality', k: ['test', 'tests', 'testing', 'xunit', 'nunit', 'unit test', 'quality', 'code review', 'reviews', 'incident', 'incidents', 'bugs', 'reliable'],
      a: "Sarbjit writes xUnit tests for all new API endpoints, conducts pull-request code reviews, and has shipped 10+ production releases with zero critical post-release incidents." },
    { id: 'skills', k: ['skill', 'skills', 'technology', 'technologies', 'tech stack', 'stack', 'tools', 'expert', 'expertise', 'good at', 'know', 'proficient', 'strengths'],
      a: "Expert in: ASP.NET Core / MVC, C#, Python, Entity Framework Core, REST APIs, Generative AI (OpenAI GPT-4, Azure OpenAI), Agentic AI systems, Microsoft Agent Framework, LangChain, LlamaIndex, RAG pipelines, prompt engineering and SQL Server.\nProficient: React, Semantic Kernel, AI agent orchestration, Chroma, Pinecone, .NET 6/7/8, microservices, PostgreSQL, MongoDB, Docker, Azure, CI/CD and xUnit/NUnit.\nFamiliar: HTML5, CSS3, JavaScript, jQuery, Bootstrap, AJAX, Swagger and Postman." },
    { id: 'ai', k: ['ai', 'artificial intelligence', 'generative', 'genai', 'machine learning', 'openai', 'semantic kernel', 'orchestration', 'agent framework', 'microsoft agent'],
      a: "On the AI side Sarbjit works with Generative AI (OpenAI GPT-4, Azure OpenAI Service), Agentic AI systems, RAG pipelines, prompt engineering, LangChain, LlamaIndex, Semantic Kernel, AI agent orchestration and vector databases (Chroma, Pinecone). He is also working with the Microsoft Agent Framework." },
    { id: 'dotnet', k: ['dotnet', 'csharp', 'asp', 'mvc', 'backend', 'back end', 'entity framework', 'ef core', 'api', 'apis', 'rest', 'sql server', 'microservice', 'microservices', 'postgres', 'postgresql', 'mongodb'],
      a: "Backend is Sarbjit's core: ASP.NET Core / MVC, C#, Entity Framework Core, REST APIs and SQL Server at expert level, plus .NET 6/7/8, microservices, PostgreSQL and MongoDB at a proficient level." },
    { id: 'frontend', k: ['frontend', 'front end', 'react', 'html', 'css', 'javascript', 'jquery', 'bootstrap', 'ajax', 'ui'],
      a: "On the frontend Sarbjit is proficient in React, and familiar with HTML5, CSS3, JavaScript, jQuery, Bootstrap and AJAX." },
    { id: 'python', k: ['python'],
      a: "Python is one of Sarbjit's expert skills. He uses it to build agentic AI conversational agents and AI automation exposed through REST APIs." },
    { id: 'cloud', k: ['cloud', 'azure', 'docker', 'devops', 'ci', 'cd', 'pipeline', 'pipelines', 'git', 'github', 'deployment', 'deploy'],
      a: "He works with Azure cloud services (including Azure OpenAI), Docker, CI/CD pipelines, and Git / GitHub with pull-request code reviews." },
    { id: 'learning', k: ['learning', 'currently learning', 'new', 'latest', 'recent', 'upskilling', 'working on'],
      a: "Alongside Semantic Kernel and AI agent orchestration, Sarbjit is currently also working with the Microsoft Agent Framework." },
    { id: 'education', k: ['education', 'study', 'studied', 'degree', 'college', 'university', 'btech', 'b tech', 'graduate', 'graduation', 'qualification', 'qualifications', 'rayat', 'bahra', 'school'],
      a: "Sarbjit holds a B.Tech in Computer Science Engineering from Rayat Bahra College of Engineering, Punjab (2017 – March 2021). Coursework included Data Structures, DBMS, Operating Systems, Software Engineering and Computer Networks." },
    { id: 'location', k: ['where is he', 'where does he live', 'where he lives', 'where are you', 'location', 'located', 'live', 'city', 'based', 'relocate', 'relocation', 'remote', 'mohali', 'punjab', 'india'],
      a: "Sarbjit is based in Mohali, Punjab, India, and is open to relocating." },
    { id: 'seeking', k: ['looking for', 'seeking', 'hire', 'hiring', 'opportunity', 'opportunities', 'open to', 'target', 'available', 'availability', 'job search', 'senior'],
      a: "Sarbjit is targeting Senior .NET / Generative AI & Agentic AI Engineer roles where deep backend engineering and applied LLM integration are both valued. He is open to relocating." },
    { id: 'why', k: ['why should', 'why hire', 'what makes', 'unique', 'special', 'different', 'rare', 'strength', 'best', 'achievement', 'achievements', 'accomplishment', 'accomplishments', 'proud', 'impact', 'results', 'numbers', 'highlight', 'highlights'],
      a: "Sarbjit is one of the rare .NET developers who has shipped production Agentic AI and Generative AI systems in a live enterprise product. Highlights: AI accuracy up from ~55% to ~78%, 20+ hours saved per month through agentic automation, 35% faster asset retrieval, and 10+ production releases with zero critical incidents." },
    { id: 'contact', act: 'contact', k: ['contact', 'reach', 'email', 'mail', 'phone', 'call', 'number', 'mobile', 'whatsapp', 'whats app', 'message', 'get in touch', 'talk to', 'speak to', 'connect', 'address'],
      a: "To protect Sarbjit's privacy I don't show his email or phone number here. Use the Send email, Call me or WhatsApp buttons in the Contact section. They open directly, and you can also connect on LinkedIn." },
    { id: 'resume', act: 'resume', k: ['resume', 'cv', 'curriculum', 'download'],
      a: "You can download Sarbjit's résumé as a PDF using the button below or the Download Résumé button at the top of the page." },
    { id: 'linkedin', act: 'linkedin', k: ['linkedin', 'social', 'profile link'],
      a: "You can find Sarbjit on LinkedIn at linkedin.com/in/sarbjit-raju." },
    { id: 'private', k: ['how old', 'salary', 'ctc', 'package', 'notice', 'notice period', 'expected', 'age', 'married', 'family', 'religion', 'address', 'birthday', 'birth', 'passport', 'visa'],
      a: "That isn't listed on the site, and I only share professional details from the résumé. Please reach out through the Contact buttons and Sarbjit can discuss it directly.", act: 'contact' }
  ];

  const FALLBACK = "I only know what's in Sarbjit's résumé, and I couldn't find that. Try asking about his experience, skills, the RAG system he built, his education, or how to contact him.";

  const CHIPS = ['Biggest achievements?', 'Tell me about the RAG system', 'Is he open to relocation?', 'Education?', 'Download résumé', 'How can I contact him?'];

  // ---------- matching ----------
  function norm(s) {
    return ' ' + String(s).toLowerCase()
      .replace(/\.net/g, 'dotnet').replace(/dot ?net/g, 'dotnet')
      .replace(/c#/g, 'csharp').replace(/c sharp/g, 'csharp')
      .replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim() + ' ';
  }
  const INDEX = KB.map(e => ({ e, kws: e.k.map(norm).map(x => x.trim()) }));

  function hit(q, kw) {
    if (!kw) return false;
    if (kw.length <= 3) return q.indexOf(' ' + kw + ' ') !== -1;   // short words: whole-word only
    return q.indexOf(' ' + kw) !== -1;                              // longer: prefix match (skill -> skills)
  }

  function answerFor(text) {
    const q = norm(text);
    if (!q.trim()) return { a: FALLBACK };
    const scored = [];
    for (const { e, kws } of INDEX) {
      let score = 0;
      for (const kw of kws) if (hit(q, kw)) score += kw.split(' ').length * 3 + Math.min(kw.length, 12) / 4;
      // greetings only count for short messages (avoid "hi" inside a long question)
      if ((e.id === 'greet' || e.id === 'thanks') && q.trim().split(' ').length > 6) score = 0;
      scored.push({ e, score });
    }
    // the generic intro entry only wins when nothing more specific matched
    const specific = Math.max(0, ...scored.filter(x => !x.e.generic).map(x => x.score));
    let best = null, bestScore = 0;
    for (const x of scored) {
      let sc = x.score * (x.e.w || 1);
      if (x.e.generic && specific > 0) sc *= 0.2;
      if (sc > bestScore) { bestScore = sc; best = x.e; }
    }
    if (!best || bestScore < 3) return { a: FALLBACK };
    return { a: best.a, act: best.act, id: best.id };
  }

  if (typeof module !== 'undefined' && module.exports) { module.exports = { answerFor, KB, FALLBACK }; return; }
  if (typeof document === 'undefined') return;

  // ---------- UI ----------
  const $ = id => document.getElementById(id);
  const fab = $('aiFab'), panel = $('aiPanel'), log = $('aiLog'), body = $('aiBody'), form = $('aiForm'),
        input = $('aiInput'), mic = $('aiMic'), vol = $('aiVol'), close = $('aiClose'), mini = $('aiMin'),
        chipsEl = $('aiChips'), status = $('aiStatus'), send = $('aiSend'), tease = $('aiTease');
  if (!fab || !panel) return;
  const coarse = matchMedia('(pointer: coarse)').matches;

  // ---------- transcript e-mail (Web3Forms) ----------
  // Paste your free Web3Forms access key here. It is safe to be public: it can only send mail to
  // the inbox it was created for, and that address is never in this file. Empty = nothing is recorded.
  const W3F_KEY = '';
  const W3F_URL = 'https://api.web3forms.com/submit';
  const MAX_MAILS = 5;                                   // per visit, to limit spam/abuse
  const SID = Math.random().toString(36).slice(2, 8).toUpperCase();
  const log_ = [];                                       // {t, role, text, id}
  let sentUpTo = 0, mails = 0, idleT = null, vName = '', vEmail = '';
  const who = $('aiWho'), note = $('aiNote');
  if (W3F_KEY) { if (who) who.hidden = false; if (note) note.hidden = false; }

  function validEmail(e) { return /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,}$/.test(e); }

  function flush(reason) {
    if (!W3F_KEY || mails >= MAX_MAILS || sentUpTo >= log_.length) return;
    const part = log_.slice(sentUpTo);
    const lines = part.map(m => {
      const hh = new Date(m.t).toLocaleTimeString('en-GB');
      if (m.role === 'u') return '[' + hh + '] VISITOR: ' + m.text;
      if (m.role === 's') return '[' + hh + '] ' + m.text;
      return '[' + hh + '] ASSISTANT (' + (m.id ? 'topic: ' + m.id : 'NO MATCH - not in résumé data') + '): ' + m.text.replace(/\n/g, ' ').slice(0, 220);
    });
    const nav = navigator;
    const payload = {
      access_key: W3F_KEY,
      subject: 'Portfolio chat #' + SID + (mails ? ' (part ' + (mails + 1) + ')' : ''),
      from_name: 'Portfolio AI Assistant',
      message: lines.join('\n'),
      visitor_name: vName || '(not given)',
      visitor_email: vEmail || '(not given)',
      session: SID,
      sent_because: reason,
      visit_local_time: new Date().toString(),
      timezone: (Intl.DateTimeFormat().resolvedOptions().timeZone || ''),
      language: nav.language || '',
      came_from: document.referrer || '(direct)',
      device: (coarse ? 'phone/tablet' : 'computer') + ' ' + screen.width + 'x' + screen.height,
      botcheck: ''
    };
    if (vEmail) payload.replyto = vEmail;
    sentUpTo = log_.length; mails++;
    const body = JSON.stringify(payload);
    try {
      if (reason === 'leaving' && nav.sendBeacon) nav.sendBeacon(W3F_URL, new Blob([body], { type: 'application/json' }));
      else fetch(W3F_URL, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body, keepalive: true }).catch(() => {});
    } catch (_) {}
  }
  function queueFlush() { clearTimeout(idleT); idleT = setTimeout(() => flush('idle'), 75000); }
  addEventListener('pagehide', () => flush('leaving'));
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') flush('leaving'); });

  let speakOn = true;
  const synth = window.speechSynthesis;
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const BOT = '<svg viewBox="0 0 120 120" aria-hidden="true"><use href="#bot"/></svg>';

  // LLM answers can contain markdown; show and speak them as clean text.
  function clean(t) {
    return String(t || '').replace(/\*\*(.+?)\*\*/g, '$1').replace(/__(.+?)__/g, '$1').replace(/`/g, '')
      .replace(/^#{1,6}\s*/gm, '').replace(/^\s*[-*]\s+/gm, '• ').replace(/\n{3,}/g, '\n\n').trim();
  }
  function toEnd() { body.scrollTop = body.scrollHeight; }

  function add(role, text, act) {
    const row = document.createElement('div');
    row.className = 'row ' + role;
    if (role === 'b') { const av = document.createElement('span'); av.className = 'mini'; av.innerHTML = BOT; row.appendChild(av); }
    const d = document.createElement('div');
    d.className = 'm ' + role;
    d.textContent = text;                       // textContent => no HTML injection possible
    if (act) {
      const acts = document.createElement('div'); acts.className = 'acts';
      if (act === 'contact') {
        const b = document.createElement('button'); b.type = 'button'; b.textContent = 'Go to Contact ↓';
        b.onclick = () => { minimize(); document.getElementById('contact').scrollIntoView({ behavior: 'smooth' }); };
        acts.appendChild(b);
      } else if (act === 'resume') {
        const a = document.createElement('a'); a.href = 'Sarbjit_Raju_Resume.pdf'; a.setAttribute('download', ''); a.textContent = '⬇ Download Résumé'; acts.appendChild(a);
      } else if (act === 'linkedin') {
        const a = document.createElement('a'); a.href = 'https://linkedin.com/in/sarbjit-raju'; a.target = '_blank'; a.rel = 'noopener'; a.textContent = 'Open LinkedIn ↗'; acts.appendChild(a);
      }
      d.appendChild(acts);
    }
    if (text) {
      const tm = document.createElement('small'); tm.className = 'time';
      tm.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      d.appendChild(tm);
    }
    row.appendChild(d); log.appendChild(row); toEnd();
    return row;
  }
  function typingRow() {
    const row = add('b', '');
    row.querySelector('.m').innerHTML = '<span class="typing" aria-label="Assistant is typing"><i></i><i></i><i></i></span>';
    return row;
  }

  // ---------- voice output ----------
  function pickVoice() {
    if (!synth) return null;
    const v = synth.getVoices();
    return v.find(x => /en[-_]IN/i.test(x.lang) && /natural|neural|online/i.test(x.name)) ||
           v.find(x => /^en/i.test(x.lang) && /natural|neural|online/i.test(x.name)) ||
           v.find(x => /en[-_]IN/i.test(x.lang)) || v.find(x => /^en/i.test(x.lang)) || null;
  }
  function speak(t) {
    if (!speakOn || !synth) return;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(t.replace(/•/g, '').replace(/\n+/g, '. '));
    const v = pickVoice(); if (v) u.voice = v; u.lang = v ? v.lang : 'en-IN'; u.rate = 1.02;
    u.onstart = () => panel.classList.add('talking');
    u.onend = u.onerror = () => panel.classList.remove('talking');
    synth.speak(u);
  }
  function stopSpeak() { if (synth) synth.cancel(); panel.classList.remove('talking'); }
  if (synth && synth.onvoiceschanged !== undefined) synth.onvoiceschanged = () => {};

  // ---------- cloud AI (Cloudflare Worker + D1 knowledge + LLM) ----------
  // No secret keys here: the Worker holds them. If it is unreachable, the local résumé answers are used.
  const AI_API = 'https://sarbjit-portfolio-ai.sarbjit-portfolio-ai.workers.dev/api/chat';
  const hist = [];
  async function cloudAnswer(text) {
    const ctl = new AbortController(); const to = setTimeout(() => ctl.abort(), 20000);
    try {
      const r = await fetch(AI_API, { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: text, history: hist.slice(-6) }), signal: ctl.signal });
      const j = await r.json();
      return r.ok && j.answer ? j.answer : null;
    } catch (_) { return null; } finally { clearTimeout(to); }
  }

  let busy = false;
  async function ask(text) {
    text = String(text || '').trim().slice(0, 300);
    if (!text || busy) return;
    busy = true; send.disabled = true;
    stopSpeak();
    panel.classList.add('started');
    add('u', text); input.value = ''; status.textContent = '';
    const wait = typingRow();
    const local = answerFor(text);
    const quick = local.id === 'greet' || local.id === 'thanks';     // instant, no network needed
    const ai = quick ? null : await cloudAnswer(text);
    if (quick) await new Promise(r => setTimeout(r, 450));
    const a = clean(ai || local.a);
    wait.remove();
    hist.push({ role: 'user', content: text }, { role: 'assistant', content: a });
    log_.push({ t: Date.now(), role: 'u', text }, { t: Date.now(), role: 'b', text: a, id: ai ? 'cloud-ai' + (local.id ? '/' + local.id : '') : local.id });
    queueFlush();
    add('b', a, local.act); speak(a);
    busy = false; send.disabled = false;
    if (!coarse) input.focus();
  }

  // ---------- open / minimize / close ----------
  let teaseOff = false;
  try { teaseOff = sessionStorage.getItem('aiTease') === 'off'; } catch (_) {}
  function hideTease(remember) {
    if (tease) tease.hidden = true;
    if (remember) { teaseOff = true; try { sessionStorage.setItem('aiTease', 'off'); } catch (_) {} }
  }
  function open() {
    panel.hidden = false; fab.setAttribute('aria-expanded', 'true'); hideTease(true);
    if (!coarse) setTimeout(() => input.focus(), 60);
  }
  function minimize() { panel.hidden = true; fab.setAttribute('aria-expanded', 'false'); stopSpeak(); cancelListen(); fab.focus(); }
  function shut() { minimize(); flush('closed'); }

  fab.onclick = () => (panel.hidden ? open() : minimize());
  mini.onclick = minimize;
  close.onclick = shut;
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !panel.hidden) minimize(); });
  if (tease) {
    tease.onclick = e => { if (e.target.closest('#aiTeaseX')) hideTease(true); else open(); };
    if (!teaseOff) setTimeout(() => {
      if (!panel.hidden || teaseOff) return;
      tease.hidden = false; setTimeout(() => hideTease(false), 15000);
    }, 3500);
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (voice) { voice.submit(); return; }        // pressing send while talking = "I'm done"
    ask(input.value);
  });
  document.querySelectorAll('#aiTiles button').forEach(b => b.onclick = () => {
    if (b.dataset.q) { ask(b.dataset.q); return; }
    input.focus();
    status.textContent = SR ? 'Type your question, or tap the mic to ask by voice.' : 'Type your question below.';
  });
  CHIPS.forEach(c => { const b = document.createElement('button'); b.type = 'button'; b.textContent = c; b.onclick = () => ask(c); chipsEl.appendChild(b); });

  const wSave = $('aiWhoSave');
  if (wSave) wSave.onclick = () => {
    const n = ($('aiWhoName').value || '').trim().slice(0, 80), e = ($('aiWhoEmail').value || '').trim().slice(0, 254);
    if (e && !validEmail(e)) { status.textContent = 'That email address does not look right.'; return; }
    if (!n && !e) { status.textContent = 'Add a name or an email first.'; return; }
    vName = n; vEmail = e;
    log_.push({ t: Date.now(), role: 's', text: 'VISITOR SHARED DETAILS: ' + (n || '-') + ' / ' + (e || '-') });
    status.textContent = '✅ Thanks! Sarbjit may reply to you.'; queueFlush();
  };

  vol.onclick = () => {
    speakOn = !speakOn; vol.classList.toggle('off', !speakOn);
    vol.setAttribute('aria-pressed', String(!speakOn));
    vol.setAttribute('aria-label', speakOn ? 'Mute voice replies' : 'Turn on voice replies');
    if (!speakOn) stopSpeak();
  };

  // ---------- voice input ----------
  // Keeps listening while the visitor talks and only answers after a short silence,
  // so natural pauses mid-question don't cut them off. Tap the mic (or send) to finish early.
  const SILENCE_MS = 2000, NO_SPEECH_MS = 9000;
  let voice = null;
  function setListening(on) {
    mic.classList.toggle('on', on); panel.classList.toggle('listening', on);
    mic.setAttribute('aria-pressed', String(on));
    mic.setAttribute('aria-label', on ? 'Stop listening and send' : 'Ask with your voice');
    input.placeholder = on ? 'Listening… speak naturally' : 'Type your message…';
  }
  function cancelListen() { if (voice) voice.cancel(); }

  function startListen() {
    stopSpeak();
    const r = new SR();
    r.lang = 'en-IN'; r.interimResults = true; r.continuous = true; r.maxAlternatives = 1;
    let finalText = '', interim = '', done = false, heard = false, silenceT = null;
    const noSpeechT = setTimeout(() => submit(), NO_SPEECH_MS);
    const text = () => (finalText + ' ' + interim).replace(/\s+/g, ' ').trim();
    function end() {
      done = true; voice = null;
      clearTimeout(silenceT); clearTimeout(noSpeechT);
      try { r.abort(); } catch (_) {}
      setListening(false);
    }
    function submit() {
      if (done) return;
      const t = text(); end();
      if (t) { status.textContent = ''; ask(t); }
      else { input.value = ''; status.textContent = "I didn't catch that. Tap the mic and try again."; }
    }
    function cancel() { if (!done) { end(); input.value = ''; status.textContent = ''; } }
    voice = { submit, cancel };

    r.onstart = () => { setListening(true); status.textContent = "🎙 Listening… take your time — I'll reply when you pause."; };
    r.onresult = ev => {
      clearTimeout(noSpeechT); heard = true;
      interim = '';
      for (let i = ev.resultIndex; i < ev.results.length; i++) {
        const tr = ev.results[i][0].transcript;
        if (ev.results[i].isFinal) finalText += ' ' + tr; else interim += tr;
      }
      input.value = text();
      clearTimeout(silenceT); silenceT = setTimeout(submit, SILENCE_MS);   // restart the pause timer on every word
    };
    r.onerror = ev => {
      if (done || ev.error === 'no-speech' || ev.error === 'aborted') return;
      end();
      status.textContent = ev.error === 'not-allowed' || ev.error === 'service-not-allowed'
        ? 'Microphone access was blocked. Allow it in your browser, or type your question.'
        : 'Voice input is unavailable right now. Please type your question.';
    };
    // Some browsers (e.g. Chrome on Android) stop by themselves after a short pause.
    // Restart so the visitor can keep talking; the silence timer decides when they are finished.
    r.onend = () => {
      if (done) return;
      if (heard && !silenceT) { submit(); return; }
      try { r.start(); } catch (_) { submit(); }
    };
    try { r.start(); } catch (_) { end(); status.textContent = 'Voice input could not start. Please type your question.'; }
  }

  if (!SR) mic.hidden = true;
  else mic.onclick = () => (voice ? voice.submit() : startListen());
})();
