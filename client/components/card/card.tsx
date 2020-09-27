export default function card({ values, currency, margin }) {
  return (
    <div>
      <p>Coin</p>
      <p>10</p>
      <p>{values.balance.toFixed(8)}</p>
      <p>{values.totalInEur}</p>
      <style jsx>{`
        div {
          height: 80px;
          border-bottom: ${margin};
          padding: 1em;
          display: flex;
          justify-content: space-evenly;
          align-items: center;
        }
      `}</style>
    </div>
  );
}
