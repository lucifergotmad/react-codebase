import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import Spinner from './shared/components/spinner/spinner.component';
import { GlobalStyle } from './shared/styles/global.styles';

const HomePage = lazy(() => import('./pages/home/home.page'));

const App = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Suspense>
  );
};

export default App;
