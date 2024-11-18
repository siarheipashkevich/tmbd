import { memo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFocusable } from '@noriginmedia/norigin-spatial-navigation';

import { cn } from '@/utils';

function BackBtn() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoBack = () => {
    if (location.state?.canGoBack) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const { ref, focused, focusSelf } = useFocusable({
    onEnterPress: handleGoBack,
  });

  useEffect(() => {
    focusSelf();
  }, [focusSelf]);

  return (
    <div
      ref={ref}
      className={cn('my-4 py-2 px-4 inline-block cursor-pointer rounded bg-slate-200', {
        'bg-sky-400 text-white': focused,
      })}
      onClick={() => {
        focusSelf();
        handleGoBack();
      }}>
      Go Back
    </div>
  );
}

export default memo(BackBtn);
