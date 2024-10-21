export default function HumanMessage({ message }: { message: string }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[75%] p-4 rounded-lg bg-blue-100 text-blue-800">
        <p>{message}</p>
      </div>
    </div>
  );
}
