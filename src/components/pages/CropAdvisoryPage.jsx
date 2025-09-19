
// components/pages/CropAdvisoryPage.jsx
import React, { useState } from 'react';
import { 
  Microscope, Camera, CreditCard, Upload, 
  Trash2, CheckCircle, Loader, Leaf, 
  TrendingUp, Calendar, Bug 
} from 'lucide-react';

const CropAdvisoryPage = () => {
  const [analysisMethod, setAnalysisMethod] = useState('manual');
  const [formData, setFormData] = useState({
    cropType: '',
    areaValue: '',
    areaUnit: '',
    season: '',
    language: 'en',
    location: '',
    soilType: '',
    soilImage: null,
    healthCardImage: null,
    healthCardLanguage: 'en',
    overrideCropType: '',
    overrideAreaValue: '',
    overrideAreaUnit: '',
    overrideSeason: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [imagePreview, setImagePreview] = useState({ soil: null, healthCard: null });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, [`${type}Image`]: file }));
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(prev => ({ ...prev, [type]: event.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (type) => {
    setFormData(prev => ({ ...prev, [`${type}Image`]: null }));
    setImagePreview(prev => ({ ...prev, [type]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Mock API call
    setTimeout(() => {
      setResult({
        success: true,
        data: {
          cropType: formData.cropType || 'Wheat',
          detectedSoilType: 'Loamy',
          generalRecommendation: 'Your soil is suitable for the selected crop. Follow the recommendations below for optimal growth.',
          fertilizers: [
            {
              name: 'NPK Complex',
              npkRatio: '10:26:26',
              company: 'IFFCO',
              quantity: '50 kg per acre',
              applicationMethod: 'Basal application before sowing'
            },
            {
              name: 'Urea',
              npkRatio: '46:0:0',
              company: 'IFFCO',
              quantity: '25 kg per acre',
              applicationMethod: 'Top dressing after 30 days'
            }
          ],
          applicationTips: [
            'Apply fertilizers during cool hours of the day',
            'Ensure proper soil moisture before application',
            'Mix fertilizers with soil after application'
          ],
          seasonalAdvice: [
            'Monitor weather conditions regularly',
            'Maintain proper drainage during monsoon',
            'Protect crops from extreme temperatures'
          ],
          pesticideRecommendation: [
            'Use neem-based pesticides for organic farming',
            'Monitor for common pests specific to your crop',
            'Follow integrated pest management practices'
          ]
        }
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            AI Soil Analysis & Crop Advisory
          </h2>
          <p className="text-xl text-gray-600">
            Get AI-powered soil analysis and fertilizer recommendations for your crops
          </p>
        </div>

        {/* Analysis Method Toggle */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
          <h4 className="flex items-center text-lg font-semibold text-green-600 mb-4">
            <Microscope className="h-5 w-5 mr-2" />
            Choose Analysis Method
          </h4>
          <div className="flex flex-wrap gap-4 mb-4">
            <button
              onClick={() => setAnalysisMethod('manual')}
              className={`flex items-center px-4 py-2 rounded-lg border-2 transition-all ${
                analysisMethod === 'manual'
                  ? 'bg-green-600 text-white border-green-600'
                  : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-green-300'
              }`}
            >
              <Camera className="h-4 w-4 mr-2" />
              Manual Entry
            </button>
            <button
              onClick={() => setAnalysisMethod('health-card')}
              className={`flex items-center px-4 py-2 rounded-lg border-2 transition-all ${
                analysisMethod === 'health-card'
                  ? 'bg-green-600 text-white border-green-600'
                  : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-green-300'
              }`}
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Soil Health Card
            </button>
          </div>
          <p className="text-sm text-gray-600">
            Choose manual entry for custom analysis or upload your government-issued soil health card for instant analysis
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {analysisMethod === 'manual' ? (
              <>
                {/* Manual Form Fields */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Crop Type *
                    </label>
                    <select
                      name="cropType"
                      value={formData.cropType}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    >
                      <option value="">Select Crop</option>
                      <option value="wheat">Wheat</option>
                      <option value="rice">Rice</option>
                      <option value="corn">Corn</option>
                      <option value="sugarcane">Sugarcane</option>
                      <option value="cotton">Cotton</option>
                      <option value="potato">Potato</option>
                      <option value="tomato">Tomato</option>
                      <option value="onion">Onion</option>
                      <option value="soybean">Soybean</option>
                      <option value="groundnut">Groundnut</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Farm Area *
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="number"
                        name="areaValue"
                        value={formData.areaValue}
                        onChange={handleInputChange}
                        placeholder="Enter area"
                        step="0.1"
                        min="0.1"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        required
                      />
                      <select
                        name="areaUnit"
                        value={formData.areaUnit}
                        onChange={handleInputChange}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        required
                      >
                        <option value="">Unit</option>
                        <option value="ACRE">Acre</option>
                        <option value="BIGHA">Bigha</option>
                        <option value="HECTARE">Hectare</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Season *
                    </label>
                    <select
                      name="season"
                      value={formData.season}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    >
                      <option value="">Select Season</option>
                      <option value="KHARIF">Kharif (Monsoon)</option>
                      <option value="RABI">Rabi (Winter)</option>
                      <option value="SUMMER">Summer</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Language *
                    </label>
                    <select
                      name="language"
                      value={formData.language}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    >
                      <option value="en">English</option>
                      <option value="hi">Hindi</option>
                      <option value="bn">Bengali</option>
                      <option value="te">Telugu</option>
                      <option value="ta">Tamil</option>
                      <option value="gu">Gujarati</option>
                      <option value="mr">Marathi</option>
                      <option value="kn">Kannada</option>
                      <option value="ml">Malayalam</option>
                      <option value="pa">Punjabi</option>
                      <option value="or">Odia</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location (Optional)
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="Enter your location"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Soil Type (Optional)
                    </label>
                    <select
                      name="soilType"
                      value={formData.soilType}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="">Select or upload image</option>
                      <option value="CLAY">Clay</option>
                      <option value="SANDY">Sandy</option>
                      <option value="LOAMY">Loamy</option>
                      <option value="SILT">Silt</option>
                      <option value="RED_SOIL">Red Soil</option>
                      <option value="BLACK_SOIL">Black Soil</option>
                      <option value="ALLUVIAL">Alluvial</option>
                      <option value="LATERITE">Laterite</option>
                    </select>
                  </div>
                </div>

                {/* Soil Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Soil Image (Optional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, 'soil')}
                      className="hidden"
                      id="soil-upload"
                    />
                    <label
                      htmlFor="soil-upload"
                      className="cursor-pointer flex flex-col items-center justify-center py-4"
                    >
                      {imagePreview.soil ? (
                        <div className="relative">
                          <img
                            src={imagePreview.soil}
                            alt="Soil preview"
                            className="max-w-xs max-h-48 rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage('soil')}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <Upload className="h-8 w-8 text-gray-400 mb-2" />
                          <span className="text-sm text-gray-600">
                            Click to upload soil image
                          </span>
                          <span className="text-xs text-gray-500 mt-1">
                            Max 5MB - JPG, PNG, WebP
                          </span>
                        </>
                      )}
                    </label>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Health Card Form */}
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border-l-4 border-orange-500 mb-6">
                  <h4 className="flex items-center text-lg font-semibold text-orange-700 mb-3">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Soil Health Card Analysis
                  </h4>
                  <p className="text-orange-600 mb-4">
                    Upload your government-issued soil health card for instant AI analysis. 
                    The system will extract all soil data automatically and provide personalized fertilizer recommendations.
                  </p>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h5 className="flex items-center font-medium text-green-700 mb-2">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Health Card Benefits:
                    </h5>
                    <ul className="text-sm text-green-600 space-y-1">
                      <li>• Automatic extraction of soil nutrients (NPK, pH, organic carbon)</li>
                      <li>• Precise fertilizer recommendations based on official soil test data</li>
                      <li>• Faster analysis with higher accuracy</li>
                      <li>• No manual data entry required</li>
                    </ul>
                  </div>
                </div>

                {/* Health Card Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Soil Health Card Image *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, 'healthCard')}
                      className="hidden"
                      id="health-card-upload"
                      required
                    />
                    <label
                      htmlFor="health-card-upload"
                      className="cursor-pointer flex flex-col items-center justify-center py-4"
                    >
                      {imagePreview.healthCard ? (
                        <div className="relative">
                          <img
                            src={imagePreview.healthCard}
                            alt="Health card preview"
                            className="max-w-xs max-h-48 rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage('healthCard')}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <Upload className="h-8 w-8 text-gray-400 mb-2" />
                          <span className="text-sm text-gray-600">
                            Click to upload soil health card
                          </span>
                          <span className="text-xs text-gray-500 mt-1">
                            Max 10MB - JPG, PNG, WebP
                          </span>
                        </>
                      )}
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Language *
                  </label>
                  <select
                    name="healthCardLanguage"
                    value={formData.healthCardLanguage}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  >
                    <option value="en">English</option>
                    <option value="hi">Hindi</option>
                    <option value="bn">Bengali</option>
                    <option value="te">Telugu</option>
                    <option value="ta">Tamil</option>
                    <option value="gu">Gujarati</option>
                    <option value="mr">Marathi</option>
                    <option value="kn">Kannada</option>
                    <option value="ml">Malayalam</option>
                    <option value="pa">Punjabi</option>
                    <option value="or">Odia</option>
                  </select>
                </div>

                {/* Override Options */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border-l-4 border-purple-500">
                  <h4 className="flex items-center text-lg font-semibold text-purple-700 mb-3">
                    <Microscope className="h-5 w-5 mr-2" />
                    Override Options (Optional)
                  </h4>
                  <p className="text-purple-600 mb-4">
                    You can override specific values if needed. Leave blank to use values from the health card.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Override Crop Type
                      </label>
                      <select
                        name="overrideCropType"
                        value={formData.overrideCropType}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      >
                        <option value="">Use from health card</option>
                        <option value="wheat">Wheat</option>
                        <option value="rice">Rice</option>
                        <option value="corn">Corn</option>
                        <option value="sugarcane">Sugarcane</option>
                        <option value="cotton">Cotton</option>
                        <option value="potato">Potato</option>
                        <option value="tomato">Tomato</option>
                        <option value="onion">Onion</option>
                        <option value="soybean">Soybean</option>
                        <option value="groundnut">Groundnut</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Override Season
                      </label>
                      <select
                        name="overrideSeason"
                        value={formData.overrideSeason}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      >
                        <option value="">Use from health card</option>
                        <option value="KHARIF">Kharif (Monsoon)</option>
                        <option value="RABI">Rabi (Winter)</option>
                        <option value="SUMMER">Summer</option>
                      </select>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader className="h-5 w-5 animate-spin mr-2" />
                  {analysisMethod === 'manual' ? 'Analyzing Soil...' : 'Processing Health Card...'}
                </>
              ) : (
                <>
                  <Microscope className="h-5 w-5 mr-2" />
                  {analysisMethod === 'manual' ? 'Get AI Soil Analysis' : 'Analyze Health Card with AI'}
                </>
              )}
            </button>
          </form>

          {/* Loading State */}
          {loading && (
            <div className="mt-8 bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border-l-4 border-blue-500">
              <div className="flex items-center mb-4">
                <Loader className="h-6 w-6 animate-spin text-blue-600 mr-3" />
                <h4 className="text-lg font-semibold text-blue-700">
                  AI Analysis in Progress
                </h4>
              </div>
              <p className="text-blue-600 mb-4">
                Our AI system is analyzing your {analysisMethod === 'manual' ? 'soil and crop' : 'soil health card'} data. 
                This may take 30-90 seconds...
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: Microscope, label: analysisMethod === 'manual' ? 'Analyzing Soil' : 'Reading Image' },
                  { icon: Leaf, label: 'Crop Requirements' },
                  { icon: TrendingUp, label: 'Fertilizer Matching' },
                  { icon: CheckCircle, label: 'Recommendations' }
                ].map(({ icon: Icon, label }, index) => (
                  <div key={index} className="bg-white p-3 rounded-lg text-center">
                    <Icon className="h-6 w-6 text-green-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-700">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Results */}
          {result && result.success && (
            <div className="mt-8 space-y-6">
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <h4 className="text-lg font-semibold text-green-800">
                    {analysisMethod === 'manual' ? 'AI Soil Analysis Complete!' : 'Health Card Analysis Complete!'}
                  </h4>
                </div>
                <p className="text-green-700">
                  Your personalized fertilizer recommendations are ready
                </p>
              </div>

              {/* Analysis Results */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border-l-4 border-green-500">
                <h4 className="flex items-center text-lg font-semibold text-green-700 mb-4">
                  <Leaf className="h-5 w-5 mr-2" />
                  Soil Analysis Results
                </h4>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-white p-4 rounded-lg">
                    <h6 className="flex items-center font-medium text-gray-800 mb-2">
                      <Microscope className="h-4 w-4 mr-2" />
                      Detected Soil Type
                    </h6>
                    <p className="text-gray-600">{result.data.detectedSoilType}</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg">
                    <h6 className="flex items-center font-medium text-gray-800 mb-2">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      General Recommendation
                    </h6>
                    <p className="text-gray-600">{result.data.generalRecommendation}</p>
                  </div>
                </div>
              </div>

              {/* Fertilizer Recommendations */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border-l-4 border-blue-500">
                <h4 className="flex items-center text-lg font-semibold text-blue-700 mb-4">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Fertilizer Recommendations
                </h4>
                
                <div className="space-y-4">
                  {result.data.fertilizers.map((fertilizer, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                      <h6 className="font-semibold text-gray-800 mb-2">
                        {fertilizer.name} ({fertilizer.npkRatio})
                      </h6>
                      <div className="grid md:grid-cols-3 gap-2 text-sm text-gray-600">
                        <p><strong>Company:</strong> {fertilizer.company}</p>
                        <p><strong>Quantity:</strong> {fertilizer.quantity}</p>
                        <p><strong>Method:</strong> {fertilizer.applicationMethod}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Application Tips */}
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl border-l-4 border-yellow-500">
                <h5 className="flex items-center text-lg font-semibold text-yellow-700 mb-3">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Application Tips
                </h5>
                <ul className="space-y-2">
                  {result.data.applicationTips.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-yellow-800">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Seasonal Advice */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border-l-4 border-purple-500">
                <h5 className="flex items-center text-lg font-semibold text-purple-700 mb-3">
                  <Calendar className="h-5 w-5 mr-2" />
                  Seasonal Advice
                </h5>
                <ul className="space-y-2">
                  {result.data.seasonalAdvice.map((advice, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-purple-800">{advice}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pesticide Recommendations */}
              <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl border-l-4 border-red-500">
                <h5 className="flex items-center text-lg font-semibold text-red-700 mb-3">
                  <Bug className="h-5 w-5 mr-2" />
                  Pesticide & Disease Management
                </h5>
                <ul className="space-y-2">
                  {result.data.pesticideRecommendation.map((pest, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-red-800">{pest}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CropAdvisoryPage;