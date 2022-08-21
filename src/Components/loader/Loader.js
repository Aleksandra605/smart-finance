import s from './_loader.module.scss';

function Loader() {
  return (
    <div className={s.loader__container}>
      <p className={s.p}>Loading...</p>
      <div className={s.container}>
        <div className={s.loader}></div>
      </div>
    </div>
  );
}

export default Loader;
