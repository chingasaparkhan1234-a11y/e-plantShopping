import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://images.unsplash.com/photo-1593482892290-f54927ae1bf6?auto=format&fit=crop&w=400&q=80", description: "Filters toxins and produces night oxygen.", cost: "$15" },
        { name: "Spider Plant", image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=400&q=80", description: "Resilient and purifies carbon monoxide.", cost: "$12" },
        { name: "Peace Lily", image: "https://images.unsplash.com/photo-1593691509543-c55fb32e7355?auto=format&fit=crop&w=400&q=80", description: "Graceful white blooms that cleanse air.", cost: "$18" },
        { name: "Boston Fern", image: "https://images.unsplash.com/photo-1596724806677-50a8b948b81d?auto=format&fit=crop&w=400&q=80", description: "Provides natural indoor air humidification.", cost: "$14" },
        { name: "Rubber Plant", image: "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=400&q=80", description: "Broad glossy leaves that capture dust.", cost: "$22" },
        { name: "Aloe Vera", image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=400&q=80", description: "Medicinal gel and high oxygen output.", cost: "$10" }
      ]
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        { name: "English Lavender", image: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&w=400&q=80", description: "Soothing floral scent that reduces stress.", cost: "$16" },
        { name: "Jasmine", image: "https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=400&q=80", description: "Sweet evening fragrance with star blooms.", cost: "$20" },
        { name: "Rosemary", image: "https://images.unsplash.com/photo-1515586000433-a5bc1d3b9f8f?auto=format&fit=crop&w=400&q=80", description: "Earthy aroma that sharpens focus and memory.", cost: "$11" },
        { name: "Spearmint", image: "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?auto=format&fit=crop&w=400&q=80", description: "Crisp and invigorating herbal refresh.", cost: "$9" },
        { name: "Lemon Balm", image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=400&q=80", description: "Zesty citrus notes and calming properties.", cost: "$13" },
        { name: "Eucalyptus", image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=400&q=80", description: "Distinct menthol scent supporting breathing.", cost: "$24" }
      ]
    },
    {
      category: "Low Maintenance Plants",
      plants: [
        { name: "ZZ Plant", image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?auto=format&fit=crop&w=400&q=80", description: "Thrives on drought and low fluorescent light.", cost: "$25" },
        { name: "Golden Pothos", image: "https://images.unsplash.com/photo-1598880940371-c756e015fea1?auto=format&fit=crop&w=400&q=80", description: "Fast-growing vine, almost indestructible.", cost: "$12" },
        { name: "Jade Plant", image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=400&q=80", description: "Classic succulent symbol of prosperity.", cost: "$15" },
        { name: "Cast Iron Plant", image: "https://images.unsplash.com/photo-1604762524889-3e2fccbc95f8?auto=format&fit=crop&w=400&q=80", description: "Tolerates neglect, dust, and deep shade.", cost: "$28" },
        { name: "Haworthia Zebra", image: "https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=400&q=80", description: "Compact succulent needing minimal water.", cost: "$8" },
        { name: "Aglaonema Silver", image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=400&q=80", description: "Variegated foliage suitable for any room.", cost: "$19" }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart(prevState => ({ ...prevState, [plant.name]: true }));
  };

  return (
    <div className="product-page">
      <header className="navbar">
        <h2 className="nav-logo" onClick={() => setShowCart(false)}>Paradise Nursery</h2>
        <div className="nav-cart" onClick={() => setShowCart(true)}>
          <span>🛒</span>
          <span className="cart-badge">{totalCartCount}</span>
        </div>
      </header>

      {showCart ? (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      ) : (
        <div className="plant-categories">
          {plantsArray.map((cat, idx) => (
            <section key={idx} className="category-section">
              <h2 className="category-heading">{cat.category}</h2>
              <div className="plants-grid">
                {cat.plants.map((plant, pIdx) => (
                  <div key={pIdx} className="plant-card">
                    <img src={plant.image} alt={plant.name} className="plant-img" />
                    <h3 className="plant-name">{plant.name}</h3>
                    <p className="plant-desc">{plant.description}</p>
                    <p className="plant-cost">{plant.cost}</p>
                    <button
                      className={`add-btn ${addedToCart[plant.name] ? 'added' : ''}`}
                      disabled={addedToCart[plant.name]}
                      onClick={() => handleAddToCart(plant)}
                    >
                      {addedToCart[plant.name] ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
