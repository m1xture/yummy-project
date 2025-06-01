import Container from '@/shared/Container/Container';
import css from './page.module.scss';
import BigRecipeItem from '@/shared/BigRecipeItem/BigRecipeItem';
import Pagination from '@/shared/Pagination/Pagination';

export default ({}) => {
    return (<section className={css.favs}><Container>
        <h2 className={css.title}>Favorites</h2>
        <ul className={css.recipes}>
            <BigRecipeItem src='https://res.cloudinary.com/ddbvbv5sp/image/upload/v1678560401/huqdxgwkvbhsfjqtexsm.jpg' title='Spaghetti Bolognese' descr="Salmon eggs are rich in essential nutrients, low in calories, and recommended as part of a healthy diet. Including salmon in a balanced diet can help decrease the chances of heart disease, ease inflammation, and more. " time={40} id='640cd5ac2d9fecf12e8897fc' />
            <BigRecipeItem src='https://res.cloudinary.com/ddbvbv5sp/image/upload/v1678560401/huqdxgwkvbhsfjqtexsm.jpg' title='Spaghetti Bolognese' descr="Salmon eggs are rich in essential nutrients, low in calories, and recommended as part of a healthy diet. Including salmon in a balanced diet can help decrease the chances of heart disease, ease inflammation, and more. " time={40} id='640cd5ac2d9fecf12e8897fc' />
            <BigRecipeItem src='https://res.cloudinary.com/ddbvbv5sp/image/upload/v1678560401/huqdxgwkvbhsfjqtexsm.jpg' title='Spaghetti Bolognese' descr="Salmon eggs are rich in essential nutrients, low in calories, and recommended as part of a healthy diet. Including salmon in a balanced diet can help decrease the chances of heart disease, ease inflammation, and more. " time={40} id='640cd5ac2d9fecf12e8897fc' />
            <BigRecipeItem src='https://res.cloudinary.com/ddbvbv5sp/image/upload/v1678560401/huqdxgwkvbhsfjqtexsm.jpg' title='Spaghetti Bolognese' descr="Salmon eggs are rich in essential nutrients, low in calories, and recommended as part of a healthy diet. Including salmon in a balanced diet can help decrease the chances of heart disease, ease inflammation, and more. " time={40} id='640cd5ac2d9fecf12e8897fc' />
            <BigRecipeItem src='https://res.cloudinary.com/ddbvbv5sp/image/upload/v1678560401/huqdxgwkvbhsfjqtexsm.jpg' title='Spaghetti Bolognese' descr="Salmon eggs are rich in essential nutrients, low in calories, and recommended as part of a healthy diet. Including salmon in a balanced diet can help decrease the chances of heart disease, ease inflammation, and more. " time={40} id='640cd5ac2d9fecf12e8897fc' />
        </ul>
        <Pagination />
    </Container></section>);
}