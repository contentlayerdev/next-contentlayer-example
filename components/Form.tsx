export default function Form() {
  return (
    <>
      <form className="border-2 border-slate-500 p-2 flex flex-col space-y-5 rounded">
      <label>Enter your name:</label>
        <input type="text" placeholder="John Doe" />
      <label>Enter your age:</label>
        <input type="text" placeholder="24" />
    </form>
    </>
  );
}
