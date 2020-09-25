export default function card({ values, currency, margin }) {
  return (
    <div>
      <p>{values.balance.toFixed(8)}</p>
      <style jsx>{`
        div {
          height: 100px;
          border-bottom: ${margin};
          padding: 1em;
        }
      `}</style>
    </div>
  );
}
