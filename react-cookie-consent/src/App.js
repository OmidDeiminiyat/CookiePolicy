import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const App = () => {
  const [cookieConsent, setCookieConsent] = useState(Cookies.get('cookieConsent'));
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  useEffect(() => {
    // Check if user has previously accepted the cookie consent
    if (cookieConsent === 'accepted') {
      enableGoogleAnalytics();
    } else {
      disableGoogleAnalytics();
    }
  }, [cookieConsent]);

  // Enable Google Analytics tracking
  const enableGoogleAnalytics = () => {
    setAnalyticsEnabled(true);
    // Initialize or load Google Analytics here (you can paste your Google Analytics code)
    console.log('Google Analytics Enabled');
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX'); // Replace with your GA Measurement ID
  };

  // Disable Google Analytics tracking
  const disableGoogleAnalytics = () => {
    setAnalyticsEnabled(false);
    console.log('Google Analytics Disabled');
    // Optionally remove any Google Analytics script from the DOM
    // Prevent analytics events from being sent
    window['ga-disable-G-XXXXXXXXXX'] = true; // Replace with your GA Measurement ID
  };

  const handleAccept = () => {
    Cookies.set('cookieConsent', 'accepted', { expires: 365 });
    setCookieConsent('accepted');
  };

  const handleDeny = () => {
    Cookies.set('cookieConsent', 'denied', { expires: 365 });
    setCookieConsent('denied');
  };

  return (
    <div>
      <h1>React App with Cookie Consent for Google Analytics</h1>

      {!cookieConsent && (
        <div className="cookie-consent">
          <p>We use cookies to improve your experience. Do you accept the use of cookies for analytics?</p>
          <button onClick={handleAccept}>Accept</button>
          <button onClick={handleDeny}>Deny</button>
        </div>
      )}

      {cookieConsent === 'accepted' && analyticsEnabled && (
        <p>Google Analytics is enabled and tracking.</p>
      )}

      {cookieConsent === 'denied' && (
        <p>You have denied cookie consent for Google Analytics. Tracking is disabled.</p>
      )}
    </div>
  );
};

export default App;
