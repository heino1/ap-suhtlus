'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

const SearchComponent = ({ contentMetadata }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Flatten all content metadata for searching
  const allContent = [
    ...contentMetadata.theory,
    ...contentMetadata.practical,
    ...contentMetadata.slides,
    ...contentMetadata.other.filter(item => !item.fileName.includes('todo'))
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }
    
    setIsSearching(true);
    
    // Simple search implementation
    const results = allContent.filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setSearchResults(results);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Otsi materjalidest..."
            className="w-full px-4 py-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <button
          type="submit"
          className="absolute right-2 top-2 px-2 py-0.5 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600"
        >
          Otsi
        </button>
      </form>
      
      {isSearching && (
        <div className="mt-4 p-4 border rounded-md dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-2">
            {searchResults.length > 0 
              ? `Leiti ${searchResults.length} tulemust` 
              : 'Tulemusi ei leitud'}
          </h3>
          
          {searchResults.length > 0 && (
            <ul className="space-y-2">
              {searchResults.map((result) => (
                <li key={result.path}>
                  <a 
                    href={result.path}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {result.title}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
