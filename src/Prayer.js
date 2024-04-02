import "./Prayer.css";

export default function Prayer({ name, img, timings }) {
  return (
    <div class="Salat">
      <img src={img} alt={name} />
      <h3>{name}</h3>
      <p>{timings}</p>
    </div>
  );
}
