import Image from "next/image";

const container: React.CSSProperties = {
  display: "flex",
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  zIndex: 9999,
  justifyContent: "center",
  alignItems: "center",
};

export default function LoadingScreen() {
  return (
    <div style={container}>
      <span style={{ color: "white", fontSize: 30, fontWeight: "bold" }}>
        <Image src="/loading.svg" alt="loader" width={100} height={100} />
      </span>
    </div>
  );
}
