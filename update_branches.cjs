const fs = require('fs');

const path = 'components/Home.tsx';
let content = fs.readFileSync(path, 'utf8');

const newCSS = `

        {/* --- CUSTOM CSS FOR NEW BRANCHES DESIGN --- */}
        <style>{\`
          :root {
            --gold: #C9A84C;
            --gold-light: #E8C97A;
            --dark-color: #1A1A14; /* changed from --dark to avoid conflicts potentially */
            --dark-mid: #2A2A1E;
            --cream: #F9F6EF;
            --cream-mid: #EDE8DC;
            --white: #FFFFFF;
            --female-accent: #C97A9B;
            --male-accent: #4A7AAC;
            --text-muted: #888878;
          }

          /* ── Section Header ── */
          .br-section-header {
            text-align: center;
            padding: 72px 24px 56px;
            position: relative;
            background: var(--cream);
          }

          .br-section-header::after {
            content: '';
            display: block;
            width: 60px;
            height: 2px;
            background: var(--gold);
            margin: 20px auto 0;
          }

          .br-section-label {
            font-family: 'DM Sans', sans-serif;
            font-size: 11px;
            font-weight: 500;
            letter-spacing: 4px;
            text-transform: uppercase;
            color: var(--gold);
            margin-bottom: 14px;
          }

          .br-section-title {
            font-family: 'Playfair Display', serif;
            font-size: clamp(36px, 5vw, 56px);
            font-weight: 700;
            color: var(--dark-color);
            line-height: 1.15;
          }

          .br-section-title span {
            color: var(--gold);
          }

          .br-section-desc {
            max-width: 520px;
            margin: 18px auto 0;
            font-size: 15px;
            color: var(--text-muted);
            line-height: 1.7;
          }

          /* ── Cards Grid ── */
          .br-branches-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(480px, 1fr));
            gap: 32px;
            max-width: 1160px;
            margin: 0 auto;
            padding: 0 28px 80px;
            background: var(--cream);
          }

          /* ── Branch Card ── */
          .br-new-card {
            background: var(--white);
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 4px 32px rgba(0,0,0,0.07);
            display: grid;
            grid-template-columns: 1fr 1fr;
            min-height: 340px;
            transition: transform 0.35s ease, box-shadow 0.35s ease;
            position: relative;
          }

          .br-new-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 16px 48px rgba(0,0,0,0.13);
          }

          /* ── Card Image Side ── */
          .br-card-image {
            position: relative;
            overflow: hidden;
            height: 100%;
          }

          .br-card-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            transition: transform 0.5s ease;
          }

          .br-new-card:hover .br-card-image img {
            transform: scale(1.05);
          }

          .br-image-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, rgba(0,0,0,0.25) 0%, transparent 60%);
          }

          .br-type-badge {
            position: absolute;
            top: 16px;
            left: 16px;
            padding: 6px 14px;
            border-radius: 50px;
            font-size: 10px;
            font-weight: 600;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: white;
            backdrop-filter: blur(8px);
          }

          .br-new-card.female .br-type-badge {
            background: rgba(201,122,155,0.85);
          }

          .br-new-card.male .br-type-badge {
            background: rgba(74,122,172,0.85);
          }

          /* ── Card Content Side ── */
          .br-card-content {
            padding: 32px 28px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            position: relative;
            background: var(--white);
          }

          .br-card-content::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 3px;
            height: 100%;
          }

          .br-new-card.female .br-card-content::before {
            background: linear-gradient(to bottom, var(--female-accent), transparent);
          }

          .br-new-card.male .br-card-content::before {
            background: linear-gradient(to bottom, var(--male-accent), transparent);
          }

          .br-brand-name {
            font-size: 11px;
            font-weight: 500;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: var(--text-muted);
            margin-bottom: 6px;
          }

          .br-branch-name {
            font-family: 'Playfair Display', serif;
            font-size: 26px;
            font-weight: 700;
            color: var(--dark-color);
            line-height: 1.2;
            margin-bottom: 6px;
          }

          .br-branch-tagline {
            font-size: 12px;
            color: var(--gold);
            font-style: italic;
            margin-bottom: 18px;
          }

          /* Address */
          .br-address-box-new {
            display: flex;
            gap: 10px;
            align-items: flex-start;
            background: var(--cream);
            border-radius: 10px;
            padding: 12px 14px;
            margin-bottom: 18px;
          }

          .br-address-icon-new {
            width: 18px;
            height: 18px;
            flex-shrink: 0;
            margin-top: 1px;
          }

          .br-address-text-new {
            font-size: 12.5px;
            line-height: 1.6;
            color: #555548;
            margin: 0;
          }

          /* Amenity Tags */
          .br-amenities {
            display: flex;
            flex-wrap: wrap;
            gap: 7px;
            margin-bottom: 22px;
          }

          .br-amenity-tag {
            display: inline-flex;
            align-items: center;
            gap: 5px;
            padding: 5px 11px;
            border-radius: 50px;
            font-size: 11px;
            font-weight: 500;
            border: 1px solid;
          }

          .br-amenity-tag.green  { color: #2D7A4F; border-color: #A8D9BF; background: #EEF8F3; }
          .br-amenity-tag.amber  { color: #7A5A1A; border-color: #E0C97A; background: #FDF8EC; }
          .br-amenity-tag.blue   { color: #1A4A7A; border-color: #7AB0E0; background: #EEF4FB; }
          .br-amenity-tag.pink   { color: #7A2A5A; border-color: #E07AB0; background: #FBEEF4; }

          /* Card Footer */
          .br-card-footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
          }

          .br-cta-btn {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 10px 20px;
            border-radius: 50px;
            font-size: 12px;
            font-weight: 600;
            text-decoration: none;
            letter-spacing: 0.5px;
            transition: all 0.25s ease;
            cursor: pointer;
            border: none;
          }

          .br-new-card.female .br-cta-btn {
            background: var(--dark-color);
            color: var(--gold-light);
          }

          .br-new-card.male .br-cta-btn {
            background: var(--dark-color);
            color: var(--gold-light);
          }

          .br-cta-btn:hover {
            background: var(--gold);
            color: var(--dark-color);
          }

          .br-cta-arrow {
            font-size: 14px;
            transition: transform 0.25s;
          }

          .br-cta-btn:hover .br-cta-arrow {
            transform: translateX(4px);
          }

          .br-social-links {
            display: flex;
            gap: 8px;
          }

          .br-social-link {
            width: 34px;
            height: 34px;
            border-radius: 50%;
            background: var(--cream-mid);
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            transition: all 0.2s;
            border: 1px solid transparent;
          }

          .br-social-link:hover {
            border-color: var(--gold);
            background: var(--white);
          }

          .br-social-link svg { width: 16px; height: 16px; }

          /* ── Decorative corner accent ── */
          .br-corner-accent {
            position: absolute;
            bottom: 0;
            right: 0;
            width: 60px;
            height: 60px;
            opacity: 0.06;
            pointer-events: none;
          }

          .br-new-card.female .br-corner-accent { color: var(--female-accent); }
          .br-new-card.male   .br-corner-accent { color: var(--male-accent); }

          /* ── Responsive ── */
          @media (max-width: 768px) {
            .br-branches-grid {
              grid-template-columns: 1fr;
              padding: 0 16px 60px;
              gap: 24px;
            }

            .br-new-card {
              grid-template-columns: 1fr;
              min-height: unset;
            }

            .br-card-image {
              height: 220px;
            }

            .br-card-content {
              padding: 24px 20px;
            }
          }

          /* Entry animation */
          .br-new-card {
            opacity: 0;
            animation: fadeUp 0.6s ease forwards;
          }

          .br-new-card:nth-child(1) { animation-delay: 0.1s; }
          .br-new-card:nth-child(2) { animation-delay: 0.25s; }

          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(30px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        \`}</style>

        {/* --- NEW BRANCHES DESIGN --- */}
        <section className="bg-[var(--cream)]" id="branches-section">
          {/* Section Header */}
          <div className="br-section-header">
            <p className="br-section-label">OUR PREMIUM LOCATIONS</p>
            <h2 className="br-section-title">আমাদের <span>ব্রাঞ্চ-সমূহ</span></h2>
            <p className="br-section-desc">
              AyaanAyaat Homes-এর দুটি স্বনামধন্য প্রজেক্ট — ছেলেদের জন্য ব্যাচেলর পয়েন্ট এবং মেয়েদের জন্য কুইন্স পয়েন্ট।
              ঢাকার ছাত্র-ছাত্রী ও চাকরিজীবীদের নিরাপদ ও আরামদায়ক আবাসন নিশ্চিতে আমরা প্রতিশ্রুতিবদ্ধ।
            </p>
          </div>

          {/* Cards */}
          <div className="br-branches-grid">

            {/* Queens Point (Female) */}
            <div className="br-new-card female">
              <div className="br-card-image">
                <img src={qpThumbs[qpIndex]} alt="Queens Point Building" />
                <div className="br-image-overlay"></div>
                <span className="br-type-badge">FEMALE BRANCH</span>
              </div>

              <div className="br-card-content">
                <div className="br-card-top">
                  <p className="br-brand-name">AyaanAyaat Homes</p>
                  <h3 className="br-branch-name">Queens Point</h3>
                  <p className="br-branch-tagline">নিরাপদ আশ্রয়ে রাজকীয়তা</p>

                  <div className="br-address-box-new">
                    <svg className="br-address-icon-new" fill="none" viewBox="0 0 24 24" stroke="#C9A84C" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    <p className="br-address-text-new">বাড়ি# ১৮৯, রোড# ১৩, সেক্টর# ১০, উত্তরা, রানাভোলা এভিনিউ, ঢাকা</p>
                  </div>

                  <div className="br-amenities">
                    <span className="br-amenity-tag green">✓ ২৪/৭ নিরাপত্তা</span>
                    <span className="br-amenity-tag amber">✓ মানসম্মত খাবার</span>
                    <span className="br-amenity-tag blue">✓ AC / Non-AC</span>
                    <span className="br-amenity-tag pink">✓ ওয়াই-ফাই</span>
                  </div>
                </div>

                <div className="br-card-footer">
                  <button onClick={() => onNavigate({ type: 'female-hostel' })} className="br-cta-btn">
                    বিস্তারিত দেখুন <span className="br-cta-arrow">→</span>
                  </button>
                  <div className="br-social-links">
                    <a href="https://www.facebook.com/share/1AZyBMJreP/" target="_blank" rel="noopener noreferrer" className="br-social-link" title="Facebook">
                      <svg viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>
                    </a>
                    <a href="https://maps.app.goo.gl/wAa3pBmE6b6SVWks9" target="_blank" rel="noopener noreferrer" className="br-social-link" title="Google Maps">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#EA4335" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.686 2 6 4.686 6 8c0 5.25 6 13 6 13s6-7.75 6-13c0-3.314-2.686-6-6-6z"/><circle cx="12" cy="8" r="2" fill="#EA4335" stroke="none"/></svg>
                    </a>
                  </div>
                </div>

                {/* decorative */}
                <svg className="br-corner-accent" viewBox="0 0 60 60" fill="currentColor"><path d="M0 60 L60 0 L60 60 Z"/></svg>
              </div>
            </div>

            {/* Bachelor Point (Male) */}
            <div className="br-new-card male">
              <div className="br-card-image">
                <img src={bpThumbs[bpIndex]} alt="Bachelor Point Building" />
                <div className="br-image-overlay"></div>
                <span className="br-type-badge">MALE BRANCH</span>
              </div>

              <div className="br-card-content">
                <div className="br-card-top">
                  <p className="br-brand-name">AyaanAyaat Homes</p>
                  <h3 className="br-branch-name">Bachelor Point</h3>
                  <p className="br-branch-tagline">আধুনিক স্মার্ট জীবনের নিশ্চয়তা</p>

                  <div className="br-address-box-new">
                    <svg className="br-address-icon-new" fill="none" viewBox="0 0 24 24" stroke="#C9A84C" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    <p className="br-address-text-new">২২৭/২, রোড-২, সি-ব্লক, রূপনগর আবাসিক, মিরপুর, ঢাকা-১২১৬</p>
                  </div>

                  <div className="br-amenities">
                    <span className="br-amenity-tag green">✓ ২৪/৭ সিসিটিভি</span>
                    <span className="br-amenity-tag amber">✓ মানসম্মত খাবার</span>
                    <span className="br-amenity-tag blue">✓ AC / Non-AC</span>
                    <span className="br-amenity-tag pink">✓ ওয়াই-ফাই</span>
                  </div>
                </div>

                <div className="br-card-footer">
                  <button onClick={() => onNavigate({ type: 'male-hostel' })} className="br-cta-btn">
                    বিস্তারিত দেখুন <span className="br-cta-arrow">→</span>
                  </button>
                  <div className="br-social-links">
                    <a href="https://www.facebook.com/share/1CwaVA5WXK/" target="_blank" rel="noopener noreferrer" className="br-social-link" title="Facebook">
                      <svg viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>
                    </a>
                    <a href="https://maps.app.goo.gl/EtBr4xqaVPK8ZH4N9" target="_blank" rel="noopener noreferrer" className="br-social-link" title="Google Maps">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#EA4335" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.686 2 6 4.686 6 8c0 5.25 6 13 6 13s6-7.75 6-13c0-3.314-2.686-6-6-6z"/><circle cx="12" cy="8" r="2" fill="#EA4335" stroke="none"/></svg>
                    </a>
                  </div>
                </div>

                <svg className="br-corner-accent" viewBox="0 0 60 60" fill="currentColor"><path d="M0 60 L60 0 L60 60 Z"/></svg>
              </div>
            </div>

          </div>
        </section>

`;

const startIdx = content.indexOf('{/* --- CUSTOM CSS FOR NEW BRANCHES DESIGN --- */}');
const fallbackStartIdx = content.indexOf('{/* --- CUSTOM CSS FOR BRANCHES --- */}');
const trueStartIdx = startIdx !== -1 ? startIdx : fallbackStartIdx;

const endIdx = content.indexOf('{/* UPCOMING TEASER */}');

if (trueStartIdx !== -1 && endIdx !== -1) {
    let newContent = content.slice(0, trueStartIdx) + newCSS + content.slice(endIdx);
    fs.writeFileSync(path, newContent);
    console.log("Successfully replaced branches section.");
} else {
    console.log("Could not find markers.", trueStartIdx, endIdx);
}
