import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { HomePage } from './pages/HomePage';
import { QuizFlow } from './pages/QuizFlow';
import { AvatarGenerator } from './pages/AvatarGenerator';
import { LibraryPage } from './pages/LibraryPage';
import { BlueprintGenerator } from './pages/BlueprintGenerator';
import { CulturalGuidelines } from './pages/CulturalGuidelines';
import { MonetizationFlow } from './pages/MonetizationFlow';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/pricing" element={<MonetizationFlow />} />

        {/* Main App Routes with Layout */}
        <Route element={<MainLayout />}>
          <Route path="/quiz" element={<QuizFlow />} />
          <Route path="/avatar" element={<AvatarGenerator />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/blueprint" element={<BlueprintGenerator quizResponses={[]} />} />
          <Route path="/cultural-guidelines" element={<CulturalGuidelines />} />
          <Route path="/studio" element={<div className="text-center py-2xl"><h1>AI Studio (Coming Soon)</h1></div>} />
          <Route path="/profile" element={<div className="text-center py-2xl"><h1>Profile Page (Coming Soon)</h1></div>} />
          <Route path="/settings" element={<div className="text-center py-2xl"><h1>Settings Page (Coming Soon)</h1></div>} />
        </Route>

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
