import React from 'react';

type CategoriesProps = {
    categoryId: number,
    onClickCategory: (index: number) => void,
}
const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

const Categories: React.FC<CategoriesProps> = React.memo(
    ({ categoryId, onClickCategory }) => {
        return (
            <>
                <div className="categories">
                    <ul>
                        {categories.map((item, index) => (
                            <li key={index} onClick={() => onClickCategory(index)} className={categoryId == index ? 'active' : ''}>{item}</li>
                        ))}
                    </ul>
                </div>
            </>
        );
    }
)
export default Categories;