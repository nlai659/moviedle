import Footer from "./components/Footer";
import Header from "./components/Header";
import HintArea from "./components/HintArea";
import SearchBar from "./components/SearchBar";

function App() {
  return (
    <div className="flex flex-col justify-between min-h-screen bg-gray-800">
      <Header />
      <div className="mx-auto">
        <HintArea />
        <SearchBar />
      </div>
      <Footer />
    </div>
  );
}

export default App;
