import React from 'react'

interface SubHeadingProps {
  text: string;
  className?: string;
}

export const SubHeading: React.FC<SubHeadingProps> = ({ text, className }) => {
  return (
    <h3 className={`text-base text-stone text-left ${className || ''}`}>
      {text}
    </h3>
  )
}

export default SubHeading

