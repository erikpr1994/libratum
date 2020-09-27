type headerNamesTypes = {
  headerNames?: string[];
  margin: string;
};

export default function card({ headerNames, margin }: headerNamesTypes) {
  return (
    <>
      {headerNames.length > 0 ? (
        <div>
          <p>{headerNames[0]}</p>
          <p>{headerNames[0]}</p>
          <p>{headerNames[2]}</p>
          <p>{headerNames[3]}</p>
        </div>
      ) : (
        <p></p>
      )}
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
    </>
  );
}
