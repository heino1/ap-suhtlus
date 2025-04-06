import { getContentMetadata } from '@/lib/content';

export const dynamic = 'force-dynamic';

export default async function RootLayout({ children }) {
  const contentMetadata = getContentMetadata();
  
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 border-b bg-white dark:bg-gray-900 dark:border-gray-800">
        <div className="flex items-center">
          <h1 className="text-xl font-bold">
            Arvutiprogrammid ja nende omavaheline suhtlemine
          </h1>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="fixed top-16 bottom-0 left-0 z-20 w-64 bg-white border-r dark:bg-gray-900 dark:border-gray-800 lg:static lg:z-0">
          <nav className="h-full p-4 overflow-y-auto">
            <div className="space-y-4">
              {/* Home link */}
              <a 
                href="/"
                className="flex items-center px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <span>Avaleht</span>
              </a>
              
              {/* Theory section */}
              <div>
                <div className="flex items-center px-3 py-2 font-semibold">
                  <span>Teoreetilised materjalid</span>
                </div>
                
                <div className="pl-4 mt-1 space-y-1">
                  {contentMetadata.theory.map((item) => (
                    <a
                      key={item.path}
                      href={item.path}
                      className="flex items-center px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      {item.title}
                    </a>
                  ))}
                </div>
              </div>
              
              {/* Practical section */}
              <div>
                <div className="flex items-center px-3 py-2 font-semibold">
                  <span>Praktilised näited</span>
                </div>
                
                <div className="pl-4 mt-1 space-y-1">
                  {contentMetadata.practical.map((item) => (
                    <a
                      key={item.path}
                      href={item.path}
                      className="flex items-center px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      {item.title}
                    </a>
                  ))}
                </div>
              </div>
              
              {/* Slides */}
              {contentMetadata.slides.length > 0 && (
                <a
                  href={contentMetadata.slides[0].path}
                  className="flex items-center px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <span>Esitlusslaidid</span>
                </a>
              )}
              
              {/* Other links */}
              {contentMetadata.other.map((item) => (
                <a
                  key={item.path}
                  href={item.path}
                  className="flex items-center px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <span>{item.title}</span>
                </a>
              ))}
            </div>
          </nav>
        </aside>
        <main className="flex-1 p-6 overflow-auto lg:ml-64">
          {children}
        </main>
      </div>
    </div>
  );
}
