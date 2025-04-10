export default function Home() {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-screen text-gray-800">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-6 shadow-sm bg-white">
        <h1 className="text-3xl font-bold text-blue-600">PayTM</h1>
        <nav className="flex gap-6">
          <a href="#" className="hover:text-blue-500 font-medium">Wallet</a>
          <a href="#" className="hover:text-blue-500 font-medium">Transactions</a>
          <a href="#" className="hover:text-blue-500 font-medium">Transfer</a>
          <a href="#" className="hover:text-blue-500 font-medium">About</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between px-8 md:px-20 py-20 gap-12">
        <div className="max-w-xl">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight text-blue-800 mb-6">
            Fast. Secure. Trusted.  
            <br />
            Welcome to <span className="text-blue-600">PayTM</span>
          </h2>
          <p className="text-gray-700 mb-8 text-lg">
            Pay bills, send money, recharge instantly — all in one place.
          </p>
          <div className="flex gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium">
              Get Started
            </button>
            <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-xl font-medium hover:bg-blue-50">
              Learn More
            </button>
          </div>
        </div>
        <img src="/hero-img.svg" alt="PayTM App" className="w-full max-w-md drop-shadow-xl" />
      </section>

      {/* Services Section */}
      <section className="px-8 md:px-20 py-16 bg-white">
        <h3 className="text-3xl font-semibold text-center text-gray-800 mb-12">
          What You Can Do
        </h3>
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
              className="bg-blue-50 rounded-2xl p-6 flex flex-col items-center shadow hover:shadow-lg transition-all"
            >
              <div className="text-4xl mb-4">{icon}</div>
              <h4 className="text-lg font-semibold text-center">{title}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white px-8 md:px-20 py-12 mt-20">
        <div className="flex flex-col md:flex-row justify-around gap-10">
          <div>
            <h4 className="text-xl font-bold mb-3">PayTM</h4>
            <p className="text-sm text-gray-300">
              India’s most trusted digital payment & wallet platform.
            </p>
          </div>
          <div>
            <h5 className="font-semibold mb-2">Quick Links</h5>
            <ul className="text-sm space-y-1 text-gray-300">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms & Conditions</a></li>
            </ul>
          </div>
        </div>
        <p className="text-sm text-center text-gray-400 mt-8">
          © 2025 Paytm Inc. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
