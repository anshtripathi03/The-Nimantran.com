// src/components/FullScreenLoader.jsx
import { useLoading } from "../context/LoadingContext";
import logo from "../assets/logo.png"; // your animated logo

export default function FullScreenLoader() {
  const { loading } = useLoading();

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-white/70 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300">
      <img
        src={logo}
        alt="Loading..."
        className="animate-pulse w-24 h-24 object-contain"
      />
    </div>
  );
}
