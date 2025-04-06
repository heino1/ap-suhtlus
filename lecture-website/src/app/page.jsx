import { getContentMetadata } from '@/lib/content';

export default function Home() {
  const contentMetadata = getContentMetadata();
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Arvutiprogrammid ja nende omavaheline suhtlemine</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Loengumaterjalid äriinformaatika kursusel logistika 5. aasta tudengitele
        </p>
      </div>
      
      <div className="grid gap-8 md:grid-cols-2">
        <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-bold mb-4">Teoreetilised materjalid</h2>
          <ul className="space-y-2">
            {contentMetadata.theory.map((item) => (
              <li key={item.path}>
                <a 
                  href={item.path}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-bold mb-4">Praktilised näited</h2>
          <ul className="space-y-2">
            {contentMetadata.practical.map((item) => (
              <li key={item.path}>
                <a 
                  href={item.path}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="mt-8 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-bold mb-4">Esitlusslaidid ja muud materjalid</h2>
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold mb-2">Esitlusslaidid</h3>
            <ul className="space-y-2">
              {contentMetadata.slides.map((item) => (
                <li key={item.path}>
                  <a 
                    href={item.path}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Muud materjalid</h3>
            <ul className="space-y-2">
              {contentMetadata.other
                .filter(item => !item.fileName.includes('todo') && !item.fileName.includes('README'))
                .map((item) => (
                  <li key={item.path}>
                    <a 
                      href={item.path}
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {item.title}
                    </a>
                  </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mt-8 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-bold mb-4">Allalaadimised</h2>
        <p className="mb-4">
          Kõik materjalid on saadaval ka allalaadimiseks:
        </p>
        <div className="flex space-x-4">
          <a 
            href="/download/loengumaterjalid.zip"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Laadi alla kõik materjalid (.zip)
          </a>
        </div>
      </div>
    </div>
  );
}
