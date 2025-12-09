type AsyncBlockProps = {
  loading: boolean;
  error: boolean;
  loadingText: string;
  errorText: string;
  children: React.ReactNode;
};

export const AsyncBlock = ({
  loading,
  error,
  loadingText,
  errorText,
  children,
}: AsyncBlockProps) => {
  if (loading) {
    return (
      <div className="p-6 w-full lg:w-[450px] flex items-center justify-center mx-auto text-slate-700">
        {loadingText}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 w-full lg:w-[450px] flex items-center justify-center mx-auto text-red-500">
        {errorText}
      </div>
    );
  }

  return <>{children}</>;
};
