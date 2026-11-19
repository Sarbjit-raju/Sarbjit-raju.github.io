/* Sarbjit Raju — résumé assistant.
   Runs fully in the visitor's browser: no server, no API key, no data sent anywhere by this code.
   It answers ONLY from the facts below (taken from the résumé). It never contains or reveals
   the email address or phone number — contact questions are pointed to the Contact buttons. */
(function () {
  'use strict';

  // ---------- knowledge base ----------
  const KB = [
    { id: 'greet', k: ['hi', 'hello', 'hey', 'good morning', 'good evening', 'good afternoon', 'namaste'],
      a: "Hi! I'm Sarbjit's AI assistant. Ask me anything about his experience, skills, projects, education or how to get in touch." },
    { id: 'thanks', k: ['thanks', 'thank you', 'thankyou', 'great', 'awesome', 'nice', 'cool', 'bye', 'goodbye'],
      a: "You're welcome! If you'd like to talk to Sarbjit directly, use the Send email, Call me or WhatsApp buttons in the Contact section." },
    { id: 'about', generic: true, k: ['who is', 'who are you', 'introduce', 'yourself', 'tell me about', 'about sarbjit', 'about him', 'summary', 'profile', 'overview', 'sarbjit', 'describe'],
      a: "Sarbjit Raju is a .NET Full Stack Developer and Agentic AI / Generative AI integration specialist based in Mohali, Punjab. He has shipped production RAG pipelines and autonomous LLM-powered automation in a live enterprise SaaS product, with 3+ years of experience at Revclerx AI Solutions." },
    { id: 'experience', w: 0.7, k: ['where does he work', 'where do you work', 'work experience', 'experience', 'work', 'job', 'company', 'employer', 'revclerx', 'role', 'position', 'designation', 'career', 'currently working', 'present'],
      a: "Since April 2023, Sarbjit has been a Software Developer (.NET & AI) at Revclerx AI Solutions Pvt. Ltd. (formerly Revclerx Pvt. Ltd.), a B2B SaaS startup of about 20 people building marketing automation tools for enterprise clients. His work covers Agentic AI / Generative AI / RAG and the core .NET platform." },
    { id: 'rag', k: ['rag system', 'system', 'rag', 'retrieval', 'langchain', 'llamaindex', 'llama index', 'documents', 'azure openai', 'gpt', 'search', 'natural language', 'chatbot', 'llm'],
      a: "Sarbjit architected and shipped a production Agentic AI-driven RAG system using LangChain, LlamaIndex and Azure OpenAI (GPT-4). It lets enterprise users query 10,000+ internal documents in natural language, replacing a slow keyword search that needed manual effort for every query." },
    { id: 'accuracy', k: ['accuracy', 'prompt', 'prompts', 'improve', 'improved', '55', '78', 'benchmark', 'hallucination', 'escalation', 'escalations'],
      a: "By redesigning GPT-4 prompt strategies and retrieval context windows, Sarbjit lifted AI response accuracy from about 55% to about 78%, measured on a 100-question human-evaluated benchmark. That directly reduced support escalations caused by incorrect AI answers." },
    { id: 'vector', k: ['vector database', 'vector', 'chroma', 'pinecone', 'latency', 'embedding', 'embeddings', 'semantic'],
      a: "He integrated the Chroma vector database for semantic document retrieval and achieved sub-second query latency on a corpus of 10,000+ documents. He is also proficient with Pinecone." },
    { id: 'agents', k: ['agent', 'agents', 'agentic', 'automation', 'automate', 'automated', 'autonomous', 'data entry', 'hours', 'saved', 'time saved', 'workflow', 'workflows'],
      a: "Sarbjit built Python-based agentic AI conversational agents, exposed through REST APIs, that autonomously automated about 60% of manual data-entry workflows (form processing and report generation). This saved the operations team 20+ hours every month." },
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

  const CHIPS = ['Tell me about Sarbjit', 'What are his skills?', 'Biggest achievements?', 'Tell me about the RAG system', 'Education?', 'How can I contact him?'];

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
  const fab = $('aiFab'), panel = $('aiPanel'), log = $('aiLog'), form = $('aiForm'),
        input = $('aiInput'), mic = $('aiMic'), vol = $('aiVol'), close = $('aiClose'),
        chipsEl = $('aiChips'), status = $('aiStatus');
  if (!fab || !panel) return;

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
      device: (matchMedia('(pointer: coarse)').matches ? 'phone/tablet' : 'computer') + ' ' + screen.width + 'x' + screen.height,
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

  let speakOn = true, listening = false, rec = null, greeted = false;
  const synth = window.speechSynthesis;
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;

  function add(role, text, act) {
    const d = document.createElement('div');
    d.className = 'm ' + role;
    d.textContent = text;                       // textContent => no HTML injection possible
    if (act) {
      const row = document.createElement('div'); row.className = 'acts';
      if (act === 'contact') {
        const b = document.createElement('button'); b.type = 'button'; b.textContent = 'Go to Contact ↓';
        b.onclick = () => { panel.hidden = true; stopSpeak(); document.getElementById('contact').scrollIntoView({ behavior: 'smooth' }); };
        row.appendChild(b);
      } else if (act === 'resume') {
        const a = document.createElement('a'); a.href = 'Sarbjit_Raju_Resume.pdf'; a.setAttribute('download', ''); a.textContent = '⬇ Download Résumé'; row.appendChild(a);
      } else if (act === 'linkedin') {
        const a = document.createElement('a'); a.href = 'https://linkedin.com/in/sarbjit-raju'; a.target = '_blank'; a.rel = 'noopener'; a.textContent = 'Open LinkedIn ↗'; row.appendChild(a);
      }
      d.appendChild(row);
    }
    log.appendChild(d); log.scrollTop = log.scrollHeight;
  }

  function pickVoice() {
    if (!synth) return null;
    const v = synth.getVoices();
    return v.find(x => /en[-_]IN/i.test(x.lang)) || v.find(x => /^en/i.test(x.lang)) || null;
  }
  function speak(t) {
    if (!speakOn || !synth) return;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(t.replace(/\n/g, '. '));
    const v = pickVoice(); if (v) u.voice = v; u.lang = v ? v.lang : 'en-IN'; u.rate = 1;
    synth.speak(u);
  }
  function stopSpeak() { if (synth) synth.cancel(); }
  if (synth && synth.onvoiceschanged !== undefined) synth.onvoiceschanged = () => {};

  function ask(text) {
    text = String(text || '').trim().slice(0, 300);
    if (!text) return;
    add('u', text); input.value = '';
    status.textContent = 'Thinking…';
    setTimeout(() => {
      const r = answerFor(text);
      log_.push({ t: Date.now(), role: 'u', text }, { t: Date.now(), role: 'b', text: r.a, id: r.id });
      queueFlush();
      add('b', r.a, r.act); speak(r.a); status.textContent = '';
    }, 350);
  }

  function open() {
    panel.hidden = false; fab.setAttribute('aria-expanded', 'true');
    if (!greeted) {
      greeted = true;
      add('b', "Hi! I'm Sarbjit's AI assistant. " + (SR ? 'Tap the microphone and ask me anything about him, or type your question.' : 'Type a question about his experience, skills or education.'));
    }
    setTimeout(() => input.focus(), 50);
  }
  function shut() { panel.hidden = true; fab.setAttribute('aria-expanded', 'false'); stopSpeak(); stopListen(); flush('closed'); }

  fab.onclick = () => (panel.hidden ? open() : shut());
  close.onclick = shut;
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !panel.hidden) shut(); });
  form.addEventListener('submit', e => { e.preventDefault(); ask(input.value); });
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

  vol.onclick = () => { speakOn = !speakOn; vol.textContent = speakOn ? '🔊' : '🔇'; vol.setAttribute('aria-pressed', String(!speakOn)); if (!speakOn) stopSpeak(); };

  // ---------- voice input ----------
  function stopListen() { if (rec && listening) { try { rec.stop(); } catch (_) {} } listening = false; mic.classList.remove('on'); }
  if (!SR) {
    mic.hidden = true;
  } else {
    mic.onclick = () => {
      if (listening) { stopListen(); return; }
      stopSpeak();
      rec = new SR(); rec.lang = 'en-IN'; rec.interimResults = true; rec.maxAlternatives = 1; rec.continuous = false;
      let finalText = '';
      rec.onstart = () => { listening = true; mic.classList.add('on'); status.textContent = '🎙 Listening… ask your question'; };
      rec.onresult = ev => {
        let t = '';
        for (let i = ev.resultIndex; i < ev.results.length; i++) { t += ev.results[i][0].transcript; if (ev.results[i].isFinal) finalText = t; }
        input.value = t;
      };
      rec.onerror = ev => {
        listening = false; mic.classList.remove('on');
        status.textContent = ev.error === 'not-allowed' || ev.error === 'service-not-allowed'
          ? 'Microphone access was blocked. Allow it in your browser, or type your question.'
          : ev.error === 'no-speech' ? "I didn't hear anything. Tap the mic and try again." : 'Voice input is unavailable right now. Please type your question.';
      };
      rec.onend = () => { listening = false; mic.classList.remove('on'); const t = (finalText || input.value).trim(); if (t) { status.textContent = ''; ask(t); } };
      try { rec.start(); } catch (_) { status.textContent = 'Voice input could not start. Please type your question.'; }
    };
  }
})();
