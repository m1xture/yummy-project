"use client";

import css from "./Categories.module.scss";
import Container from "@/shared/Container/Container";
import { useGetAllCategories } from "@/redux/apis/categoriesApi";

const Categories = () => {
  const { data, error, isLoading } = useGetAllCategories();
  return (
    <section className={css.categories}>
      <Container>
        <h1 className={css.categoriesTitle}>Categories</h1>
        <ul className={css.categoriesSublist}></ul>
        <ul className={css.categoriesList}></ul>
      </Container>
    </section>
  );
};

export default Categories;
