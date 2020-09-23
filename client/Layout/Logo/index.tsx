type Logo = {
  alt: string;
  src: string;
};

export default function Logo({ alt, src }: Logo) {
  return (
    <>
      <div>
        <img alt={alt} src={src} title={alt} />
      </div>
      <style jsx>{`
        div {
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }

        img {
          height: auto;
          width: auto;
          max-width: 200px;
        }
      `}</style>
    </>
  );
}
