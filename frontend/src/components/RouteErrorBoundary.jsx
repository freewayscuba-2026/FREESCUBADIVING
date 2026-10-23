import { Component } from "react";

// Catches a page that failed to load or render, so the visitor never sees a blank screen.
export class RouteErrorBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    if (typeof console !== "undefined") console.error("Page failed to render:", error);
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div className="min-h-[60vh] bg-[#061A2B] flex flex-col items-center justify-center px-4 text-center">
        <p className="text-white/80 mb-6">Something went wrong loading this page. / No se pudo cargar esta página.</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="bg-[#00B4D8] hover:bg-[#0099BB] text-white font-semibold px-6 py-3 rounded-full"
        >
          Reload / Recargar
        </button>
      </div>
    );
  }
}
