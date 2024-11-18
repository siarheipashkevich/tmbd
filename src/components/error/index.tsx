import { memo } from 'react';

interface ErrorProps {
  error: string;
}

const Error = ({ error }: ErrorProps) => {
  return error && (
    <div className="text-red-500 border border-red-500 rounded p-2">
      Beautiful error: {error}
    </div>
  );
};

export default memo(Error);
