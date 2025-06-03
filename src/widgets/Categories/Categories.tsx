"use client";

import css from "./Categories.module.scss";
import { useRef, useEffect } from "react";
import Container from "@/shared/Container/Container";
import { useGetAllCategories } from "@/redux/apis/categoriesApi";
import { Category } from "@/entities/Category.type";
import useDraggableScroll from "use-draggable-scroll";

const Categories = () => {
  const { data, error, isLoading } = useGetAllCategories();
  const categoriesListRef = useRef<HTMLUListElement>(null!);
  const { onMouseDown } = useDraggableScroll(categoriesListRef, {
    direction: "horizontal",
  });
  useEffect(() => {
    if (!categoriesListRef.current) return;
  }, []);
  return (
    <section className={css.categories}>
      <Container>
        <h1 className={css.categoriesTitle}>Categories</h1>
        {isLoading && <p>Loading...</p>}
        {data && !error && !isLoading && (
          <ul
            className={css.categoriesSublist}
            ref={categoriesListRef}
            onMouseDown={onMouseDown}
          >
            {data.map((category: Category) => (
              <li
                className={css.categoriesSubitem}
                id={category._id}
                key={category._id}
              >
                <p className={css.categoriesName}>{category.title}</p>
              </li>
            ))}
          </ul>
        )}
        <ul className={css.categoriesList}></ul>
      </Container>
    </section>
  );
};

export default Categories;
