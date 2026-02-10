import { useEffect } from 'react';
import { useLocation } from 'wouter';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'login' | 'register';
  disableRedirectOnSuccess?: boolean;
  successRedirectTo?: string;
}

export function AuthModal({
  isOpen,
  onClose,
  defaultMode = 'register',
  successRedirectTo,
}: AuthModalProps) {
  const [, navigate] = useLocation();

  useEffect(() => {
    if (!isOpen) return;

    const next = (() => {
      const candidate = successRedirectTo || `${window.location.pathname}${window.location.search}`;
      if (!candidate) return null;
      if (!candidate.startsWith('/')) return null;
      if (candidate.startsWith('/api/')) return null;
      return candidate;
    })();

    const params = new URLSearchParams();
    params.set('mode', defaultMode);
    if (next) params.set('next', next);

    navigate(`/auth?${params.toString()}`);
    onClose();
  }, [defaultMode, isOpen, navigate, onClose, successRedirectTo]);

  return null;
}
