interface Props {
  children: React.ReactNode;
  onClick: () => void;
}

export const ButtonPlayer = ({ children, onClick }: Props) => {
  return (
    <button
      className='flex items-center justify-center bg-light rounded-full w-14 h-14 hover:bg-yellow transition-colors duration-300'
      onClick={onClick}
    >
      {children}
    </button>
  );
};
