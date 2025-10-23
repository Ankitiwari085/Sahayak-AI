import React, { useEffect } from "react";

const GoogleTranslate = () => {
  useEffect(() => {
    // Fix potential scrolling issues caused by Google Translate
    if (window.document.scrollingElement?.hasAttribute("style")) {
      window.document.scrollingElement.setAttribute("style", "");
    }
  }, []);

  return <div id="google_translate_element" className="inline-block ml-2" />;
};

export default GoogleTranslate;
