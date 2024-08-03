import React from 'react';
import styles from './Loading.module.scss';
const Cube = () => (
  <div className={styles.cube}>
    <div className={[styles['cube-inner'], styles.before].join(' ')}></div>
    <div className={[styles['cube-inner'], styles.after].join(' ')}></div>
  </div>
);

const Box = () => (
  <div className={styles.box}>
    {[1, 2, 3, 4].map((index) => (
      <Cube key={index} />
    ))}
  </div>
);

type Props = {};

const Loading = (props: Props) => {
  return (
    <div className={styles.intro}>
      <Box />
    </div>
  );
};
export default Loading;
