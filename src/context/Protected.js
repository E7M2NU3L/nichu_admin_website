import React from 'react'

const Protected = ({children, authentication = false}) => {
  return (
    <div>
        {children}
    </div>
  )
}

export default Protected