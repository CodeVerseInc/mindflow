interface Props {
  children: React.ReactNode
}

export const ButtonPlayer = ({ children }: Props) => {
  return (
    <div className='flex items-center  justify-center bg-light rounded-full w-14 h-14'>
      {children}
    </div>
  )
}
