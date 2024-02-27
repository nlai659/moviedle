import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Header />
      <div>
        <p className="text-center text-2xl mt-8">Welcome to my app!</p>
      </div>
      <Footer />
    </div>
  );
}

export default App;
