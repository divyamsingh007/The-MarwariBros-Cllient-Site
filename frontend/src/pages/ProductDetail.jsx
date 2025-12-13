import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { productService, reviewService, cartService } from "../api/services";
import {
  FiShoppingCart,
  FiTruck,
  FiRefreshCw,
  FiShield,
  FiStar,
} from "react-icons/fi";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import "./ProductDetail.css";

export default function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [addingToCart, setAddingToCart] = useState(false);

  console.log("ProductDetail rendering with productId:", productId);

  useEffect(() => {
    console.log("ProductDetail mounted with productId:", productId);
    if (productId) {
      fetchProductDetails();
      fetchProductReviews();
    }
  }, [productId]);

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("Fetching product with ID:", productId);
      const response = await productService.getById(productId);
      console.log("Product response:", response);
      const fetchedProduct = response.data.data.product || response.data.data;
      console.log("Fetched product:", fetchedProduct);
      setProduct(fetchedProduct);

      // Set default selections
      if (fetchedProduct.variants && fetchedProduct.variants.length > 0) {
        if (fetchedProduct.variants.some((v) => v.size)) {
          setSelectedSize(fetchedProduct.variants[0].size);
        }
        if (fetchedProduct.variants.some((v) => v.color)) {
          setSelectedColor(fetchedProduct.variants[0].color);
        }
      }
    } catch (err) {
      console.error("Failed to fetch product:", err);
      console.error("Error details:", err.response || err.message);
      setError("Failed to load product details");
    } finally {
      console.log("Loading state set to false");
      setLoading(false);
    }
  };

  const fetchProductReviews = async () => {
    try {
      console.log("Fetching reviews for product:", productId);
      const response = await reviewService.getByProduct(productId);
      console.log("Reviews response:", response);
      const reviewsData =
        response.data.data?.reviews || response.data.data || [];
      console.log("Extracted reviews:", reviewsData);
      setReviews(Array.isArray(reviewsData) ? reviewsData : []);
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
      // Don't set error state for reviews, just log it
      setReviews([]);
    }
  };

  const handleAddToCart = async () => {
    try {
      setAddingToCart(true);
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        navigate("/login");
        return;
      }

      const cartData = {
        productId: product._id,
        quantity: quantity,
      };

      if (selectedSize) cartData.size = selectedSize;
      if (selectedColor) cartData.color = selectedColor;

      await cartService.addItem(user._id, cartData);
      alert("Product added to cart successfully!");
    } catch (err) {
      console.error("Failed to add to cart:", err);
      alert("Failed to add to cart. Please try again.");
    } finally {
      setAddingToCart(false);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
    }
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FiStar key={`empty-${i}`} className="text-gray-300" />);
    }
    return stars;
  };

  const getAverageRating = () => {
    if (!Array.isArray(reviews) || reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    if (Array.isArray(reviews)) {
      reviews.forEach((review) => {
        distribution[review.rating]++;
      });
    }
    return distribution;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const calculateDiscount = () => {
    if (product?.compareAtPrice && product?.price) {
      const discount =
        ((product.compareAtPrice - product.price) / product.compareAtPrice) *
        100;
      return Math.round(discount);
    }
    return 0;
  };

  const getUniqueValues = (key) => {
    if (!product?.variants || product.variants.length === 0) return [];
    const values = product.variants
      .map((v) => v[key])
      .filter((v) => v !== undefined && v !== null && v !== "");
    return [...new Set(values)];
  };

  console.log(
    "Render state - loading:",
    loading,
    "error:",
    error,
    "product:",
    product
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f9f9f9] page-fade-in">
        <Navbar />
        <div className="min-h-screen flex items-center justify-center pt-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#001238] mx-auto"></div>
            <p className="mt-4 text-[#001238] font-semibold">
              Loading product...
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#f9f9f9] page-fade-in">
        <Navbar />
        <div className="min-h-screen flex items-center justify-center pt-20">
          <div className="text-center">
            <p className="text-red-600 text-xl font-semibold">
              {error || "Product not found"}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Product ID: {productId}
            </p>
            <button
              onClick={() => navigate("/collections")}
              className="mt-6 px-8 py-3 bg-[#001238] text-white rounded-full font-semibold hover:bg-[#001f50] transition-all shadow-lg"
            >
              Back to Collections
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const images = product.images || [];
  const primaryImage = images.find((img) => img.isPrimary) || images[0];
  const sizes = getUniqueValues("size");
  const colors = getUniqueValues("color");
  const averageRating = getAverageRating();
  const ratingDistribution = getRatingDistribution();
  const discount = calculateDiscount();

  return (
    <div className="min-h-screen bg-[#f9f9f9] page-fade-in">
      <Navbar />

      {/* Hero Section */}
      <section className="mt-16 pt-24 md:pt-32 pb-12 bg-[#001238] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-20 h-20 border border-[#c5a46d] rotate-45"></div>
          <div className="absolute top-40 right-20 w-16 h-16 border border-[#c5a46d] rotate-12"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 border border-[#c5a46d] rotate-45"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-[#f9f9f9] mb-6 opacity-80">
              <button
                onClick={() => navigate("/")}
                className="hover:text-[#c5a46d] transition-colors"
              >
                Home
              </button>
              <span className="mx-2">/</span>
              <button
                onClick={() => navigate("/collections")}
                className="hover:text-[#c5a46d] transition-colors"
              >
                Collections
              </button>
              <span className="mx-2">/</span>
              <span className="text-[#c5a46d]">{product.name}</span>
            </div>

            <div className="text-center">
              <h1 className="heading-primary !text-[#f9f9f9] !text-3xl sm:!text-4xl md:!text-5xl lg:!text-6xl mb-4">
                {product.name}
              </h1>
              {product.shortDescription && (
                <p className="paragraph !text-[#f9f9f9] !text-base sm:!text-lg opacity-90 max-w-2xl mx-auto">
                  {product.shortDescription}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Product Content Section */}
      <div className="bg-[#f9f9f9]">
        {/* Product Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Images Section */}
            <div className="space-y-4">
              <div className="relative aspect-square bg-white rounded-lg overflow-hidden shadow-lg border border-[#e2e8f0]">
                <img
                  src={
                    images[selectedImage]?.url ||
                    primaryImage?.url ||
                    "/placeholder.jpg"
                  }
                  alt={images[selectedImage]?.alt || product.name}
                  className="w-full h-full object-cover"
                />
                {discount > 0 && (
                  <div className="absolute top-4 left-4 bg-[#c5a46d] text-[#001238] px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                    {discount}% OFF
                  </div>
                )}
              </div>

              {/* Thumbnail Images */}
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index
                          ? "border-[#c5a46d] shadow-md"
                          : "border-gray-200 hover:border-[#c5a46d]"
                      }`}
                    >
                      <img
                        src={image.url}
                        alt={image.alt || `${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info Section */}
            <div className="space-y-6 bg-white p-6 md:p-8 rounded-lg shadow-lg border border-[#e2e8f0]">
              <div>
                <h2 className="heading-tertiary !text-2xl md:!text-3xl !text-[#001238] mb-3">
                  Product Details
                </h2>
                {product.category && (
                  <p className="text-[#c5a46d] text-sm font-semibold uppercase tracking-wide mb-2">
                    {product.category}
                  </p>
                )}
              </div>

              {/* Rating */}
              {reviews.length > 0 && (
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {renderStars(parseFloat(averageRating))}
                  </div>
                  <span className="text-lg font-semibold">{averageRating}</span>
                  <span className="text-gray-600">
                    ({reviews.length} reviews)
                  </span>
                </div>
              )}

              {/* Price */}
              <div className="space-y-2">
                <div className="flex items-baseline gap-4">
                  <span className="text-4xl font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                  {product.compareAtPrice && (
                    <span className="text-2xl text-gray-400 line-through">
                      {formatPrice(product.compareAtPrice)}
                    </span>
                  )}
                </div>
                {product.taxIncluded && (
                  <p className="text-sm text-gray-600">
                    Inclusive of all taxes
                  </p>
                )}
              </div>

              {/* Stock Status */}
              <div>
                {product.stock > 0 ? (
                  <p className="text-green-600 font-semibold">
                    In Stock ({product.stock} available)
                  </p>
                ) : (
                  <p className="text-red-600 font-semibold">Out of Stock</p>
                )}
              </div>

              {/* Size Selection */}
              {sizes.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">
                    Select Size
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-6 py-2 border-2 rounded-lg font-semibold transition-all ${
                          selectedSize === size
                            ? "border-[#001238] bg-[#001238] text-white"
                            : "border-gray-300 hover:border-[#c5a46d]"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selection */}
              {colors.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">
                    Select Color
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-6 py-2 border-2 rounded-lg font-semibold transition-all ${
                          selectedColor === color
                            ? "border-[#001238] bg-[#001238] text-white"
                            : "border-gray-300 hover:border-[#c5a46d]"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  Quantity
                </h3>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border-2 border-[#001238] text-[#001238] rounded-lg hover:bg-[#001238] hover:text-white transition-all font-bold"
                  >
                    -
                  </button>
                  <span className="text-xl font-semibold w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() =>
                      setQuantity(Math.min(product.stock, quantity + 1))
                    }
                    className="w-10 h-10 border-2 border-[#001238] text-[#001238] rounded-lg hover:bg-[#001238] hover:text-white transition-all font-bold disabled:opacity-50"
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0 || addingToCart}
                  className="flex-1 bg-[#001238] text-white py-4 rounded-full font-semibold hover:bg-[#001f50] transition-all disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <FiShoppingCart />
                  {addingToCart ? "Adding..." : "Add to Cart"}
                </button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#e2e8f0]">
                <div className="text-center">
                  <FiTruck className="text-3xl mx-auto mb-2 text-[#c5a46d]" />
                  <p className="text-sm font-semibold text-[#001238]">
                    Free Shipping
                  </p>
                  <p className="text-xs text-gray-600">On orders above ₹999</p>
                </div>
                <div className="text-center">
                  <FiRefreshCw className="text-3xl mx-auto mb-2 text-[#c5a46d]" />
                  <p className="text-sm font-semibold text-[#001238]">
                    Easy Returns
                  </p>
                  <p className="text-xs text-gray-600">7 days return policy</p>
                </div>
                <div className="text-center">
                  <FiShield className="text-3xl mx-auto mb-2 text-[#c5a46d]" />
                  <p className="text-sm font-semibold text-[#001238]">
                    Secure Payment
                  </p>
                  <p className="text-xs text-gray-600">100% secure</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="mt-12 md:mt-16 bg-white rounded-lg shadow-lg border border-[#e2e8f0] overflow-hidden">
            <div className="border-b border-[#e2e8f0] bg-[#f9f9f9]">
              <div className="flex gap-4 md:gap-8 px-6">
                <button
                  onClick={() => setActiveTab("description")}
                  className={`pb-4 pt-6 font-semibold transition-all ${
                    activeTab === "description"
                      ? "border-b-2 border-[#001238] text-[#001238]"
                      : "text-gray-600 hover:text-[#001238]"
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab("details")}
                  className={`pb-4 pt-6 font-semibold transition-all ${
                    activeTab === "details"
                      ? "border-b-2 border-[#001238] text-[#001238]"
                      : "text-gray-600 hover:text-[#001238]"
                  }`}
                >
                  Details
                </button>
                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`pb-4 pt-6 font-semibold transition-all ${
                    activeTab === "reviews"
                      ? "border-b-2 border-[#001238] text-[#001238]"
                      : "text-gray-600 hover:text-[#001238]"
                  }`}
                >
                  Reviews ({reviews.length})
                </button>
              </div>
            </div>

            <div className="p-6 md:p-8">
              {activeTab === "description" && (
                <div className="prose max-w-none">
                  <p className="text-gray-700 whitespace-pre-line">
                    {product.description}
                  </p>
                </div>
              )}

              {activeTab === "details" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-4">
                      Product Information
                    </h3>
                    <dl className="space-y-2">
                      {product.brand && (
                        <>
                          <dt className="text-gray-600 inline">Brand:</dt>
                          <dd className="inline ml-2 font-semibold">
                            {product.brand}
                          </dd>
                        </>
                      )}
                      {product.sku && (
                        <div>
                          <dt className="text-gray-600 inline">SKU:</dt>
                          <dd className="inline ml-2 font-semibold">
                            {product.sku}
                          </dd>
                        </div>
                      )}
                      {product.category && (
                        <div>
                          <dt className="text-gray-600 inline">Category:</dt>
                          <dd className="inline ml-2 font-semibold capitalize">
                            {product.category}
                          </dd>
                        </div>
                      )}
                      {product.tags && product.tags.length > 0 && (
                        <div>
                          <dt className="text-gray-600">Tags:</dt>
                          <dd className="flex flex-wrap gap-2 mt-1">
                            {product.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                              >
                                {tag}
                              </span>
                            ))}
                          </dd>
                        </div>
                      )}
                    </dl>
                  </div>

                  {product.specifications &&
                    Object.keys(product.specifications).length > 0 && (
                      <div>
                        <h3 className="font-semibold text-lg mb-4">
                          Specifications
                        </h3>
                        <dl className="space-y-2">
                          {Object.entries(product.specifications).map(
                            ([key, value]) => (
                              <div key={key}>
                                <dt className="text-gray-600 inline capitalize">
                                  {key.replace(/_/g, " ")}:
                                </dt>
                                <dd className="inline ml-2 font-semibold">
                                  {value}
                                </dd>
                              </div>
                            )
                          )}
                        </dl>
                      </div>
                    )}
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-8">
                  {reviews.length > 0 ? (
                    <>
                      {/* Rating Summary */}
                      <div className="bg-[#f9f9f9] rounded-lg p-6 border border-[#e2e8f0]">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="text-center">
                            <div className="text-5xl font-bold text-gray-900 mb-2">
                              {averageRating}
                            </div>
                            <div className="flex items-center justify-center gap-1 mb-2">
                              {renderStars(parseFloat(averageRating))}
                            </div>
                            <p className="text-gray-600">
                              Based on {reviews.length} reviews
                            </p>
                          </div>

                          <div className="space-y-2">
                            {[5, 4, 3, 2, 1].map((rating) => (
                              <div
                                key={rating}
                                className="flex items-center gap-3"
                              >
                                <span className="text-sm w-8">{rating} ★</span>
                                <div className="flex-1 bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-[#c5a46d] h-2 rounded-full"
                                    style={{
                                      width: `${
                                        reviews.length > 0
                                          ? (ratingDistribution[rating] /
                                              reviews.length) *
                                            100
                                          : 0
                                      }%`,
                                    }}
                                  ></div>
                                </div>
                                <span className="text-sm w-12 text-right">
                                  {ratingDistribution[rating]}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Reviews List */}
                      <div className="space-y-6">
                        {reviews.map((review) => (
                          <div
                            key={review._id}
                            className="border-b border-gray-200 pb-6"
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  {renderStars(review.rating)}
                                </div>
                                <h4 className="font-semibold text-lg">
                                  {review.title}
                                </h4>
                              </div>
                              <span className="text-sm text-gray-600">
                                {new Date(
                                  review.createdAt
                                ).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-gray-700 mb-2">
                              {review.comment}
                            </p>
                            {review.user && (
                              <p className="text-sm text-gray-600">
                                By {review.user.name || "Anonymous"}
                                {review.isVerifiedPurchase && (
                                  <span className="ml-2 text-green-600">
                                    ✓ Verified Purchase
                                  </span>
                                )}
                              </p>
                            )}
                            {review.images && review.images.length > 0 && (
                              <div className="flex gap-2 mt-3">
                                {review.images.map((img, idx) => (
                                  <img
                                    key={idx}
                                    src={img.url}
                                    alt={img.caption || "Review image"}
                                    className="w-20 h-20 object-cover rounded-lg"
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-600 text-lg">No reviews yet</p>
                      <p className="text-gray-500 mt-2">
                        Be the first to review this product!
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
