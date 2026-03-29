export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Nav */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur border-b border-gray-100 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-xl font-bold text-blue-700 tracking-tight">The Shallis Group</span>
          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
            <a href="#about" className="hover:text-blue-700 transition-colors">About</a>
            <a href="#services" className="hover:text-blue-700 transition-colors">Services</a>
            <a href="#media" className="hover:text-blue-700 transition-colors">Media</a>
            <a href="#contact" className="hover:text-blue-700 transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-24 px-6 bg-gradient-to-br from-blue-700 to-blue-900 text-white text-center">
        <p className="text-blue-300 uppercase tracking-widest text-sm mb-3">Mortgage · Real Estate · Coaching</p>
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight">Sean Shallis</h1>
        <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
          30+ years of real estate expertise. Best-selling author. Loan originator. Founder of the 10X Real Estate Warrior Nation.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#contact" className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-full hover:bg-blue-50 transition-colors">
            Work With Sean
          </a>
          <a href="#about" className="border border-white/60 text-white font-semibold px-8 py-3 rounded-full hover:bg-white/10 transition-colors">
            Learn More
          </a>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "30+", label: "Years of Experience" },
            { value: "1,000+", label: "Clients Served" },
            { value: "Featured", label: "Wall Street Journal" },
            { value: "#1", label: "10X Real Estate Warrior Nation" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-extrabold text-blue-700">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-blue-700 uppercase tracking-widest text-sm font-semibold mb-3">About Sean</p>
            <h2 className="text-4xl font-extrabold mb-6">Recovering Realtor.<br />Top-Producing Loan Officer.</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              Sean Shallis is a mortgage loan originator at U.S. Bank in Chatham, NJ, and the founder of The Shallis Group at eXp Realty. With over three decades in real estate and mortgage lending, Sean brings unmatched market knowledge to every client.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              He holds advanced training in sales, marketing, statistical analysis, and Neuro-Linguistic Programming (NLP), as well as specialized training with the US Army&apos;s Elite Rangers.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Sean has been featured in <strong>The Wall Street Journal</strong> and <strong>The New York Times</strong> and is widely recognized as one of New Jersey&apos;s most trusted real estate and mortgage experts.
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-10 text-center">
            <div className="w-32 h-32 bg-blue-700 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-5xl font-bold">
              SS
            </div>
            <p className="text-lg font-semibold text-gray-800">Sean Shallis</p>
            <p className="text-blue-700 font-medium">Mortgage Loan Originator · eXp Realty</p>
            <p className="text-gray-500 text-sm mt-1">Chatham, NJ</p>
            <div className="mt-6 flex flex-col gap-2 text-sm text-gray-600">
              <span>📰 Wall Street Journal Featured</span>
              <span>📰 New York Times Featured</span>
              <span>📘 Best-Selling Author</span>
              <span>🎙️ Podcast Host</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <p className="text-blue-700 uppercase tracking-widest text-sm font-semibold mb-3 text-center">What Sean Offers</p>
          <h2 className="text-4xl font-extrabold text-center mb-16">Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🏡",
                title: "Real Estate",
                desc: "Buying or selling in Montclair, Chatham, and Northern NJ — Sean's team at eXp Realty delivers results with deep local market knowledge.",
              },
              {
                icon: "💰",
                title: "Mortgage Lending",
                desc: "As a U.S. Bank loan originator, Sean helps clients navigate home financing with clarity, speed, and personalized strategy.",
              },
              {
                icon: "📈",
                title: "Coaching & Consulting",
                desc: "Through Ri2 Consulting and the 10X Real Estate Warrior Nation, Sean coaches agents and loan officers to grow sustainable, high-performance businesses.",
              },
            ].map((s) => (
              <div key={s.title} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{s.icon}</div>
                <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                <p className="text-gray-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media */}
      <section id="media" className="py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-blue-700 uppercase tracking-widest text-sm font-semibold mb-3">As Seen In</p>
          <h2 className="text-4xl font-extrabold mb-12">Media &amp; Publications</h2>
          <div className="flex flex-wrap justify-center gap-8 text-gray-400 font-bold text-xl">
            {["The Wall Street Journal", "The New York Times", "HousingWire", "The Success Network"].map((pub) => (
              <span key={pub} className="border border-gray-200 rounded-xl px-6 py-4 hover:border-blue-300 hover:text-blue-700 transition-colors cursor-default">
                {pub}
              </span>
            ))}
          </div>
          <div className="mt-16 bg-blue-700 rounded-3xl p-10 text-white text-left max-w-3xl mx-auto">
            <p className="text-2xl font-bold mb-3">&ldquo;The Perfect 10X Strategy&rdquo;</p>
            <p className="text-blue-100 text-lg mb-6">
              Sean&apos;s best-selling framework for real estate professionals — available on Audible and Amazon. Learn how to break down your numbers, find growth opportunities, and build a business that lasts.
            </p>
            <a
              href="https://www.amazon.com/10X-Real-Estate-Warrior-Nation/dp/B08K59X33C"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-blue-700 font-semibold px-6 py-3 rounded-full hover:bg-blue-50 transition-colors"
            >
              Listen on Audible →
            </a>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-6 bg-gray-50">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-blue-700 uppercase tracking-widest text-sm font-semibold mb-3">Get In Touch</p>
          <h2 className="text-4xl font-extrabold mb-4">Let&apos;s Connect</h2>
          <p className="text-gray-600 text-lg mb-10">Ready to buy, sell, or grow your real estate business? Reach out to Sean today.</p>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-left space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-2xl">📍</span>
              <div>
                <p className="font-semibold">Location</p>
                <p className="text-gray-500">Chatham, NJ &amp; Montclair, NJ</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-2xl">🏦</span>
              <div>
                <p className="font-semibold">Mortgage</p>
                <p className="text-gray-500">U.S. Bank — Loan Originator</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-2xl">🏡</span>
              <div>
                <p className="font-semibold">Real Estate</p>
                <p className="text-gray-500">The Shallis Group at eXp Realty</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-2xl">💼</span>
              <div>
                <p className="font-semibold">LinkedIn</p>
                <a
                  href="https://www.linkedin.com/in/seantshallis/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:underline"
                >
                  linkedin.com/in/seantshallis
                </a>
              </div>
            </div>
          </div>
          <a
            href="https://mortgage.usbank.com/nj-chatham-sean-shallis"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block bg-blue-700 text-white font-semibold px-10 py-4 rounded-full hover:bg-blue-800 transition-colors text-lg"
          >
            Contact Sean at U.S. Bank →
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-center py-8 text-sm">
        <p>© {new Date().getFullYear()} The Shallis Group · eXp Realty · All rights reserved.</p>
      </footer>
    </main>
  );
}
