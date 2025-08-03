import './CustomCheckBox.css';

type CustomCheckBoxProps = {
  id: string;
  checked: boolean;
  onChange: () => void;
  label?: string;
};

const CustomCheckBox = ({ id, checked, onChange, label }: CustomCheckBoxProps) => {
  return (
    <div className="flex items-center gap-3 checkbox-wrapper-5">
      <div className="check">
        <input id={id} type="checkbox" checked={checked} onChange={onChange} />
        <label htmlFor={id}></label>
      </div>
      {label && (
        <label htmlFor={id} className="text-white text-sm cursor-pointer select-none">
          {label}
        </label>
      )}
    </div>
  );
};

export default CustomCheckBox;
