import { memo } from 'react';

interface EmptyPlaceholderProps {
  text: string;
}

const EmptyPlaceholder = ({ text }: EmptyPlaceholderProps) => {
  return (
    <div className="text-center p-2 text-gray-400">{text}</div>
  );
};

export default memo(EmptyPlaceholder);
