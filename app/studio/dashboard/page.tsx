"use client";

import Image from 'next/image';
import { Play, FileText, Users, PenTool, Settings, Download } from 'lucide-react';
import { useState } from 'react';

const resources = [
  {
    id: 1,
    title: 'Film License',
    description: 'Active',
    icon: Play,
    status: 'active',
    action: 'Watch the Film'
  },
  {
    id: 2,
    title: 'Assembly script',
    description: 'Download',
    icon: FileText,
    status: 'available',
    action: 'Download'
  },
  {
    id: 3,
    title: 'Teachers guide',
    description: 'Download',
    icon: Users,
    status: 'available',
    action: 'Download'
  },
  {
    id: 4,
    title: 'Student worksheet',
    description: 'Download',
    icon: PenTool,
    status: 'available',
    action: 'Download'
  },
  {
    id: 5,
    title: 'Craft Activity',
    description: 'Download',
    icon: Settings,
    status: 'available',
    action: 'Download'
  }
];

const recentlyUsed = [
  {
    id: 1,
    title: 'Remembrance Day Assembly Script',
    downloadedDate: '2 days ago',
    type: 'pdf'
  },
  {
    id: 2,
    title: 'Remembrance Day Teachers Guide',
    downloadedDate: '2 days ago',
    type: 'pdf'
  },
  {
    id: 3,
    title: 'Remembrance Day Teachers Guide',
    downloadedDate: '2 days ago',
    type: 'pdf'
  },
  {
    id: 4,
    title: 'Remembrance Day Craft Activity',
    downloadedDate: '2 days ago',
    type: 'pdf'
  }
];

export default function DashboardPage() {
  const [showFilmGuide, setShowFilmGuide] = useState(false);

  const handleWatchFilm = () => {
    // TODO: Implement film watching functionality
    console.log('Opening film player');
  };

  const handleShowFilmGuide = () => {
    setShowFilmGuide(true);
  };

  const handleDownloadResource = (resourceId: number) => {
    // TODO: Implement download functionality
    console.log('Downloading resource:', resourceId);
  };

  return (
    <div className="p-6">
      {/* Hero Section */}
      <section className="relative mb-8 rounded-xl overflow-hidden">
        <div className="relative h-80">
          <Image
            src="/images/licensing-poster.png"
            alt="Remember Me film scene with classroom setting"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
          
          <div className="absolute inset-0 flex items-center">
            <div className="px-8">
              <h1 className="text-white text-4xl font-bold mb-4">
                Powerful story.<br />
                Meaningful learning
              </h1>
              <p className="text-white/90 text-lg mb-6 max-w-lg">
                Bring Remembrance Day to life with our animated film and curriculum-aligned resources.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={handleWatchFilm}
                  className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center gap-2"
                >
                  <Play className="h-5 w-5" />
                  Watch the Film
                </button>
                <button
                  onClick={handleShowFilmGuide}
                  className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors border border-white/30"
                >
                  Film Guide
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {resources.map((resource) => {
            const Icon = resource.icon;
            return (
              <div key={resource.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-[#f5bf05] rounded-full flex items-center justify-center mb-4">
                    <Icon className="h-8 w-8 text-black" />
                  </div>
                  <div className="mb-4">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <span className="font-bold text-lg">1</span>
                      {resource.status === 'active' && (
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      )}
                    </div>
                    <h3 className="font-semibold text-sm text-gray-900 mb-1">
                      {resource.title}
                    </h3>
                    <p className="text-xs text-gray-500">{resource.description}</p>
                  </div>
                  {resource.status === 'available' && (
                    <button
                      onClick={() => handleDownloadResource(resource.id)}
                      className="text-[#f5bf05] text-sm font-semibold hover:underline flex items-center gap-1"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  )}
                  {resource.status === 'active' && (
                    <span className="text-green-600 text-sm font-semibold">Active</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Recently Used Resources */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Recently Used Resources</h2>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {recentlyUsed.map((item, index) => (
            <div 
              key={item.id} 
              className={`flex items-center justify-between p-4 ${
                index !== recentlyUsed.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                  <FileText className="h-4 w-4 text-red-600" />
                </div>
                <span className="font-medium text-gray-900">{item.title}</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">Downloaded</div>
                <div className="text-xs text-gray-500">{item.downloadedDate}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Film Guide Modal */}
      {showFilmGuide && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-bold">REMEMBER ME - Film Guide for Primary Schools</h2>
              <button
                onClick={() => setShowFilmGuide(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <div className="prose max-w-none">
                <p className="text-gray-600 mb-4">
                  A short animated film about remembrance, family and the stories behind history.
                </p>
                <div className="mb-6">
                  <strong>Age:</strong> 7–11 | KS2, adaptable for KS1<br />
                  <strong>Themes:</strong> Remembrance, History, Family, Memory & Reflection
                </div>
                
                <h3 className="text-lg font-bold mb-3">About the Film</h3>
                <p className="mb-4">
                  Remember Me follows a granddaughter visiting the grave of a soldier who died during the Second 
                  World War. As she touches his gravestone, she experiences glimpses of his life, helping pupils 
                  understand the people and stories behind Remembrance Day.
                </p>
                
                <h3 className="text-lg font-bold mb-3">Learning Objectives</h3>
                <p className="mb-2">Pupils will:</p>
                <ul className="list-disc pl-5 mb-4 space-y-1">
                  <li>Understand why we commemorate Remembrance Day.</li>
                  <li>Explore how war affected individuals and families.</li>
                  <li>Develop vocabulary, empathy and communication skills.</li>
                  <li>Respond through writing, art, discussion and storytelling.</li>
                </ul>
                
                <h3 className="text-lg font-bold mb-3">Before Watching</h3>
                <p className="mb-2">Discuss:</p>
                <ul className="list-disc pl-5 mb-4 space-y-1">
                  <li>What does it mean to remember someone?</li>
                  <li>Why do we wear poppies?</li>
                  <li>What can a memorial tell us?</li>
                </ul>
                <p className="mb-4">
                  <strong>Key vocabulary:</strong> Remembrance, War, Soldier, Memorial, Poppy, Sacrifice, Courage, Peace, Memory.
                </p>
                
                <h3 className="text-lg font-bold mb-3">While Watching</h3>
                <p className="mb-2">Ask pupils to notice:</p>
                <ul className="list-disc pl-5 mb-4 space-y-1">
                  <li><strong>Characters:</strong> Who are they and how are they connected?</li>
                  <li><strong>Setting:</strong> Where does the story take place?</li>
                  <li><strong>Emotions:</strong> How do the characters feel?</li>
                </ul>
                <p className="mb-4">
                  Encourage pupils to notice how animation, music and sound communicate emotion.
                </p>
                
                <h3 className="text-lg font-bold mb-3">After Watching</h3>
                <p className="mb-2">Discuss:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>What happened in the film?</li>
                  <li>Who was the soldier?</li>
                  <li>Why was his gravestone important?</li>
                  <li>How did the granddaughter feel?</li>
                  <li>Why is remembering important?</li>
                  <li>What message does the film communicate?</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}