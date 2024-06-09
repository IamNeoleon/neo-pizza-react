import React, { useCallback, useRef, useState } from 'react';
import styles from './Search.module.scss'
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/slices/filterSlice';




const Search: React.FC = () => {
    const dispatch = useDispatch();
    const [value, setValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const onClickClear = () => {
        setSearchValue('')
        setValue('');
        inputRef.current?.focus();
    }

    const updateSearchValue = useCallback(
        debounce((value) => {
            console.log(value);
            dispatch(setSearchValue(value));
        }, 500),
        []
    )
    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
        updateSearchValue(e.target.value)
    }

    return (
        <>
            <div className={styles.input}>
                <input ref={inputRef} value={value} onChange={onChangeInput} type="text" className={styles.input__input} placeholder='Поиск пицц' />
                <span className={styles.input__clear} onClick={onClickClear}>X</span>
            </div>
        </>
    );
};

export default Search;