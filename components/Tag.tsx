import Link from "next/link";

type Props = {
  tag: string;
};

export function Tag({ tag }: Props) {
  return (
    <span className="text-xs bg-gray-200 rounded py-0.5 px-1.5 hover:bg-gray-300">
      <Link href={`/tags/${tag}`}>
        {tag}
      </Link>
    </span>
  );
}