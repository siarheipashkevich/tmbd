import { Route, Routes } from 'react-router-dom';

import { HomePage } from '@/pages/home';
import { MoviePage } from '@/pages/movie';

export function Root() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/movie/:id" element={<MoviePage />} />
    </Routes>
  );
}
