export function useWompi() {
  const redirigirAPago = (url: string) => {
    window.location.href = url;
  };

  return { redirigirAPago };
}
