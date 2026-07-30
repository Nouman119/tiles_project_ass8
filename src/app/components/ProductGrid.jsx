export default function ProductGrid({ products }) {
  return (
    /* Responsive Grid */
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
          <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="font-bold text-lg">{product.name}</h3>
            <p className="text-gray-500 text-sm mb-4">{product.finish}</p>
            <button className="w-full border border-orange-500 text-orange-600 py-2 rounded hover:bg-orange-50 transition">
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}