'use client';

import { useState } from 'react';
import { Sparkles, TrendingUp, Video, Target, Zap, Users } from 'lucide-react';

interface VideoIdea {
  title: string;
  hook: string;
  description: string;
  targetAudience: string;
  keyElements: string[];
  thumbnailIdeas: string[];
  viralPotential: number;
  estimatedViews: string;
}

export default function Home() {
  const [niche, setNiche] = useState('');
  const [contentType, setContentType] = useState('');
  const [loading, setLoading] = useState(false);
  const [ideas, setIdeas] = useState<VideoIdea[]>([]);
  const [error, setError] = useState('');

  const generateIdeas = async () => {
    if (!niche.trim()) {
      setError('Please enter a niche');
      return;
    }

    setLoading(true);
    setError('');
    setIdeas([]);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ niche, contentType }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate ideas');
      }

      const data = await response.json();
      setIdeas(data.ideas);
    } catch (err) {
      setError('Failed to generate video ideas. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Video className="w-12 h-12 text-red-600 mr-3" />
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
              YouTube Viral Agent
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            AI-powered viral video concept generator for millions of views
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                Content Niche *
              </label>
              <input
                type="text"
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                placeholder="e.g., Tech Reviews, Gaming, Fitness, Cooking..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                Content Type (Optional)
              </label>
              <select
                value={contentType}
                onChange={(e) => setContentType(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="">Any Type</option>
                <option value="shorts">YouTube Shorts</option>
                <option value="long-form">Long-form (10+ min)</option>
                <option value="tutorial">Tutorial/How-to</option>
                <option value="entertainment">Entertainment</option>
                <option value="challenge">Challenge</option>
                <option value="review">Review</option>
                <option value="vlog">Vlog</option>
              </select>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg">
              {error}
            </div>
          )}

          <button
            onClick={generateIdeas}
            disabled={loading}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 px-8 rounded-lg transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                Generating Viral Ideas...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Generate Viral Video Ideas
              </>
            )}
          </button>
        </div>

        {/* Results Section */}
        {ideas.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
              <TrendingUp className="w-8 h-8 mr-3 text-red-600" />
              Your Viral Video Ideas
            </h2>

            {ideas.map((idea, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold mr-3">
                        #{index + 1}
                      </span>
                      <div className="flex items-center">
                        <Zap className="w-5 h-5 text-yellow-500 mr-1" />
                        <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                          Viral Potential: {idea.viralPotential}/10
                        </span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {idea.title}
                    </h3>
                  </div>
                  <div className="bg-green-100 dark:bg-green-900/30 px-4 py-2 rounded-lg">
                    <div className="text-xs text-green-700 dark:text-green-300 font-semibold">
                      Est. Views
                    </div>
                    <div className="text-lg font-bold text-green-700 dark:text-green-400">
                      {idea.estimatedViews}
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 mb-4">
                  <div className="flex items-start">
                    <Target className="w-5 h-5 text-yellow-600 mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <div className="text-sm font-semibold text-yellow-800 dark:text-yellow-300 mb-1">
                        HOOK (First 3 seconds):
                      </div>
                      <div className="text-yellow-900 dark:text-yellow-200 font-medium">
                        {idea.hook}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Description:
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {idea.description}
                  </p>
                </div>

                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <Users className="w-4 h-4 mr-2 text-red-600" />
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Target Audience:
                    </h4>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 ml-6">
                    {idea.targetAudience}
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Key Viral Elements:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {idea.keyElements.map((element, i) => (
                      <span
                        key={i}
                        className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-3 py-1 rounded-full text-sm"
                      >
                        {element}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Thumbnail Ideas:
                  </h4>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    {idea.thumbnailIdeas.map((thumbnail, i) => (
                      <li
                        key={i}
                        className="text-gray-600 dark:text-gray-400 text-sm"
                      >
                        {thumbnail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Features Section */}
        {ideas.length === 0 && !loading && (
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
              <div className="bg-red-100 dark:bg-red-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                AI-Powered Ideas
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Generate data-driven video concepts optimized for virality
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
              <div className="bg-red-100 dark:bg-red-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Perfect Hooks
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Attention-grabbing openings that stop the scroll
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
              <div className="bg-red-100 dark:bg-red-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Viral Strategies
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Proven tactics to maximize views and engagement
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
