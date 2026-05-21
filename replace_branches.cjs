const fs = require('fs');

const path = 'components/Home.tsx';
let content = fs.readFileSync(path, 'utf8');

const newCSS = `

        {/* --- CUSTOM CSS FOR BRANCHES --- */}
        <style>{\`
          :root {
            --gold:        #C9A84C;
            --gold-light:  #E8C97A;
            --gold-dim:    rgba(201,168,76,0.12);
            --dark:        #18110A;
            --dark2:       #241908;
            --cream:       #FAF5EC;
            --cream2:      #F3EBD8;
            --ink:         #1E1408;
            --muted:       #7A6545;
            --female:      #C9A84C;
            --male:        #8B6A1F;
          }
          
          /* ══ PAGE HERO ══ */
          .custom-page-hero {
            padding: 130px 80px 70px;
            background: var(--dark);
            position: relative;
            overflow: hidden;
            border-top: 1px solid rgba(201,168,76,0.2);
          }
          .custom-page-hero::before {
            content:'';
            position:absolute; inset:0;
            background:
              radial-gradient(ellipse 60% 80% at 15% 50%, rgba(201,168,76,.12) 0%, transparent 60%),
              radial-gradient(ellipse 40% 60% at 85% 30%, rgba(201,168,76,.07) 0%, transparent 60%);
            pointer-events:none;
          }
          .custom-page-hero::after {
            content:'';
            position:absolute; inset:0;
            background-image: repeating-linear-gradient(
              45deg,
              rgba(201,168,76,0.025) 0, rgba(201,168,76,0.025) 1px,
              transparent 1px, transparent 56px
            );
            pointer-events:none;
          }
          .ch-inner {
            position:relative; z-index:2;
            display:flex; align-items:flex-end; justify-content:space-between;
            gap:40px;
            max-width: 1200px;
            margin: 0 auto;
          }
          .ch-eyebrow {
            display:flex; align-items:center; gap:12px;
            margin-bottom:16px;
          }
          .ch-eyebrow-line { width:32px; height:2px; background:var(--gold); }
          .ch-eyebrow-text {
            font-size:11px; letter-spacing:4px; text-transform:uppercase;
            color:var(--gold); font-weight:700;
          }
          .ch-title {
            font-family:'Hind Siliguri',sans-serif;
            font-size:clamp(42px, 5.5vw, 72px);
            font-weight:700; line-height:1.1;
            color:#fff;
            margin: 0;
          }
          .ch-title span { color:var(--gold); }
          
          .ch-right {
            max-width: 440px;
            padding-left: 40px;
            border-left: 1px solid rgba(201,168,76,.25);
          }
          .ch-desc {
            font-size:15px; line-height:1.9; color:rgba(255,255,255,.7);
          }
          .ch-desc strong { color:var(--gold-light); font-weight:600; }
          
          .ch-pills {
            display:flex; gap:12px; margin-top:32px; flex-wrap: wrap;
          }
          .ch-pill {
            display:flex; align-items:center; gap:8px;
            padding:8px 18px; border-radius:50px;
            border:1px solid rgba(201,168,76,.3);
            background:rgba(201,168,76,.07);
            font-size:13px; color:rgba(255,255,255,.8);
          }
          .ch-pill-dot { width:8px; height:8px; border-radius:50%; }
          .ch-pill-dot.female { background:#E8C97A; }
          .ch-pill-dot.male   { background:#C9A84C; }
          
          /* ══ BRANCHES SECTION ══ */
          .br-sec {
            padding: 0 0 100px;
            background: var(--cream);
            font-family: 'Hind Siliguri', sans-serif;
          }
          
          .br-card {
            display: grid;
            grid-template-columns: 1fr 1fr;
            min-height: 560px;
            position: relative;
            overflow: hidden;
          }
          .br-card:first-child { border-top: 1px solid rgba(201,168,76,.15); }
          .br-card + .br-card { border-top: 1px solid rgba(201,168,76,.12); }
          
          .br-card.reverse { direction: rtl; }
          .br-card.reverse > * { direction: ltr; }
          
          .br-img-wrap {
            position: relative;
            overflow: hidden;
            min-height: 480px;
          }
          .br-img-wrap img.main-img {
            width:100%; height:100%;
            object-fit:cover;
            transition: transform 8s ease, opacity 0.5s ease;
            display:block;
          }
          .br-card:hover .br-img-wrap img.main-img { transform: scale(1.06); }
          
          .br-img-wrap::after {
            content:'';
            position:absolute; inset:0;
            background: linear-gradient(to right, rgba(24,17,10,.5), transparent 60%);
            pointer-events:none;
          }
          .br-card.reverse .br-img-wrap::after {
            background: linear-gradient(to left, rgba(24,17,10,.5), transparent 60%);
          }
          
          .br-img-badge {
            position: absolute;
            top: 28px; left: 28px;
            z-index: 5;
            padding: 8px 18px;
            border-radius: 50px;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 2px;
            text-transform: uppercase;
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            border: 1px solid rgba(255,255,255,.3);
          }
          .br-img-badge.female { background: rgba(232,201,122,.15); color: var(--gold-light); }
          .br-img-badge.male { background: rgba(201,168,76,.15); color: var(--gold); }
          
          .br-thumbs {
            position: absolute;
            bottom: 20px; left: 20px; right: 20px;
            z-index: 5;
            display: flex; gap: 8px;
          }
          .br-thumb {
            width: 56px; height: 42px;
            border-radius: 8px;
            overflow: hidden;
            border: 2px solid rgba(255,255,255,.4);
            cursor: pointer;
            flex-shrink: 0;
            transition: border-color .25s, transform .25s;
          }
          .br-thumb img { width:100%; height:100%; object-fit:cover; }
          .br-thumb.active { border-color: var(--gold); }
          .br-thumb:hover { transform: translateY(-3px); border-color: var(--gold-light); }
          
          .br-text {
            padding: 64px 72px 64px 80px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            background: var(--cream);
            position: relative;
          }
          .br-card.reverse .br-text {
            padding: 64px 80px 64px 72px;
          }
          
          .br-text::before {
            content:'';
            position:absolute; inset:0;
            background-image: radial-gradient(circle, rgba(201,168,76,.06) 1px, transparent 1px);
            background-size: 28px 28px;
            pointer-events:none;
          }
          
          .br-parent {
            display:flex; align-items:center; gap:10px;
            margin-bottom:14px; position:relative; z-index:1;
          }
          .br-parent-dot { width:6px; height:6px; border-radius:50%; background:var(--gold); }
          .br-parent-name { font-size:12px; letter-spacing:2px; text-transform:uppercase; color:var(--muted); font-weight:500; }
          
          .br-name {
            font-family:'Playfair Display',serif;
            font-size:clamp(36px, 4vw, 58px);
            font-weight:900;
            line-height:1;
            color:var(--ink);
            margin-bottom:10px;
            position:relative; z-index:1;
          }
          
          .br-tagline {
            font-size:15px; color:var(--gold);
            font-weight:600; letter-spacing:.3px;
            margin-bottom:28px; position:relative; z-index:1;
            font-style:italic;
          }
          
          .br-divider {
            width:48px; height:2px;
            background:linear-gradient(to right, var(--gold), var(--gold-light));
            border-radius:1px;
            margin-bottom:28px;
            position:relative; z-index:1;
          }
          
          .br-addr-box {
            display:flex; align-items:flex-start; gap:14px;
            padding:18px 20px;
            border:1px solid rgba(201,168,76,.2);
            border-radius:14px;
            background:#fff;
            margin-bottom:24px;
            box-shadow:0 4px 20px rgba(26,18,8,.06);
            position:relative; z-index:1;
            transition: border-color .3s, box-shadow .3s;
          }
          .br-addr-box:hover { border-color:rgba(201,168,76,.45); box-shadow:0 8px 30px rgba(201,168,76,.12); }
          .br-addr-icon {
            width:36px; height:36px; flex-shrink:0;
            border-radius:10px;
            background:linear-gradient(135deg,var(--gold),#8B6A1F);
            display:flex; align-items:center; justify-content:center;
            margin-top:1px;
          }
          .br-addr-icon svg { width:16px; height:16px; stroke:#fff; fill:none; stroke-width:2.2; }
          .br-addr-text { font-size:14px; line-height:1.7; color:#4A3B22; font-weight:400; margin: 0; }
          
          .br-tags {
            display:flex; flex-wrap:wrap; gap:8px;
            margin-bottom:32px;
            position:relative; z-index:1;
          }
          .br-tag {
            display:flex; align-items:center; gap:6px;
            padding:7px 14px; border-radius:50px;
            font-size:12px; font-weight:600;
            border:1px solid transparent;
            transition: transform .2s;
          }
          .br-tag:hover { transform:translateY(-2px); }
          .br-tag.green  { background:#E8F5E9; color:#2E7D32; border-color:#A5D6A7; }
          .br-tag.amber  { background:#FFF8E1; color:#F57F17; border-color:#FFE082; }
          .br-tag.blue   { background:#E3F2FD; color:#1565C0; border-color:#90CAF9; }
          .br-tag.pink   { background:#FCE4EC; color:#AD1457; border-color:#F48FB1; }
          .br-tag svg    { width:12px; height:12px; stroke:currentColor; fill:none; stroke-width:2.5; }
          
          .br-cta-row {
            display:flex; align-items:center; gap:16px;
            position:relative; z-index:1;
          }
          .br-cta-main {
            display:flex; align-items:center; gap:10px;
            padding:13px 28px; border-radius:50px;
            font-family:'Hind Siliguri',sans-serif;
            font-size:14px; font-weight:700;
            border:none; cursor:pointer;
            transition: transform .25s, box-shadow .25s;
            text-decoration:none;
            position:relative; overflow:hidden;
          }
          .br-cta-main::before {
            content:'';
            position:absolute; top:-50%; left:-60%;
            width:35%; height:200%;
            background:rgba(255,255,255,.22);
            transform:skewX(-20deg);
            animation:shimmer 3.5s 1s infinite;
          }
          .br-cta-main.female-btn {
            background:linear-gradient(135deg,#E8C97A,#C9A84C);
            color:var(--dark);
            box-shadow:0 8px 28px rgba(201,168,76,.35);
          }
          .br-cta-main.male-btn {
            background:linear-gradient(135deg,#C9A84C,#8B6A1F);
            color:#fff;
            box-shadow:0 8px 28px rgba(139,106,31,.35);
          }
          .br-cta-main:hover { transform:translateY(-3px) scale(1.02); box-shadow:0 14px 40px rgba(201,168,76,.5); }
          .br-cta-main svg { width:16px; height:16px; stroke:currentColor; fill:none; stroke-width:2.5; transition:transform .25s; }
          .br-cta-main:hover svg { transform:translateX(4px); }
          
          .br-cta-icon {
            width:44px; height:44px; border-radius:50%;
            border:1px solid rgba(201,168,76,.35);
            display:flex; align-items:center; justify-content:center;
            background:#fff;
            cursor:pointer; text-decoration:none;
            transition:background .25s, border-color .25s, transform .25s;
            box-shadow:0 4px 14px rgba(26,18,8,.08);
          }
          .br-cta-icon:hover { background:var(--gold); border-color:var(--gold); transform:scale(1.1); }
          .br-cta-icon:hover svg path { fill:#fff; }
          .br-cta-icon svg { width:18px; height:18px; }
          
          .upc-teaser {
            margin: 60px 80px 0;
            padding: 40px 48px;
            border-radius: 20px;
            background: linear-gradient(135deg, var(--dark) 0%, var(--dark2) 100%);
            border: 1px solid rgba(201,168,76,.2);
            display:flex; align-items:center; justify-content:space-between; gap:24px;
            box-shadow:0 16px 48px rgba(26,18,8,.12);
            position:relative; overflow:hidden;
            font-family: 'Hind Siliguri', sans-serif;
          }
          .upc-teaser::before {
            content:'';
            position:absolute; top:-60px; right:-60px;
            width:200px; height:200px;
            border-radius:50%;
            background:radial-gradient(circle, rgba(201,168,76,.12) 0%, transparent 70%);
            pointer-events:none;
          }
          .upc-badge {
            display:inline-flex; align-items:center; gap:8px;
            padding:5px 14px; border-radius:50px;
            background:rgba(201,168,76,.12); border:1px solid rgba(201,168,76,.35);
            font-size:11px; letter-spacing:2px; text-transform:uppercase;
            color:var(--gold-light); font-weight:600;
            margin-bottom:14px;
          }
          .upc-pulse { width:7px; height:7px; border-radius:50%; background:var(--gold); animation:pulse 1.5s ease-in-out infinite; }
          .upc-title { font-family:'Playfair Display',serif; font-size:26px; font-weight:700; color:#fff; margin-bottom:6px; }
          .upc-desc  { font-size:14px; color:rgba(255,255,255,.6); }
          .upc-cta {
            flex-shrink:0;
            padding:12px 28px; border-radius:50px;
            border:1px solid rgba(201,168,76,.5);
            background:transparent; color:var(--gold-light);
            font-size:13px; font-weight:700; letter-spacing:1px; text-transform:uppercase;
            cursor:pointer; transition:background .25s, border-color .25s, transform .2s;
            white-space:nowrap; text-decoration:none;
          }
          .upc-cta:hover { background:var(--gold); border-color:var(--gold); color:var(--dark); transform:translateY(-2px); }
          
          .sec-divider-2 {
            height: 1px;
            background: linear-gradient(to right, transparent, rgba(201,168,76,.35), transparent);
            margin: 0 80px;
          }
          
          @media(max-width:1100px){
            .br-text, .br-card.reverse .br-text { padding:48px 48px; }
          }
          @media(max-width:900px){
            .custom-page-hero { padding:110px 28px 56px; }
            .ch-inner { flex-direction:column; gap:28px; align-items:flex-start; }
            .ch-right { border-left:none; border-top:1px solid rgba(201,168,76,.2); padding:20px 0 0; max-width:100%; }
            .br-card { grid-template-columns:1fr; min-height:auto; }
            .br-card.reverse { direction:ltr; }
            .br-img-wrap { min-height:280px; order:0; }
            .br-text, .br-card.reverse .br-text { padding:40px 28px; }
            .br-name { font-size:40px; }
            .sec-divider-2, .upc-teaser { margin-left:24px; margin-right:24px; }
            .upc-teaser { flex-direction:column; text-align:center; }
          }
        \`}</style>

        {/* --- CUSTOM HTML REPLACEMENT --- */}
        <section className="custom-page-hero" id="branches-section">
          <div className="ch-inner">
            <div className="ch-left" style={{ width: '100%' }}>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="ch-eyebrow"
              >
                <div className="ch-eyebrow-line"></div>
                <span className="ch-eyebrow-text">Our Premium Locations</span>
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="ch-title"
              >
                আমাদের<br/>
                <span>শাখা-সমূহ</span>
              </motion.h2>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="ch-pills"
              >
                <div className="ch-pill"><div className="ch-pill-dot female"></div> Queens Point – মেয়েদের শাখা</div>
                <div className="ch-pill"><div className="ch-pill-dot male"></div> Bachelor Point – ছেলেদের শাখা</div>
              </motion.div>
            </div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="ch-right"
            >
              <p className="ch-desc">
                <strong>AyaanAyaat Homes</strong>-এর দুটি স্বনামধন্য প্রজেক্ট—
                ছেলেদের জন্য <strong>Bachelor Point</strong> এবং মেয়েদের জন্য <strong>Queens Point</strong>।
                ঢাকা শহরের ছাত্র-ছাত্রী ও চাকরিজীবীদের নিরাপদ এবং আরামদায়ক আবাসন নিশ্চিতে আমরা প্রতিশ্রুতিবদ্ধ।
              </p>
            </motion.div>
          </div>
        </section>

        <section className="br-sec">
          {/* Queens Point */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="br-card"
          >
            <div className="br-text">
              <div className="br-parent">
                <div className="br-parent-dot"></div>
                <span className="br-parent-name">AyaanAyaat Homes</span>
              </div>

              <h2 className="br-name">Queens<br/>Point</h2>
              <p className="br-tagline">নিরাপদ আশ্রয়ে রাজকীয়তা</p>
              <div className="br-divider"></div>

              <div className="br-addr-box">
                <div className="br-addr-icon">
                  <svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div className="br-addr-text">
                  বাড়ি# ১৮৯, রোড# ১৩, সেক্টর# ১০, উত্তরা,<br/>রানাভোলা এভিনিউ, ঢাকা
                </div>
              </div>

              <div className="br-tags">
                <div className="br-tag green">
                  <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                  ২৪/৭ নিরাপত্তা
                </div>
                <div className="br-tag amber">
                  <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                  মানসম্মত খাবার
                </div>
                <div className="br-tag blue">
                  <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                  AC / Non-AC
                </div>
                <div className="br-tag pink">
                  <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                  ওয়াই-ফাই
                </div>
              </div>

              <div className="br-cta-row">
                <button onClick={() => onNavigate({ type: 'female-hostel' })} className="br-cta-main female-btn">
                  বিস্তারিত দেখুন
                  <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </button>
                <a href="https://www.facebook.com/share/1AZyBMJreP/" target="_blank" rel="noopener noreferrer" className="br-cta-icon" title="Facebook">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" stroke="#1877F2" strokeWidth="1.8" fill="none"/>
                  </svg>
                </a>
                <a href="https://maps.app.goo.gl/wAa3pBmE6b6SVWks9" target="_blank" rel="noopener noreferrer" className="br-cta-icon" title="Google Maps">
                  <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#48B564" d="M35.76,26.36h0.01c0,0-3.77,5.53-6.45,9.usage"/>
                    <path fill="#4CAF50" d="M34.55,18.06C34.55,16.91,34.4,15.8,34.14,14.74L24,25.64l10,5.73 C34.05,30.17,34.55,28.16,34.55,26.36L34.55,18.06z"/>
                    <path fill="#4CAF50" d="M33.38,12.62C31.53,11,29.12,10,26.44,10c-4.45,0-8.29,2.63-10.12,6.44l7.68,8.75L33.38,12.62z"/>
                    <path fill="#EA4335" d="M13.5,26.36c0,1.52,0.37,2.96,1,4.24L24,20.22L13.5,26.36z" opacity=".7"/>
                    <path fill="#FFBA00" d="M24,25.64L13.5,30.6c1.83,3.81,5.67,6.44,10.12,6.44 c2.68,0,5.09-1,6.94-2.62L24,25.64z"/>
                    <path fill="#4285F4" d="M13.5,26.36L24,20.22L13.5,14.08C13.83,14.74,13.5,15.39,13.5,16.06V26.36z" opacity=".5"/>
                    <circle fill="#EA4335" cx="24" cy="16" r="3"/>
                  </svg>
                </a>
              </div>
            </div>

            <div className="br-img-wrap">
              <span className="br-img-badge female">♀ Female Branch</span>
              <img 
                src={qpThumbs[qpIndex]} 
                alt="Queens Point Building" 
                className="main-img"
              />
              <div className="br-thumbs">
                {qpThumbs.map((url, i) => (
                  <div 
                    key={i} 
                    className={\`br-thumb \${qpIndex === i ? 'active' : ''}\`}
                    onClick={() => setQpIndex(i)}
                  >
                    <img src={url} alt="" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="sec-divider-2"></div>

          {/* Bachelor Point */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="br-card reverse"
          >
            <div className="br-text">
              <div className="br-parent">
                <div className="br-parent-dot"></div>
                <span className="br-parent-name">AyaanAyaat Homes</span>
              </div>

              <h2 className="br-name">Bachelor<br/>Point</h2>
              <p className="br-tagline">আধুনিক স্মার্ট জীবনের নিশ্চয়তা</p>
              <div className="br-divider"></div>

              <div className="br-addr-box">
                <div className="br-addr-icon">
                  <svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div className="br-addr-text">
                  ২২৭/২, রোড-২, সি-ব্লক, রূপনগর আবাসিক,<br/>মিরপুর, ঢাকা-১২১৬
                </div>
              </div>

              <div className="br-tags">
                <div className="br-tag green">
                  <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                  ২৪/৭ সিসিটিভি
                </div>
                <div className="br-tag amber">
                  <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                  মানসম্মত খাবার
                </div>
                <div className="br-tag blue">
                  <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                  AC / Non-AC
                </div>
                <div className="br-tag pink">
                  <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                  ওয়াই-ফাই
                </div>
              </div>

              <div className="br-cta-row">
                <button onClick={() => onNavigate({ type: 'male-hostel' })} className="br-cta-main male-btn">
                  বিস্তারিত দেখুন
                  <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </button>
                <a href="https://www.facebook.com/share/1CwaVA5WXK/" target="_blank" rel="noopener noreferrer" className="br-cta-icon" title="Facebook">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" stroke="#1877F2" strokeWidth="1.8" fill="none"/>
                  </svg>
                </a>
                <a href="https://maps.app.goo.gl/EtBr4xqaVPK8ZH4N9" target="_blank" rel="noopener noreferrer" className="br-cta-icon" title="Google Maps">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#EA4335" strokeWidth="1.8">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                </a>
              </div>
            </div>

            <div className="br-img-wrap">
              <span className="br-img-badge male">♂ Male Branch</span>
              <img 
                src={bpThumbs[bpIndex]} 
                alt="Bachelor Point Building"
                className="main-img"
              />
              <div className="br-thumbs">
                {bpThumbs.map((url, i) => (
                  <div 
                    key={i} 
                    className={\`br-thumb \${bpIndex === i ? 'active' : ''}\`}
                    onClick={() => setBpIndex(i)}
                  >
                    <img src={url} alt="" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* UPCOMING TEASER */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="upc-teaser mb-20"
        >
          <div className="upc-left">
            <div className="upc-badge">
              <div className="upc-pulse"></div>
              আসছে শীঘ্রই
            </div>
            <h3 className="upc-title">নতুন শাখা — Coming Soon</h3>
            <p className="upc-desc">আমাদের তৃতীয় প্রজেক্ট ঢাকার আরেকটি প্রিমিয়াম লোকেশনে আসছে। আপডেট পেতে আমাদের সাথে থাকুন।</p>
          </div>
          <button className="upc-cta">আপডেট পান &rarr;</button>
        </motion.div>`;

