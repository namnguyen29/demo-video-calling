import { ReactNode } from 'react';

import styles from './UserLayout.module.scss';

type Props = {
  localUser: ReactNode;
  remoteUsers: ReactNode[];
};

export const UserLayout = ({ localUser, remoteUsers }: Props) => {
  return (
    <div className={styles.multipleUserLayout}>
      <>{localUser}</>
      <>{remoteUsers}</>
    </div>
  );
};
