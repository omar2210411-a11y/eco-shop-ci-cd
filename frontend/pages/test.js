
import Link from 'next/link';

export default function TestDesign() {
  return (
    <div>
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-20 text-center">
        <h1 className="text-5xl font-bold mb-4">NEW DESIGN IS WORKING!</h1>
        <p className="text-xl">If you see this, the CSS and new design are loading properly.</p>
      </div>
      
      <div className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">Eco-Friendly Products</h3>
            <p>Sustainable choices for a better planet</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">Free Shipping</h3>
            <p>On orders over $50</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">30-Day Returns</h3>
            <p>100% satisfaction guaranteed</p>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <Link href="/" className="bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 inline-block">
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
