import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const Cookie = () => {
  const [cookieConsent, setCookieConsent] = useState(Cookies.get('cookieConsent'));
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  useEffect(() => {
    
    if (cookieConsent === 'accepted') {
      enableGoogleAnalytics();
    } else {
      disableGoogleAnalytics();
    }
  }, [cookieConsent]);

  const enableGoogleAnalytics = () => {
    setAnalyticsEnabled(true);
    console.log('Google Analytics Enabled');
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'G-XHG58XMGTD'); 
  };

  const disableGoogleAnalytics = () => {
    setAnalyticsEnabled(false);
    console.log('Google Analytics Disabled');
    window['G-XHG58XMGTD'] = true; 
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
      <h1>Velkommen til mit cookie-projekt</h1>
      <p>På 3 timer kan jeg ikke bygge en hjemmeside bedre end denne</p>

      {!cookieConsent && (
        <div className="cookie-consent">
          <p>Her bruger jeg cookies til at forbedre din oplevelse. Accepterer du brugen af ​​cookies til analyse?  </p>
          <button onClick={handleAccept}>Jep</button>
          <button onClick={handleDeny}>Ellers tak</button>
        </div>
      )}

      {cookieConsent === 'accepted' && analyticsEnabled && (
        <p>Google Analytics er aktiveret og sporing.</p>
      )}

      {cookieConsent === 'denied' && (
        <p>Du har nægtet cookie-samtykke til Google Analytics. Så sporing er deaktiveret.</p>
      )}
    </div>
  );
};

export default Cookie;
