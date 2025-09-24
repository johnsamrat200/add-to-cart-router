const ProductCard = ({ product, addToCart, inCart }) => (
  <div className="bg-white p-4 rounded shadow hover:shadow-2xl transition">
    <img src={product.image} alt={product.title} className="h-40 mx-auto mb-4 object-contain" />
    <h2 className="text-sm font-semibold mb-2">{product.title}</h2>
    <p className="text-lg font-bold mb-4">${product.price}</p>
    <div>
      <button
      onClick={() => addToCart(product)}
      className={`mt-2 px-4 py-2 rounded text-white ${inCart ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}`}
    >
      {inCart ? "Remove from Cart" : "Add to Cart"}
    </button>
    </div>
  </div>
);

export default ProductCard;
