import React, { useState, useEffect } from 'react';

const TranslationApp = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [detectedLanguage, setDetectedLanguage] = useState('not sure what language this is');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isSupported, setIsSupported] = useState(true);
  const [detector, setDetector] = useState(null);

  useEffect(() => {
    const initializeDetector = async () => {
      if (!('translation' in self) || !('createDetector' in self.translation)) {
        setIsSupported(false);
        return;
      }

      const detectorInstance = await self.translation.createDetector();
      setDetector(detectorInstance);
    };

    initializeDetector();
  }, []);

  const handleInputChange = async (e) => {
    const text = e.target.value.trim();
    setInputText(text);

    if (!text) {
      setDetectedLanguage('not sure what language this is');
      return;
    }
    
    if (detector) {
      const [{ detectedLanguage, confidence }] = await detector.detect(text);
      const languageName = languageTagToHumanReadable(detectedLanguage, 'en');
      setDetectedLanguage(`${(confidence * 100).toFixed(1)}% sure that this is ${languageName}`);
    }
}

  const languageTagToHumanReadable = (languageTag, targetLanguage) => {
    const displayNames = new Intl.DisplayNames([targetLanguage], { type: 'language' });
    return displayNames.of(languageTag);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!('createTranslator' in self.translation)) {
      setOutputText('Translation feature not supported.');
      return;
    }

    try {
      const [{ detectedLanguage: sourceLanguage }] = await detector.detect(inputText.trim());
      if (!['en', 'ja', 'es'].includes(sourceLanguage)) {
        setOutputText('Currently, only English ↔ Spanish and English ↔ Japanese are supported.');
        return;
      }

      const translator = await self.translation.createTranslator({
        sourceLanguage,
        targetLanguage: selectedLanguage,
      });

      const translatedText = await translator.translate(inputText.trim());
      setOutputText(translatedText);
    } catch (err) {
      setOutputText('An error occurred. Please try again.');
      console.error(err.name, err.message);
    }
  };

  if (!isSupported) {
    return <div className="not-supported-message">Translation API is not supported in your browser.</div>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ visibility: isSupported ? 'visible' : 'hidden' }}>
        <textarea
          value={inputText}
          onChange={handleInputChange}
          placeholder="Enter text to detect language and translate"
        />
        <span>{detectedLanguage}</span>
        <select value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)}>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="ja">Japanese</option>
        </select>
        <button type="submit">Translate</button>
      </form>
      <output>{outputText}</output>
    </div>
  );
};

export default TranslationApp;