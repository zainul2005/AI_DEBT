import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

const API_URL = "https://ai-debt.onrender.com";

export default function RightsPage() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    const loadRights = async () => {
      const response = await axios.get(`${API_URL}/api/rights`, {
        params: {
          search,
          category,
        },
      });

      setItems(response.data.items);
      setCategories(response.data.categories);
    };

    loadRights();
  }, [search, category]);

  const cards = useMemo(() => items, [items]);

  return (
    <section className="container dashboard-shell">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Borrower Rights</p>
          <h2>Understand your protections, recovery rules, and practical consumer guidance.</h2>
        </div>
      </div>

      <div className="panel-card wide-card animated-card">
        <div className="search-row">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search rights or guidance"
          />

          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="">All categories</option>

            {categories.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="stats-grid" style={{ marginTop: '1rem' }}>
          {cards.map((item) => (
            <div key={item.id} className="panel-card">
              <p className="panel-label">{item.category}</p>
              <h3>{item.title}</h3>
              <p className="hero-copy" style={{ marginTop: '0.6rem' }}>
                {item.summary}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
