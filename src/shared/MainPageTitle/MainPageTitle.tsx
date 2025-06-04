import css from './mainPageTitle.module.scss';

export default ({title}: {title: string}) => {
    return (<h1 className={css.title}>{title}</h1>)
}