import React, { useState, useEffect } from 'react';
import { Bot, Send, Camera } from 'lucide-react';
// import { LANGUAGES, WELCOME_MESSAGES } from '../../data/constants';
import { LANGUAGES, WELCOME_MESSAGES, API_CONFIG } from '../../data/constants'; // Import CHATBOT_URL

const ChatbotPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [language, setLanguage] = useState('en');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Add welcome message when component mounts or language changes
    setMessages([{
      id: Date.now(),
      text: WELCOME_MESSAGES[language] || WELCOME_MESSAGES['en'],
      isUser: false,
      timestamp: new Date()
    }]);
  }, [language]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const sendMessage = async () => {
  if (!inputMessage.trim() && !selectedImage) return;

  const userMessage = {
    id: Date.now(),
    text: inputMessage || 'Please analyze this image',
    isUser: true,
    timestamp: new Date(),
    image: selectedImage
  };

  setMessages(prev => [...prev, userMessage]);
  setInputMessage('');
  setSelectedImage(null);
  setIsTyping(true);

  try {
    const formData = new FormData();
    formData.append('message', inputMessage);
    formData.append('language', language);
    if (selectedImage) {
      formData.append('image', selectedImage); // Assume backend handles file
    }

    const response = await fetch(API_CONFIG.CHATBOT_URL, {
      method: 'POST',
      body: formData // No headers for FormData; browser sets multipart
    });
    const data = await response.json();
    if (response.ok) {
      const botMessage = {
        id: Date.now() + 1,
        text: data.response || 'Sorry, no response from AI.',
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } else {
      throw new Error(data.message || 'Chatbot error');
    }
  } catch (error) {
    const errorMessage = {
      id: Date.now() + 1,
      text: `Error: ${error.message}`,
      isUser: false,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, errorMessage]);
  } finally {
    setIsTyping(false);
  }


    // Mock AI response
    setTimeout(() => {
      const responses = {
        'en': 'Thank you for your question! Based on your query about farming, here are some recommendations...',
        'hi': 'आपके प्रश्न के लिए धन्यवाद! खेती के बारे में आपकी क्वेरी के आधार पर, यहां कुछ सुझाव हैं...',
        'bn': 'আপনার প্রশ্নের জন্য ধন্যবাদ! কৃষি সম্পর্কে আপনার প্রশ্নের ভিত্তিতে, এখানে কিছু সুপারিশ...',
        'te': 'మీ ప్రశ్నకు ధన్యవాదాలు! వ్యవసాయం గురించి మీ ప్రశ్న ఆధారంగా, ఇక్కడ కొన్ని సిఫార్సులు...',
        'ta': 'உங்கள் கேள்விக்கு நன்றி! விவசாயம் பற்றிய உங்கள் கேள்வியின் அடிப்படையில், இங்கே சில பரிந்துரைகள்...',
        'mr': 'तुमच्या प्रश्नाबद्दल धन्यवाद! शेतीविषयक तुमच्या प्रश्नाच्या आधारावर, येथे काही शिफारसी...',
        'gu': 'તમારા પ્રશ્ન માટે આભાર! ખેતી વિશેના તમારા પ્રશ્નના આધારે, અહીં કેટલીક ભલામણો...',
        'kn': 'ನಿಮ್ಮ ಪ್ರಶ್ನೆಗೆ ಧನ್ಯವಾದಗಳು! ಕೃಷಿಯ ಬಗ್ಗೆ ನಿಮ್ಮ ಪ್ರಶ್ನೆಯ ಆಧಾರದ ಮೇಲೆ, ಇಲ್ಲಿ ಕೆಲವು ಶಿಫಾರಸುಗಳು...',
        'ml': 'നിങ്ങളുടെ ചോദ്യത്തിന് നന്ദി! കൃഷിയെക്കുറിച്ചുള്ള നിങ്ങളുടെ ചോദ്യത്തിന്റെ അടിസ്ഥാനത്തിൽ, ഇവിടെ ചില ശുപാർശകൾ...',
        'pa': 'ਤੁਹਾਡੇ ਸਵਾਲ ਲਈ ਧੰਨਵਾਦ! ਖੇਤੀਬਾੜੀ ਬਾਰੇ ਤੁਹਾਡੇ ਸਵਾਲ ਦੇ ਆਧਾਰ ਤੇ, ਇੱਥੇ ਕੁਝ ਸਿਫਾਰਸ਼ਾਂ...',
        'or': 'ଆପଣଙ୍କ ପ୍ରଶ୍ନ ପାଇଁ ଧନ୍ୟବାଦ! କୃଷି ବିଷୟରେ ଆପଣଙ୍କ ପ୍ରଶ୍ନ ଆଧାରରେ, ଏଠାରେ କିଛି ସୁପାରିଶ...'
      };

      const botMessage = {
        id: Date.now() + 1,
        text: responses[language] || responses['en'],
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            AI Agriculture Assistant
          </h2>
          <p className="text-xl text-gray-600">
            Chat with our AI expert for instant farming advice and solutions
          </p>
        </div>

        {/* Language Selector */}
        <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
          <h4 className="flex items-center text-lg font-semibold text-green-600 mb-3">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-2">
              🌐
            </div>
            Select Language / भाषा चुनें
          </h4>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            {LANGUAGES.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        {/* Chat Container */}
        <div className="bg-white rounded-xl shadow-sm h-96 flex flex-col">
          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto border-b border-gray-200">
            <div className="space-y-4">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.isUser
                      ? 'bg-green-600 text-white rounded-br-sm'
                      : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                  }`}>
                    {message.image && (
                      <img
                        src={URL.createObjectURL(message.image)}
                        alt="Uploaded"
                        className="max-w-full h-32 object-cover rounded-lg mb-2"
                      />
                    )}
                    <div className="flex items-start">
                      {!message.isUser && (
                        <Bot className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      )}
                      <p className="text-sm">{message.text}</p>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg rounded-bl-sm">
                    <div className="flex items-center">
                      <Bot className="h-4 w-4 text-green-600 mr-2" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4">
            <div className="flex space-x-2">
              <div className="flex-1">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={language === 'hi' ? 'खेती, फसल, मिट्टी के बारे में पूछें...' : 
                             language === 'bn' ? 'কৃষি, ফসল, মাটি সম্পর্কে জিজ্ঞাসা করুন...' :
                             'Ask about farming, crops, soil, fertilizers...'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mt-2 text-sm text-gray-600"
                />
                {selectedImage && (
                  <div className="mt-2 flex items-center text-sm text-green-600">
                    <Camera className="h-4 w-4 mr-1" />
                    Image selected: {selectedImage.name}
                  </div>
                )}
              </div>
              <button
                onClick={sendMessage}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;