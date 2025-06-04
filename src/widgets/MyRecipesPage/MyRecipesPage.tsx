"use client";

import Container from '@/shared/Container/Container';
import css from './myRecipesPage.module.scss';
import BigRecipeItem from '@/shared/BigRecipeItem/BigRecipeItem';
import Pagination from '@/shared/Paginator/Paginator';
import { useState } from 'react';
import { RecipeSmall } from '@/entities/Recipe.type';
import MainPageTitle from '@/shared/MainPageTitle/MainPageTitle';
import { useDelOwnRecipe, useGetOwnRecipes } from '@/redux/apis/myRecipesApi';

export default ({}) => {
    const [page, setPage] = useState(1);
    const { data, error, isLoading } = useGetOwnRecipes(page);
    const [delOwnRecipe] = useDelOwnRecipe();
    const recipes: RecipeSmall[] = data?.recipes ?? [];
    return (<section className={css.ownRecipes}><Container>
        <MainPageTitle title="My recipes" />
        {isLoading ? <h1>Loading...</h1> : (data?.total === 0 ? <h1>Nothing</h1> :
        <><ul className={css.recipes}>{recipes?.map((recipe) => (
            <BigRecipeItem toggleFunc={delOwnRecipe} setPage={setPage} key={recipe._id} src={recipe?.preview} title={recipe?.title} descr={recipe?.description} time={Number(recipe?.time)} id={recipe?._id} />
        ))}</ul>
        <Pagination page={page} setPage={setPage} maxPage={Math.ceil((data?.total ?? 0)/4)} /></>)}
    </Container></section>);
};