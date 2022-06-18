import Link from "next/link";

export function Tag({ tag }: { tag: string }) {
  return (
    <span className="text-xs bg-gray-200 rounded py-0.5 px-1.5 hover:bg-gray-300">
      <Link href={`/tags/${tag}`}>{tag}</Link>
    </span>
  );
}
