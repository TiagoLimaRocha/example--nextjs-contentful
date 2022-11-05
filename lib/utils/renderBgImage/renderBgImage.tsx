import React, { FC } from 'react';
import Image from 'next/image';

import { IProps } from './types';

import styles from '@styles/Landing.module.css';

export const renderBgImage: FC<IProps> = ({ image }) => {
  return (
    (image && (
      <Image
        className={styles.bgImage}
        quality={100}
        blurDataURL={image}
        src={image}
        alt="hero image"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />
    )) ||
    null
  );
};
