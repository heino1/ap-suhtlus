'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ChevronRight, BookOpen, Code, Presentation, FileText } from 'lucide-react';

const Sidebar = ({ sidebarOpen, setSidebarOpen, navigation }) => {
  const pathname = usePathname();
  const [theoryOpen, setTheoryOpen] = useState(true);
  const [practicalOpen, setPracticalOpen] = useState(true);
  
  // Close sidebar on mobile when navigating
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  }, [pathname, setSidebarOpen]);

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`fixed top-16 bottom-0 left-0 z-20 w-64 transition-transform transform bg-white border-r dark:bg-gray-900 dark:border-gray-800 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } lg:static lg:z-0`}>
        <nav className="h-full p-4 overflow-y-auto">
          <div className="space-y-4">
            {/* Home link */}
            <Link 
              href="/"
              className={`flex items-center px-3 py-2 rounded-md ${
                pathname === '/' ? 'bg-gray-100 dark:bg-gray-800' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <FileText size={18} className="mr-2" />
              <span>Avaleht</span>
            </Link>
            
            {/* Theory section */}
            <div>
              <button
                onClick={() => setTheoryOpen(!theoryOpen)}
                className="flex items-center justify-between w-full px-3 py-2 text-left rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <div className="flex items-center">
                  <BookOpen size={18} className="mr-2" />
                  <span>Teoreetilised materjalid</span>
                </div>
                {theoryOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
              </button>
              
              {theoryOpen && (
                <div className="pl-4 mt-1 space-y-1">
                  {navigation.theory.map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      className={`flex items-center px-3 py-2 rounded-md ${
                        pathname === item.path ? 'bg-gray-100 dark:bg-gray-800' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            {/* Practical section */}
            <div>
              <button
                onClick={() => setPracticalOpen(!practicalOpen)}
                className="flex items-center justify-between w-full px-3 py-2 text-left rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <div className="flex items-center">
                  <Code size={18} className="mr-2" />
                  <span>Praktilised näited</span>
                </div>
                {practicalOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
              </button>
              
              {practicalOpen && (
                <div className="pl-4 mt-1 space-y-1">
                  {navigation.practical.map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      className={`flex items-center px-3 py-2 rounded-md ${
                        pathname === item.path ? 'bg-gray-100 dark:bg-gray-800' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            {/* Slides */}
            {navigation.slides.length > 0 && (
              <Link
                href={navigation.slides[0].path}
                className={`flex items-center px-3 py-2 rounded-md ${
                  pathname === navigation.slides[0].path ? 'bg-gray-100 dark:bg-gray-800' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Presentation size={18} className="mr-2" />
                <span>Esitlusslaidid</span>
              </Link>
            )}
            
            {/* Other links */}
            {navigation.other.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center px-3 py-2 rounded-md ${
                  pathname === item.path ? 'bg-gray-100 dark:bg-gray-800' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <FileText size={18} className="mr-2" />
                <span>{item.title}</span>
              </Link>
            ))}
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
