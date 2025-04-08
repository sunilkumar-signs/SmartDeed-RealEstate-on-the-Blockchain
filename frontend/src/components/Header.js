export default function Header({ wallet, setActivePage }) {
    return (
      <header className="bg-white border-b shadow-sm px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold text-blue-700 cursor-pointer" onClick={() => setActivePage("home")}>
          SmartDeed
        </div>
  
        <nav className="hidden md:flex space-x-6 text-sm text-gray-700">
          <button onClick={() => setActivePage("buy")} className="hover:text-blue-600">
            Buy
          </button>
          <button onClick={() => setActivePage("list")} className="hover:text-blue-600">
            Sell
          </button>
          <a href="#" className="hover:text-blue-600">Mortgage</a>
          <a href="#" className="hover:text-blue-600">Agents</a>
          <a href="#" className="hover:text-blue-600">Resource Centre</a>
          <a href="#" className="hover:text-blue-600">1-833-709-1946</a>
        </nav>
  
        <div className="flex items-center gap-4 text-sm">
          {wallet && (
          <div className="hidden lg:block text-gray-500 text-xs text-right max-w-[320px] overflow-hidden">
            <p>Connected Wallet:</p>
            <p className="font-mono break-words">{wallet}</p>
          </div>
          )}
          <button className="border border-blue-600 text-blue-600 px-4 py-1 rounded-full hover:bg-blue-50">
            Log in
          </button>
          <button className="bg-blue-600 text-white px-4 py-1 rounded-full hover:bg-blue-700">
            Sign up
          </button>
        </div>
      </header>
    );
  }
  