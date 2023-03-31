import React from 'react'
import cx from 'classnames'

type SpinnerBase = {
  size?: 'lg' | 'md' | 'sm'
  className?: string
}

const Loader = ({ size = 'md', className }: SpinnerBase) => {
  const style = cx('rounded-full animate-spin border-solid border-gray-700 border-t-gray-300', className, {
    'w-5 h-5 border-[2px] border-t-[2px]': size === 'sm',
    'w-8 h-8 border-[3px] border-t-[3px]': size === 'md',
    'w-12 h-12 border-[4px] border-t-[4px]': size === 'lg',
  })
  return <div className={style} />
}

export default Loader
