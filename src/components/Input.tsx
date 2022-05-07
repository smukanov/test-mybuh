import { FC } from "react";

type Props = {
    value: string | number | undefined;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onOkBtnClick: () => void;
    onCancelBtnClick: () => void;
};

export const Input: FC<Props> = ({value, onChange, onOkBtnClick, onCancelBtnClick}) => {
    return (
        <div>
                <input 
                  autoFocus
                  value={value}
                  placeholder='Введите значение'
                  onChange={onChange}/>
                <div>
                <button 
                  className='okBtn'
                  onClick={onOkBtnClick}>
                    ок
                </button>
                <button 
                  className='cancelBtn'
                  onClick={onCancelBtnClick}>
                    отмена
                </button>
                </div>
              </div>
    )
};