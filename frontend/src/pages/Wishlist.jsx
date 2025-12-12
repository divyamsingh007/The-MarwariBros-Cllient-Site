import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useWishlist } from "../context/WishlistContext";
import { FiTrash2, FiShoppingCart } from "react-icons/fi";

export default function Wishlist() {
  const navigate = useNavigate();
  const { wishlist, removeFromWishlist, clearWishlist, loading } = useWishlist();

  const handleRemove = async (productId) => {
    if (window.confirm("Remove this item from wishlist?")) {
      await removeFromWishlist(productId);
    }
  };

  const handleClearAll = async () => {
    if (window.confirm("Are you sure you want to clear your entire wishlist?")) {
      await clearWishlist();
    }
  };

  return (
    <div className="bg-[#f9f9f9] min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="heading-primary !text-[#001238] mb-4">
              My Wishlist
            </h1>
            <p className="paragraph !text-[#666]">
              {wishlist.length} item{wishlist.length !== 1 ? 's' : ''} saved
            </p>
          </div>

          {wishlist.length === 0 ? (
            <div className="text-center py-20">
              <div className="mb-6">
                <svg
                  className="w-24 h-24 mx-auto text-[#c5a46d] opacity-50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h2 className="heading-secondary !text-2xl !text-[#001238] mb-4">
                Your wishlist is empty
              </h2>
              <p className="paragraph !text-[#666] mb-8 max-w-md mx-auto">
                Start adding your favorite collections to save them for later!
              </p>
              <button
                onClick={() => navigate("/collections")}
                className="bg-[#001238] text-white py-3 px-8 rounded-full font-semibold hover:bg-[#001f50] transition-colors"
              >
                Explore Collections
              </button>
            </div>
          ) : (
            <>
              <div className="flex justify-end mb-6">
                <button
                  onClick={handleClearAll}
                  disabled={loading}
                  className="text-red-500 hover:text-red-600 font-semibold text-sm flex items-center gap-2 disabled:opacity-50"
                >
                  <FiTrash2 />
                  Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {wishlist.map((item) => {
                  const product = item.product;
                  const productId = product?._id || item.product;
                  return (
                    <div
                      key={item._id}
                      className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                    >
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={product?.images?.[0]?.url || product?.image || 'https://via.placeholder.com/400'}
                          alt={product?.name || 'Product'}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => handleRemove(productId)}
                          disabled={loading}
                          className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-lg hover:bg-red-50 transition-colors disabled:opacity-50"
                        >
                          <FiTrash2 className="w-5 h-5 text-red-500" />
                        </button>
                      </div>

                      <div className="p-4">
                        <h3 className="heading-tertiary !text-base !text-[#001238] mb-2 line-clamp-2">
                          {product?.name || 'Unnamed Product'}
                        </h3>
                        
                        <p className="paragraph-small !text-[#666] mb-3 line-clamp-2">
                          {product?.description || 'No description available'}
                        </p>

                        <div className="flex items-center justify-between mb-4">
                          <span className="heading-quaternary !text-lg !text-[#c5a46d] font-bold">
                            ₹{product?.price?.toLocaleString() || 'N/A'}
                          </span>
                          {product?.stock > 0 ? (
                            <span className="text-green-600 text-xs font-semibold">In Stock</span>
                          ) : (
                            <span className="text-red-600 text-xs font-semibold">Out of Stock</span>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => navigate(`/product/${product?._id}`)}
                            className="flex-1 bg-[#001238] text-white py-2 px-4 rounded-full text-sm font-semibold hover:bg-[#001f50] transition-colors"
                          >
                            View Details
                          </button>
                          <button
                            className="px-4 py-2 border border-[#c5a46d] text-[#c5a46d] rounded-full hover:bg-[#c5a46d] hover:text-white transition-colors"
                            title="Add to Cart"
                          >
                            <FiShoppingCart className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-12 text-center">
                <button
                  onClick={() => navigate("/collections")}
                  className="border-2 border-[#001238] text-[#001238] py-3 px-8 rounded-full font-semibold hover:bg-[#001238] hover:text-white transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
