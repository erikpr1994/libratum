type Avatar = {
  alt: string;
  src?: string;
  text: string;
  height: number;
  width: number;
};

export default function Avatar({ alt, src, text, height, width }: Avatar) {
  if (!src) src = "placeholder/avatar.png";
  return (
    <>
      <div>
        {text && <strong>{text}</strong>}
        <img alt={alt} src={src} title={alt} />
      </div>
      <style jsx>{`
        div {
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }

        strong {
          margin-right: 8px;
        }

        img {
          border-radius: 9999px;
          height: ${height}px;
          width: ${width}px;
        }
      `}</style>
    </>
  );
}
