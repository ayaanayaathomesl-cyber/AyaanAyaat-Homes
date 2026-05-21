const fs = require('fs');

const path = 'components/Home.tsx';
let content = fs.readFileSync(path, 'utf8');

const newCSS = `

        {/* --- UPCOMING BRANCHES --- */}
        <section className="bg-[#f8f6f0] py-20 px-6 border-b border-[#4a3426]/10 relative overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#C9A84C 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#C9A84C]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-4 mb-4">
                <span className="w-12 h-[1px] bg-[#C9A84C]/60"></span>
                <span className="text-[#C9A84C] font-semibold text-xs tracking-[0.3em] uppercase">Future Expansion</span>
                <span className="w-12 h-[1px] bg-[#C9A84C]/60"></span>
              </div>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#2A2A1E] mb-6">
                আমাদের <span className="text-[#C9A84C]">আপকামিং</span> ব্রাঞ্চসমূহ
              </h2>
              <p className="max-w-2xl mx-auto text-[#615249] text-sm md:text-base leading-relaxed">
                নতুন আঙ্গিকে আরও উন্নত ও আধুনিক আবাসন সুবিধা নিয়ে আমরা আসছি আপনাদের কাছাকাছি।
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              
              {/* Prince Point */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="group relative overflow-hidden rounded-[20px] bg-[#2A2A1E] aspect-[16/9] md:aspect-[21/9] flex items-center justify-center border border-[#C9A84C]/20 shadow-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A14] to-[#2A2A1E] z-0"></div>
                
                {/* Decorative borders */}
                <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-[#C9A84C]/30 group-hover:border-[#C9A84C]/70 transition-colors duration-500 z-10"></div>
                <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-[#C9A84C]/30 group-hover:border-[#C9A84C]/70 transition-colors duration-500 z-10"></div>
                
                <div className="relative z-10 text-center flex flex-col items-center p-6">
                  <div className="w-12 h-12 rounded-full border border-[#C9A84C]/50 flex items-center justify-center mb-4 group-hover:bg-[#C9A84C]/10 transition-colors duration-300">
                    <svg className="w-5 h-5 text-[#C9A84C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-white mb-3">Prince Point</h3>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                    <span className="w-2 h-2 rounded-full bg-[#E57373] animate-pulse"></span>
                    <span className="text-[#E57373] text-[9px] font-bold tracking-[0.2em] uppercase">Under Construction</span>
                  </div>
                </div>
              </motion.div>

              {/* Royal Point */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="group relative overflow-hidden rounded-[20px] bg-[#2A2A1E] aspect-[16/9] md:aspect-[21/9] flex items-center justify-center border border-[#C9A84C]/20 shadow-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A14] to-[#2A2A1E] z-0"></div>
                
                {/* Decorative borders */}
                <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-[#C9A84C]/30 group-hover:border-[#C9A84C]/70 transition-colors duration-500 z-10"></div>
                <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-[#C9A84C]/30 group-hover:border-[#C9A84C]/70 transition-colors duration-500 z-10"></div>
                
                <div className="relative z-10 text-center flex flex-col items-center p-6">
                  <div className="w-12 h-12 rounded-full border border-[#C9A84C]/50 flex items-center justify-center mb-4 group-hover:bg-[#C9A84C]/10 transition-colors duration-300">
                    <svg className="w-5 h-5 text-[#C9A84C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-white mb-3">Royal Point</h3>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                    <span className="w-2 h-2 rounded-full bg-[#E57373] animate-pulse"></span>
                    <span className="text-[#E57373] text-[9px] font-bold tracking-[0.2em] uppercase">Under Construction</span>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>
        
`;

const startIdx = content.indexOf('{/* UPCOMING TEASER */}');
const endIdx = content.indexOf('{/* Brand Promise Banner */}');

if (startIdx !== -1 && endIdx !== -1) {
    let newContent = content.slice(0, startIdx) + newCSS + content.slice(endIdx);
    fs.writeFileSync(path, newContent);
    console.log("Successfully replaced upcoming section.");
} else {
    console.log("Could not find markers.", startIdx, endIdx);
}
