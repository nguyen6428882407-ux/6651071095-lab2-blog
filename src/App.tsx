import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { ListPage } from './pages/ListPage';
import { DetailPage } from './pages/DetailPage';

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<ListPage />} />
              <Route path="/post/:id" element={<DetailPage />} />
            </Routes>
          </main>
          <footer className="bg-white border-t border-gray-200 py-6 text-center text-sm text-gray-500">
            <p>© 2026 Nguyễn Nhất Vũ - MSSV: 6651071095. All rights reserved.</p>
          </footer>
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;