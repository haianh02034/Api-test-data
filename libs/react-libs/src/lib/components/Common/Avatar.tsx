import ReactAvatar, { ReactAvatarProps } from 'react-avatar';

export const Avatar = (props?: ReactAvatarProps) => {
  return (
    <ReactAvatar
      {...{
        round: true,
        className: 'avatar',
        maxInitials: 3,
        ...props,
      }}
    />
  );
};
