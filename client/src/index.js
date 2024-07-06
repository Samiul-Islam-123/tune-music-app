import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { SongProvider } from './contexts/SongContext';
import { RecommendedSongsProvider } from './contexts/RecommendedsongsContext';

const publishKEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ClerkProvider publishableKey={publishKEY}>
    <SignedIn>
      <SongProvider>
        <RecommendedSongsProvider>
       <App />
        </RecommendedSongsProvider>
      </SongProvider>
    </SignedIn>
    <SignedOut>
      <RedirectToSignIn />
    </SignedOut>
  </ClerkProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
