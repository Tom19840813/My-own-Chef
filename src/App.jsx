import { useState, useRef } from 'react'
import './App.css'

function App() {
  const [activeProfile, setActiveProfile] = useState('Joanne');
  const [query, setQuery] = useState('');
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const fileInputRef = useRef(null);

  const [profiles, setProfiles] = useState({
    'Joanne': {
      name: 'Joanne',
      intolerances: ['Yeast', 'Cow\'s Milk', 'Egg White', 'Gluten'],
      docs: ['yorktest_report.pdf'],
      color: '#8DA392'
    },
    'Tom': {
      name: 'Tom',
      intolerances: ['None'],
      docs: [],
      color: '#6A766D'
    }
  });

  const handleSearch = () => {
    if (!query) return;
    setLoading(true);

    setTimeout(() => {
      // Logic would eventually call an API with the PDF content
      const results = {
        'Joanne': {
          title: "Zesty Mediterranean Lemon Chicken",
          description: "A nutrient-dense meal filtered for Joanne's profile. Naturally Yeast-Free and Dairy-Free.",
          tags: ["Yeast-Free", "Dairy-Free", "Egg-Free"],
          ingredients: [
            { name: "Organic Chicken Breast", store: "https://www.google.com/search?q=buy+organic+chicken" },
            { name: "Fresh Lemons", store: "https://www.google.com/search?q=buy+lemons" }
          ]
        },
        'Tom': {
          title: "Classic Artisanal Sourdough Pasta",
          description: "A hearty, high-carb meal optimized for Tom's active profile.",
          tags: ["High-Protein", "Whole-Grain"],
          ingredients: [
            { name: "Semolina Pasta", store: "https://www.google.com/search?q=buy+pasta" },
            { name: "Fresh Basil", store: "https://www.google.com/search?q=buy+basil" }
          ]
        }
      };

      setRecipe(results[activeProfile] || results['Joanne']);
      setLoading(false);
    }, 1000);
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setProfiles(prev => ({
      ...prev,
      [activeProfile]: {
        ...prev[activeProfile],
        docs: [...prev[activeProfile].docs, ...files.map(f => f.name)]
      }
    }));
    alert(`${files.length} documents added to ${activeProfile}'s profile! Our AI will now ingest these for future recipes.`);
  };

  return (
    <div className="app-shell animate-fade">
      <nav className="container navbar">
        <div className="logo-section">
          <div className="logo">My Own Chef</div>
          <p className="subtitle">Family Food Forge</p>
        </div>

        <div className="nav-controls">
          <div className="profile-switcher">
            {Object.keys(profiles).map(p => (
              <button
                key={p}
                className={`profile-btn ${activeProfile === p ? 'active' : ''}`}
                onClick={() => setActiveProfile(p)}
                style={{ borderColor: activeProfile === p ? profiles[p].color : 'transparent' }}
              >
                {p}
              </button>
            ))}
            <button className="add-profile" onClick={() => setShowSettings(true)}>+</button>
          </div>
          <button className="settings-btn" onClick={() => setShowSettings(!showSettings)}>
            {showSettings ? 'Close Management' : 'Manage Family'}
          </button>
        </div>
      </nav>

      {showSettings && (
        <section className="container settings-pane animate-fade">
          <div className="glass-card management-card">
            <h2>Family Logic Management</h2>
            <div className="management-grid">
              <div className="active-member-info">
                <h3>Current Profile: <span style={{ color: profiles[activeProfile].color }}>{activeProfile}</span></h3>
                <div className="intolerance-list">
                  {profiles[activeProfile].intolerances.map(i => (
                    <span key={i} className="intolerance-tag">{i}</span>
                  ))}
                </div>
              </div>

              <div className="upload-zone">
                <p>Upload Clinical Reports (PDF/JSON)</p>
                <input
                  type="file"
                  multiple
                  style={{ display: 'none' }}
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                />
                <button className="upload-btn" onClick={() => fileInputRef.current.click()}>
                  📁 Upload New Intelligence
                </button>
                <div className="doc-count">
                  {profiles[activeProfile].docs.length} files powering this profile
                </div>
              </div>

              <div className="save-zone">
                <button className="primary save-all">Save Family Settings</button>
              </div>
            </div>
          </div>
        </section>
      )}

      {!showSettings && (
        <header className="container hero">
          <div className="hero-text">
            <span className="profile-badge" style={{ background: profiles[activeProfile].color }}>
              Active: {activeProfile}
            </span>
            <h1>What should <br /><span className="gradient-text">{activeProfile} eat today?</span></h1>
            <div className="search-container">
              <input
                className="search-input"
                placeholder={`Search safe recipes for ${activeProfile}...`}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button className="search-button" onClick={handleSearch}>
                {loading ? 'Consulting Chef...' : 'Generate Recipe'}
              </button>
            </div>
          </div>
          <div className="hero-visual">
            <img src="/kitchen.png" alt="Zen Kitchen" />
          </div>
        </header>
      )}

      {recipe && !showSettings && (
        <main className="container recipe-area animate-fade">
          <div className="recipe-card">
            <div className="recipe-header">
              <div className="meta-tags">
                {recipe.tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
              <h2>{recipe.title}</h2>
              <p>{recipe.description}</p>

              <div className="ingredients-box">
                <h3 style={{ marginTop: '2rem' }}>The Safe List</h3>
                <ul className="ingredient-list">
                  {recipe.ingredients.map((ing, i) => (
                    <li key={i} className="ingredient-item">
                      <span>{ing.name}</span>
                      <a href={ing.store} target="_blank" className="buy-btn">Source Item</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="action-buttons">
              <button className="secondary">Save to {activeProfile}'s Favorites</button>
              <button className="primary">Cook This Now</button>
            </div>
          </div>
        </main>
      )}
    </div>
  )
}

export default App
