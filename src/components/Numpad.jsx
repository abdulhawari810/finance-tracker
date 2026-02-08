import BackspaceRoundedIcon from "@mui/icons-material/BackspaceRounded";

export default function Numpad({ value, onChange }) {
  const handleClick = (num) => {
    onChange(value + num);
  };
  const handleBackSpace = () => {
    onChange(value.slice(0, -1));
  };
  return (
    <div className="w-full bg-slate-200 grid gap-2.5 p-5 grid-cols-3">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
        <button
          type="button"
          className="w-full key h-12 bg-slate-100 rounded-2xl flex shadow-2xl items-center justify-center font-bold text-2xl"
          key={num}
          onClick={() => handleClick(num.toString())}
        >
          {num}
        </button>
      ))}

      <div className="w-full h-12 items-center justify-center font-bold text-2xl"></div>
      <button
        type="button"
        className="w-full h-12 bg-slate-100 rounded-2xl flex shadow-2xl items-center justify-center font-bold text-2xl key"
        onClick={() => handleClick("0")}
      >
        0
      </button>
      <button
        type="button"
        className="w-full h-12 bg-slate-100 rounded-2xl flex shadow-2xl items-center justify-center font-bold text-2xl key"
        onClick={handleBackSpace}
      >
        <BackspaceRoundedIcon />
      </button>
    </div>
  );
}
