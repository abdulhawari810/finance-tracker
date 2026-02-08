import { NumericFormat } from "react-number-format";

export default function InputField({ id, value, styles }) {
  return (
    <>
      <NumericFormat
        id={id}
        value={value}
        readOnly
        className={styles}
        thousandSeparator=","
        placeholder="0"
      />
    </>
  );
}
