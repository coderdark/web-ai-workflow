import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ClassCatalog from './pages/ClassCatalog';
import ClassDetail from './pages/ClassDetail';
import LessonViewer from './pages/LessonViewer';
import ProgressDashboard from './pages/ProgressDashboard';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="classes" element={<ClassCatalog />} />
          <Route path="classes/:id" element={<ClassDetail />} />
          <Route path="classes/:id/lessons/:lessonId" element={<LessonViewer />} />
          <Route path="progress" element={<ProgressDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
