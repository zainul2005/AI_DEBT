export default function HeroCard({ title, description, action }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{description}</p>
      {action}
    </div>
  );
}
