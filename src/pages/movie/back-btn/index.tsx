import { memo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFocusable } from '@noriginmedia/norigin-spatial-navigation';

import { Button } from '@/components/button';

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
    <Button
      ref={ref}
      className="my-4"
      variant={focused ? 'focused' : 'default'}
      onClick={() => {
        focusSelf();
        handleGoBack();
      }}>
      Go Back
    </Button>
  );
}

export default memo(BackBtn);
