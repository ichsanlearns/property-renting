import Footer from "../../../shared/ui/Footer";

function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* CONTENT */}
      <main className="flex-1 flex items-center justify-center">
        <h1>Home page</h1>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

export default HomePage;
