import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "@/pages/Home";
import Publish from "@/pages/Publish";
import FeederDetail from "@/pages/FeederDetail";
import Orders from "@/pages/Orders";
import OrderDetail from "@/pages/OrderDetail";
import Profile from "@/pages/Profile";
import BottomNav from "@/components/BottomNav";

function AppContent() {
  const location = useLocation();
  const showBottomNav = !['/publish', '/feeder/:id', '/order/:id'].some(path => {
    if (path === '/publish') return location.pathname === '/publish';
    if (path === '/feeder/:id') return location.pathname.startsWith('/feeder/');
    if (path === '/order/:id') return location.pathname.startsWith('/order/');
    return false;
  });

  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/publish" element={<Publish />} />
        <Route path="/feeder/:id" element={<FeederDetail />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/order/:id" element={<OrderDetail />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      {showBottomNav && <BottomNav />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