// Add state setup inside Home component
const stateVars = `const [qpIndex, setQpIndex] = useState(0);
  const [bpIndex, setBpIndex] = useState(0);
  const qpThumbs = [
    'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=85',
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=85',
    'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=85',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=900&q=85'
  ];
  const bpThumbs = [
    'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=900&q=85',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=85',
    'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=900&q=85',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=900&q=85'
  ];

  useEffect(() => {
    const i1 = setInterval(() => setQpIndex(i => (i + 1) % qpThumbs.length), 4000);
    const i2 = setInterval(() => setBpIndex(i => (i + 1) % bpThumbs.length), 4000);
    return () => { clearInterval(i1); clearInterval(i2); };
  }, []);
`;


// Insert state variables right before `return (`
content = content.replace(/(return \(\s*<div className="w-full bg-\[#f8f9fa\] font-sans relative">)/, `${stateVars}\n  $1`);

// Replace the entire branches section from line 834 down to 1153 end of </section>
const startIndex = content.indexOf('<motion.div \n          initial={{ opacity: 0 }}\n          whileInView={{ opacity: 1 }}\n          viewport={{ once: true }}\n          transition={{ duration: 0.8 }}\n          className="border-b border-[#4a3426]/10 px-3 py-3 md:px-6 md:py-16 bg-[#f8f9fa] relative overflow-hidden"');
if (startIndex !== -1) {
  const marker = '          </div>\n        </div>\n      </section>\n';
  const endIndex = content.indexOf(marker, startIndex);
  if (endIndex !== -1) {
    content = content.slice(0, startIndex) + newCSS + content.slice(endIndex + marker.length);
  } else {
    // try different marker
    const marker2 = '    </div>\n  );\n};\n';
    const endIndex2 = content.indexOf('      {/* Brand Promise Banner */}', startIndex);
    if(endIndex2 !== -1){
        content = content.slice(0, startIndex) + newCSS + content.slice(endIndex2);
    } else {
        console.log("Could not find end index");
    }
  }
} else {
  // alternative start index match
  const startAlt = content.indexOf('<motion.div \n          initial={{ opacity: 0 }}');
  const endAlt = content.indexOf('{/* Brand Promise Banner */}');
  
  // Find the exact occurrence that introduces our Premium Locations...
  let search = 'Our Premium Locations</span>';
  let i = content.indexOf(search);
  if(i !== -1) {
    // backtrack to the starting motion div
    let back = content.lastIndexOf('<motion.div \n          initial={{ opacity: 0 }}', i);
    if(back !== -1 && endAlt !== -1) {
         content = content.slice(0, back) + newCSS + content.slice(endAlt);
    } else {
        console.log("Could not match backup start/end");
    }
  } else {
    console.log("Could not find start index");
  }
}

fs.writeFileSync(path, content, 'utf8');
