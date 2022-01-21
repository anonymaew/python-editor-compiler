import "@mui/icons-material";
import { useState } from "react";

const CommandButton = ({ run, Icon, color, disable = false }: any) => {
  const [hover, sethover] = useState(false);

  return (
    <button
      type="button"
      className="command-button"
      style={{
        borderColor: color,
        color: hover ? "white" : color,
        backgroundColor: hover ? color : "white",
      }}
      onClick={(e) => {
        e.preventDefault();
        if (disable) return;
        run();
      }}
      onMouseEnter={() => {
        if (disable) return;
        sethover(true);
      }}
      onMouseLeave={() => {
        if (disable) return;
        sethover(false);
      }}
    >
      <Icon />
    </button>
  );
};

export default CommandButton;
