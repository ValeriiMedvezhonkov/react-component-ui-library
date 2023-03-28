import cx from 'classnames'
import * as React from 'react'

import CloseIcon from '../icons/Close'
import SuccessIcon from '../icons/Success'
import ErrorIcon from '../icons/Error'
import WarningIcon from '../icons/Warning'
import InfoIcon from '../icons/Info'

export type AlertBaseType = 'error' | 'success' | 'info' | 'warning'

type AlertBase = {
  type: AlertBaseType
  content?: string
  message: string
  filled?: boolean
  outlined?: boolean
  onClose?: () => void
  className?: string
}

const icons = {
  error: <ErrorIcon />,
  success: <SuccessIcon />,
  info: <InfoIcon />,
  warning: <WarningIcon />,
}

const Alert = ({ type, message, content, outlined, filled, onClose, className }: AlertBase) => {
  const alertContainer = cx(
    'flex p-3 gap-2 w-[400px] rounded-lg pointer-events-auto',
    {
      'border border-solid rounded-lg': outlined,
      'border-red-base': outlined && !filled && type === 'error',
      'border-blue-base': outlined && !filled && type === 'info',
      'border-yellow-base': outlined && !filled && type === 'warning',
      'border-green-base': outlined && !filled && type === 'success',

      'bg-red-base ': filled && type === 'error',
      'bg-blue-base ': filled && type === 'info',
      'bg-yellow-base ': filled && type === 'warning',
      'bg-green-base ': filled && type === 'success',

      'border-red-light': filled && outlined && type === 'error',
      'border-blue-light': filled && outlined && type === 'info',
      'border-yellow-light': filled && outlined && type === 'warning',
      'border-green-light': filled && outlined && type === 'success',

      'bg-green-light text-green-dark': type === 'success' && !filled,
      'bg-yellow-light text-yellow-dark': type === 'warning' && !filled,
      'bg-red-light text-red-dark': type === 'error' && !filled,
      'bg-blue-light text-blue-dark': type === 'info' && !filled,

      'flex-col': content,
      'items-center': !content,
    },
    className,
  )

  const alertIcon = cx({
    'text-green-base': type === 'success' && !filled,
    'text-yellow-base': type === 'warning' && !filled,
    'text-red-base': type === 'error' && !filled,
    'text-blue-base': type === 'info' && !filled,

    'text-white': filled,
  })

  const messageStyle = cx('grow', {
    'text-white': filled,
    'font-semibold': content,
  })

  const closeIconStyle = cx(
    'min-w-[32px] min-h-[32px] w-8 h-8 rounded-full flex items-center justify-center hover:bg-neutral-700 hover:bg-opacity-40 cursor-pointer',
    {
      'text-white': filled,
      'relative -top-1 -right-1': content,
    },
  )

  return content ? (
    <div className={alertContainer}>
      <div className='flex gap-2 w-full'>
        <span className={alertIcon}>{icons[type]}</span>
        <div className='flex flex-col grow'>
          <div className={messageStyle}>{message}</div>
          <div
            className={cx('grow text-xs', {
              'text-white': filled,
            })}
          >
            {content}
          </div>
        </div>
        <div className={closeIconStyle} onClick={onClose}>
          <CloseIcon />
        </div>
      </div>
    </div>
  ) : (
    <div className={alertContainer}>
      <div className={alertIcon}>{icons[type]}</div>
      <div className={messageStyle}>{message}</div>
      <div className={closeIconStyle} onClick={onClose}>
        <CloseIcon />
      </div>
    </div>
  )
}

export default Alert
