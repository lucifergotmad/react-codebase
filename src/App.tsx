import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import Spinner from './shared/components/spinner/spinner.component';

const SignInPage = lazy(() => import('./pages/sign-in/sign-in.page'));

const App = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/" element={<SignInPage />} />
      </Routes>
    </Suspense>
  );
};

export default App;
