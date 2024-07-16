interface Props {
  children: React.ReactNode
  onClick: () => void
}

export const ButtonPlayer = ({ children, onClick }: Props) => {
  return (
    <button
      className='flex items-center justify-center bg-light rounded-full w-10 h-10 hover:bg-yellow transition-colors duration-300'
      onClick={onClick}>
      {children}
    </button>
  )
}
