import React, { useState } from "react";
import { useGetProductsQuery } from "../redux/products/productApi";
import ProductCard from "../components/ProductCard";

const ProductPage = () => {
    // filtered
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedRating, setSelectedRating] = useState(0);

    // pagenation
    const [current, setcurrent] = useState(1)
    const itemsPerPage = 8;

    const { data, error, isLoading, isError } = useGetProductsQuery();


    if (isLoading) return <h2>Loading...</h2>;

    if (isError) {
        return <h2>{error?.message || "Something went wrong"}</h2>;
    }

    // filtered
    const categories = [
        ...new Set(data.products.map((item) => item.category))
    ];

    const colors = [
        ...new Set(data.products.flatMap((item) => item.colors))
    ];
    const filteredProducts = data.products.filter((item) => {

        const categoryMatch =
            !selectedCategory ||
            item.category === selectedCategory;

        const colorMatch =
            !selectedColor ||
            item.colors.includes(selectedColor);

        const ratingMatch =
            !selectedRating ||
            item.rating.stars >= selectedRating;

        return (
            categoryMatch &&
            colorMatch &&
            ratingMatch
        );
    });
    // pagenation

    const totalPages = Math.ceil(
        filteredProducts.length / itemsPerPage
    );

    const lastIndex = (current - 1) * itemsPerPage;

    const totalProducts = filteredProducts.slice(
        lastIndex,
        lastIndex + itemsPerPage
    );
    return (
        <div className="main-shop-container">
            <div className="container">

                {/* filtered side */}
                <div className="filterd-container">
                    <div className="product-filter-side">

                        <div className="filter-header">
                            <h3>Filter</h3>

                            <button
                                className="clear-filter-btn"
                                onClick={() => {
                                    setSelectedCategory("");
                                    setSelectedColor("");
                                    setSelectedRating(0);
                                }}
                            >
                                Clear All
                            </button>
                        </div>

                        {/* Categories */}

                        <div className="filter-section">

                            <h4>CATEGORY</h4>

                            {categories.map((category) => (
                                <label
                                    className="filter-checkbox"
                                    key={category}
                                >
                                    <input
                                        type="checkbox"
                                        checked={
                                            selectedCategory === category
                                        }
                                        onChange={() =>
                                            setSelectedCategory(
                                                selectedCategory === category
                                                    ? ""
                                                    : category
                                            )
                                        }
                                    />

                                    <span>{category}</span>
                                </label>
                            ))}

                        </div>

                        {/* Colors */}

                        <div className="filter-section">

                            <h4>COLOR</h4>

                            <div className="color-wrapper">

                                {colors.map((color) => (
                                    <button
                                        key={color}
                                        className={`color-circle ${selectedColor === color
                                            ? "active-color"
                                            : ""
                                            }`}
                                        onClick={() =>
                                            setSelectedColor(
                                                selectedColor === color
                                                    ? ""
                                                    : color
                                            )
                                        }
                                    >
                                        {color}
                                    </button>
                                ))}

                            </div>

                        </div>

                        {/* Ratings */}

                        <div className="filter-section">

                            <h4>RATING</h4>

                            {[5, 4, 3].map((rating) => (
                                <label
                                    className="filter-checkbox"
                                    key={rating}
                                >
                                    <input
                                        type="checkbox"
                                        checked={
                                            selectedRating === rating
                                        }
                                        onChange={() =>
                                            setSelectedRating(
                                                selectedRating === rating
                                                    ? 0
                                                    : rating
                                            )
                                        }
                                    />

                                    <span>
                                        ⭐ {rating}+ Stars
                                    </span>
                                </label>
                            ))}

                        </div>

                    </div>
                </div>

                <div className="product-card-side">
                    {totalProducts?.map((item) => (
                        <ProductCard
                            item={item}
                            key={item._id}
                        />
                    ))}
                </div>
            </div>
            {/* Pagination */}

            <div className="pagination">
                <button
                    className="page-btn"
                    onClick={() => setcurrent((prev) => prev - 1)}
                    disabled={current === 1}
                >
                    Prev
                </button>

                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        className={`page-number ${current === index + 1 ? "active-page" : ""
                            }`}
                        onClick={() => setcurrent(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}

                <button
                    className="page-btn"
                    onClick={() => setcurrent((prev) => prev + 1)}
                    disabled={current === totalPages}
                >
                    Next
                </button>

            </div>
        </div>
    );
};

export default ProductPage;