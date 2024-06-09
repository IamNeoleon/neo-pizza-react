import React, { useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import qs from 'qs'
import { useNavigate } from 'react-router-dom';


import { FilterState, setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { getPizza } from '../redux/slices/pizzaSlice';
import { sortList } from '../components/Sort/Sort';
import { selectPizza } from '../redux/slices/pizzaSlice';
import { selectFilter } from '../redux/slices/filterSlice';
import { useAppDispatch } from '../redux/store';


import Categories from '../components/Categories/Categories'
import Sort from '../components/Sort/Sort'
import PizzaBlock from '../components/PizzaBlock/PizzaBlock'
import PizzaBlockSkeleton from '../components/PizzaBlock/PizzaBlockSkeleton'
import Pagination from '../components/Pagination/Pagination';


const Home: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isSearch = useRef(false);
    const isMounted = useRef(false);
    const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter)
    const { items, totalPages, status } = useSelector(selectPizza)

    const sortType = sort.sortProperty;



    const onClickCategory = useCallback((id: number) => {
        dispatch(setCategoryId(id));
    }, [])

    const onChangePage = (number: number) => {
        dispatch(setCurrentPage(number))
    }

    const fetchPizzas = () => {
        const category = categoryId > 0 ? `&category=${categoryId}` : '';
        const sort = `&sortBy=${sortType}`;
        const search = searchValue ? `&title=*${searchValue}` : '';
        dispatch(
            getPizza({
                currentPage,
                category,
                sort,
                search
            }))
        /*
        axios.get(`https://f0c873f136c0badd.mokky.dev/pizzas?page=${currentPage}&limit=8${category}}${sort}${search}`)
            .then(response => {
                setTotalPages(response.data.meta.total_pages)
                // dispatch(setItems(response.data.items))
                console.log(response.data.items);
                setIsLoading(false)
            })
            .catch(error => {
                console.error(error)
            })
        */
    }
    useEffect(() => {
        fetchPizzas();
        isSearch.current = false;
    }, [categoryId, sort.sortProperty, searchValue, currentPage])

    const pizzaBlocks = items.map((pizzaItem: any) => (
        <PizzaBlock
            key={pizzaItem.id}
            id={pizzaItem.id}
            imageUrl={pizzaItem.imageUrl}
            title={pizzaItem.title}
            types={pizzaItem.types}
            sizes={pizzaItem.sizes}
            price={pizzaItem.price}
            category={pizzaItem.category}
            rating={pizzaItem.rating}
        />))
    const pizzaSkeletons = [...new Array(8)].map((_, index) => <PizzaBlockSkeleton key={`skeleton_${index}`} />);
    return (
        <div className='container'>
            <div className="content__top">
                <Categories categoryId={categoryId} onClickCategory={onClickCategory}></Categories>
                <Sort ></Sort>
            </div>

            {
                status === 'error'
                    ? (
                        <div className='error_data'>
                            <h2>Произошла ошибка</h2>
                            <p>Извините, нам не удалось загрузить данные 😕 <br /> Попробуйте повторить запрос</p>
                        </div>
                    ) : (
                        <>
                            <h2 className="content__title">Все пиццы</h2>
                            <div className="content__items">
                                {
                                    status === 'loading'
                                        ? pizzaSkeletons
                                        : pizzaBlocks
                                }
                            </div>
                        </>

                    )
            }
            <Pagination onChangePage={onChangePage} totalPages={totalPages} />
        </div>
    );
};

export default Home;