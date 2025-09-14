import MatrixScene from "./MatrixScene";

const Model3DBox = ({ className }) => {
  return (
    <div
      className={`${className} p-2 h-150 md:h-150 bg-black/50 border border-green-500/30 rounded-lg backdrop-blur-sm shadow-lg shadow-green-500/10
      flex items-center justify-center overflow-hidden`}
    >
      <MatrixScene />
    </div>
  );
};

export default Model3DBox;
