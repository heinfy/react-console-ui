export default function FullPageLoading({ text = "Loading..." }) {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        {text && <p className="mt-4 text-gray-700 font-medium">{text}</p>}
      </div>
    </div>
  );
}