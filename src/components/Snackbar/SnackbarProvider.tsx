import cx from 'classnames'
import React, { createContext, ReactNode, useContext, useState } from 'react'
import Alert, { AlertBaseType } from '../Alert'

type ShowSnackbarProps = {
  message: string
  type?: AlertBaseType
  position?: SnackbarPosition
  content?: string
  filled?: boolean
  outlined?: boolean
  autoClose?: boolean
  duration?: number
  className?: string
}

export interface SnackbarContextProps {
  showSnackbar: (action: ShowSnackbarProps) => void
  handleClose: () => void
}

export const SnackbarContext = createContext<SnackbarContextProps>({} as SnackbarContextProps)
export const defaultDuration = 4000
export const defaultPosition = 'bottom-right'
export const defaultType = 'info'
export type SnackbarPosition =
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'
  | 'top-left'
  | 'top-center'
  | 'top-right'

type SnackbarProviderProp = {
  children: ReactNode
}

export const SnackbarProvider = ({ children }: SnackbarProviderProp) => {
  const [message, setMessage] = useState<string>('')
  const [position, setPosition] = useState<SnackbarPosition>(defaultPosition)
  const [type, setType] = useState<AlertBaseType>(defaultType)
  const [content, setContent] = useState<string | undefined>()
  const [filled, setFilled] = useState<boolean>(false)
  const [outlined, setOutlined] = useState<boolean>(false)
  const [className, setClassName] = useState<string>('')

  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout>>()

  const triggerSnackbar = ({
    message,
    type = defaultType,
    position = defaultPosition,
    content,
    filled = false,
    outlined = false,
    className = '',
  }: ShowSnackbarProps) => {
    setMessage(message)
    setType(type)
    setPosition(position)
    setContent(content)
    setFilled(filled)
    setOutlined(outlined)
    setClassName(className)
    setTimeout(() => {
      setIsVisible(true)
    }, 100)
  }

  const transitionClose = () => {
    return new Promise<void>((resolve) => {
      setIsVisible(false)
      clearTimeout(timeoutId)
      setTimeout(() => {
        resolve()
      }, 150)
    })
  }

  const showSnackbar = (action: ShowSnackbarProps) => {
    if (isVisible) {
      transitionClose().then(() => {
        triggerSnackbar(action)
        if (action.autoClose) {
          const timeId = setTimeout(() => {
            setIsVisible(false)
          }, action.duration ?? defaultDuration)
          setTimeoutId(timeId)
        }
      })
    } else {
      triggerSnackbar(action)
      if (action.autoClose) {
        const timeId = setTimeout(() => {
          setIsVisible(false)
        }, action.duration ?? defaultDuration)
        setTimeoutId(timeId)
      }
    }
  }

  const handleClose = () => {
    clearTimeout(timeoutId)
    setIsVisible(false)
  }

  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return 'top-0 left-4'
      case 'top-center':
        return 'top-0 justify-center'
      case 'top-right':
        return 'top-0 right-4 justify-end'
      case 'bottom-left':
        return 'bottom-0 left-4'
      case 'bottom-center':
        return 'bottom-0 justify-center'
      case 'bottom-right':
        return 'bottom-0 right-4 justify-end'
      default:
        return 'bottom-0 right-4'
    }
  }

  return (
    <SnackbarContext.Provider value={{ showSnackbar, handleClose }}>
      {children}

      <div
        className={cx(
          `flex items-center fixed z-50 pointer-events-none m-4 inset-x-0 ${getPositionClasses()} transition`,
          {
            'opacity-100 ': isVisible,

            'opacity-0 -translate-y-full':
              !isVisible &&
              (position === 'top-left' || position === 'top-center' || position === 'top-right'),
            'opacity-0 translate-y-full':
              !isVisible &&
              (position === 'bottom-left' ||
                position === 'bottom-center' ||
                position === 'bottom-right'),
          },
        )}
      >
        <Alert
          type={type}
          outlined={outlined}
          filled={filled}
          message={message}
          content={content}
          onClose={handleClose}
          className={className}
        />
      </div>
    </SnackbarContext.Provider>
  )
}

export const useSnackbar = () => {
  const { showSnackbar, handleClose } = useContext(SnackbarContext)

  return { showSnackbar, handleClose }
}
