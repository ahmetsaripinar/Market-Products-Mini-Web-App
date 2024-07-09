import { MdOutlineDeleteSweep } from "react-icons/md";

const IconButton = () => {
  return (
    <div
      style={{
        backgroundColor: "rgba(204, 195, 200, 0.8)",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        width: 32,
        height: 32,
        margin: "auto"
      }}
      className="rounded-circle"
    >
      <MdOutlineDeleteSweep color="var(--bs-danger)" />
    </div>
  );
};

export default IconButton;
