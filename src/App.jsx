import { useState } from 'react'
import './App.css'

function App() {
  const [query, setQuery] = useState('');
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

  // This is where "Joanne's Brain" lives - pre-filtering everything.
  const handleSearch = () => {
    if (!query) return;
    setLoading(true);

    // Simulate AI Chef thinking... and filtering based on the Food Intolerance Guidebook
    setTimeout(() => {
      const results = [
        {
          title: "Zesty Mediterranean Lemon Chicken",
          description: "A vibrant, nutrient-dense meal using whole ingredients. Naturally Yeast-Free, Dairy-Free, and Gluten-Free.",
          ingredients: [
            { name: "Organic Chicken Breast", store: "https://www.google.com/search?q=buy+organic+chicken+breast+online" },
            { name: "Fresh Lemons", store: "https://www.google.com/search?q=fresh+lemons+near+me" },
            { name: "Extra Virgin Olive Oil", store: "https://www.google.com/search?q=premium+olive+oil+online" },
            { name: "Fresh Garlic", store: "https://www.google.com/search?q=fresh+garlic+cloves" },
            { name: "Rosemary & Thyme", store: "https://www.google.com/search?q=fresh+herbs+delivery" }
          ],
          instructions: [
            "Marinate the chicken in lemon juice, garlic, and olive oil for 30 mins.",
            "Sear in a hot pan until golden brown on both sides.",
            "Roast in the oven at 200°C for 15 minutes with fresh herbs.",
            "Serve with a fresh green salad (No Vinegar - Yeast Free!)."
          ],
          tags: ["Yeast-Free", "Dairy-Free", "Egg-Free", "Gluten-Free"]
        }
      ];
      setRecipe(results[0]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="app-shell animate-fade">
      <nav className="container navbar">
        <div className="logo">Joanne's Kitchen AI</div>
        <div className="intolerance-badge">
          🛡️ Intolerance Guard Active
        </div>
      </nav>

      <header className="container hero">
        <div className="hero-text">
          <h1>What are we <br />craving today?</h1>
          <p style={{ color: 'var(--text-soft)', marginBottom: '2rem' }}>
            Your personal AI Chef is currently filtering out **Yeast, Dairy, Egg Whites, and Gluten** based on your YorkTest results.
          </p>
          <div className="search-container">
            <input
              className="search-input"
              placeholder="e.g. Something light with chicken..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button className="search-button" onClick={handleSearch}>
              {loading ? 'Consulting Chef...' : 'Ask Chef'}
            </button>
          </div>
        </div>
        <div className="hero-visual">
          <img src="/kitchen.png" alt="Zen Kitchen" />
        </div>
      </header>

      {recipe && (
        <main className="container recipe-area animate-fade">
          <div className="recipe-card">
            <div className="recipe-header">
              <div className="meta-tags">
                {recipe.tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
              <h2>{recipe.title}</h2>
              <p style={{ marginBottom: '2rem' }}>{recipe.description}</p>

              <div className="ingredients-box">
                <h3 style={{ marginBottom: '1rem' }}>Secret Ingredients</h3>
                <ul className="ingredient-list">
                  {recipe.ingredients.map((ing, i) => (
                    <li key={i} className="ingredient-item">
                      <span>{ing.name}</span>
                      <a href={ing.store} target="_blank" className="buy-btn">Search Stores</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="instructions-box">
              <h3 style={{ marginBottom: '2rem' }}>The Recipe Book</h3>
              {recipe.instructions.map((step, i) => (
                <div key={i} className="instruction-step">
                  <span className="step-num">{i + 1}</span>
                  {step}
                </div>
              ))}
            </div>
          </div>
        </main>
      )}

      <footer className="container" style={{ padding: '4rem 0', textAlign: 'center', color: 'var(--text-soft)', fontSize: '0.8rem' }}>
        &copy; 2026 JOANNE'S KITCHEN AI • DESIGNED BY ANTIGRAVITY
      </footer>
    </div>
  )
}

export default App
