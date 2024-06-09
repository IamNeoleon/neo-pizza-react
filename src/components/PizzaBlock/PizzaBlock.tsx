import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { CartItem, addItem } from '../../redux/slices/cartSlice';
import { selectCartItemById } from '../../redux/slices/cartSlice';


const typeNames = ['тонкое', 'традиционное']

type PizzaBlockProps = {
    id: number,
    imageUrl: string,
    title: string,
    types: number[],
    sizes: number[],
    price: number,
    category: string,
    rating: number,
}


const PizzaBlock: React.FC<PizzaBlockProps> = ({ id, imageUrl, title, types, sizes, price, category, rating }) => {
    const dispatch = useDispatch();
    const cartItem = useSelector(selectCartItemById(id));
    const [activeType, setActiveType] = useState(0);
    const [activeSize, setActiveSizes] = useState(0);
    const pizzaCount = cartItem ? cartItem.count : 0;
    const onClickAdd = () => {
        const item: CartItem = {
            id,
            title,
            price,
            imageUrl,
            type: typeNames[activeType],
            size: sizes[activeSize],
            count: 0,
        }
        dispatch(addItem(item))
    }

    return (
        <div className='pizza-block-wrapper'>
            <div className="pizza-block">
                <img
                    className="pizza-block__image"
                    src={'https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg'}
                    alt="Pizza"
                />
                <h4 className="pizza-block__title">{title}</h4>
                <div className="pizza-block__selector">
                    <ul>
                        {types.map((typeIndex, index) => (
                            <li onClick={() => setActiveType(typeIndex)} key={index} className={activeType == typeIndex ? 'active' : ''}>{typeNames[typeIndex]} </li>
                        ))}
                    </ul>
                    <ul>
                        {sizes.map((item, index) => (
                            <li onClick={() => setActiveSizes(index)} key={index} className={activeSize == index ? 'active' : ''}>{item} см.</li>
                        ))}
                    </ul>
                </div>
                <div className="pizza-block__bottom">
                    <div className="pizza-block__price">от {price} ₽</div>
                    <div onClick={onClickAdd} className="button button--outline button--add">
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                                fill="white"
                            />
                        </svg>
                        <span>Добавить</span>
                        {pizzaCount > 0 && <i>{pizzaCount}</i>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PizzaBlock;