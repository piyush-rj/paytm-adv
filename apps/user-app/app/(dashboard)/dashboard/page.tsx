

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">

      {/* Header */}
      <header className="bg-white dark:bg-gray-950 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">PayTM</h1>
          <nav className="hidden md:flex space-x-8 text-sm font-medium">
            {["Wallet", "Transactions", "Transfer", "About"].map(link => (
              <a
                key={link}
                href="#"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                {link}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="py-24 px-6 md:px-20 bg-gradient-to-br from-blue-100 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16">
          <div className="max-w-xl space-y-6">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-gray-900 dark:text-white">
              India’s Most Trusted<br /> Digital Payment Platform
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              From mobile recharges to money transfers, PayTM simplifies payments with speed, trust, and ease.
            </p>
            <div className="flex gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition">
                Get Started
              </button>
              <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-300 dark:hover:bg-gray-800 px-6 py-3 rounded-xl font-semibold transition">
                Learn More
              </button>
            </div>
          </div>
          <div>
            <img
              src="/money.png"
              alt="PayTM App"
              className="w-[330px] max-w-md drop-shadow-xl mr-10 mb-5"
            />
          </div>
        </div>
      </section>

      {/* Features / Services */}
      <section className="py-20 px-6 md:px-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-12">What You Can Do</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { title: "Recharge & Pay Bills", icon: "📱" },
              { title: "Send Money", icon: "💸" },
              { title: "PayTM Wallet", icon: "👛" },
              { title: "Bank Transfers", icon: "🏦" },
              { title: "UPI Payments", icon: "🔁" },
              { title: "Movie Tickets", icon: "🎟️" },
              { title: "Metro & Travel", icon: "🚌" },
              { title: "Rewards & Cashback", icon: "🎁" },
            ].map(({ title, icon }) => (
              <div
                key={title}
                className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 text-center shadow hover:shadow-md transition"
              >
                <div className="text-4xl mb-4">{icon}</div>
                <h4 className="text-lg font-semibold">{title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 px-6 md:px-20 py-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">
          <div>
            <h4 className="text-xl font-bold text-white mb-3">PayTM</h4>
            <p className="text-sm text-gray-400 max-w-xs">
              Powering millions of daily transactions securely and efficiently.
            </p>
          </div>
          <div>
            <h5 className="font-semibold text-white mb-2">Quick Links</h5>
            <ul className="text-sm space-y-1">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
            </ul>
          </div>
        </div>
        <p className="text-xs text-center text-gray-500 mt-10">
          © 2025 Paytm Inc. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
